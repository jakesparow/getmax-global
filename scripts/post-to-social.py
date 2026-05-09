"""
Multi-Channel Social Repurposer for Getmax Global (ContentPilot)
Runs after generate-blog.py in the GitHub Actions pipeline.

Channels:
  - LinkedIn (OAuth2 — needs access token)
  - Bluesky (AT Protocol — app password auth)
  - Telegram (Bot API — channel broadcast)
  - Buffer (API — queue to connected profiles)

Uses Claude Haiku for repurposing to each format.
"""

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
import urllib.request
import urllib.error

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
POSTS_FILE = Path(__file__).parent.parent / "public" / "blog" / "posts.json"

# Social credentials
LINKEDIN_ACCESS_TOKEN = os.environ.get("LINKEDIN_ACCESS_TOKEN")
LINKEDIN_PERSON_ID = os.environ.get("LINKEDIN_PERSON_ID")
BLUESKY_HANDLE = os.environ.get("BLUESKY_HANDLE", "getmaxglobal.bsky.social")
BLUESKY_APP_PASSWORD = os.environ.get("BLUESKY_APP_PASSWORD")
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHANNEL_ID = os.environ.get("TELEGRAM_CHANNEL_ID")
BUFFER_API_KEY = os.environ.get("BUFFER_API_KEY")

BLOG_BASE_URL = "https://getmaxglobal.com/blog"


def call_claude(prompt):
    url = "https://api.anthropic.com/v1/messages"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
    }
    body = json.dumps({
        "model": "claude-haiku-4-5-20251001",
        "max_tokens": 1000,
        "messages": [{"role": "user", "content": prompt}],
    }).encode("utf-8")

    req = urllib.request.Request(url, data=body, headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=60) as resp:
        result = json.loads(resp.read().decode("utf-8"))
        return result["content"][0]["text"]


def http_request(url, data=None, headers=None, method="POST"):
    """Generic HTTP request helper."""
    if isinstance(data, dict):
        data = json.dumps(data).encode("utf-8")
    elif isinstance(data, str):
        data = data.encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers or {}, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return e.code, {"error": e.read().decode("utf-8")}


def repurpose(post, platform, char_limit, extra_rules=""):
    """Use Claude to repurpose blog content for a specific platform."""
    prompt = f"""Convert this blog post into a {platform} post.

Title: {post['title']}
Content: {post['content'][:1500]}
Blog URL: {BLOG_BASE_URL}/{post['id']}

Rules:
- Max {char_limit} characters
- Mobile-formatted: short paragraphs, line breaks between thoughts
- Hook in first line (attention-grabbing, under 40 chars)
- End with the blog link
- No emojis
- Tone: confident CEO sharing insights
{extra_rules}

Return ONLY the post text, nothing else."""

    return call_claude(prompt)


# ─── LinkedIn ───────────────────────────────────────────

def post_linkedin(post):
    if not LINKEDIN_ACCESS_TOKEN or not LINKEDIN_PERSON_ID:
        print("[LinkedIn] Skipped — no access token configured")
        return False

    text = repurpose(post, "LinkedIn", 2500, "- Include 3-5 hashtags at the end\n- 200-250 words, 20 lines max")
    print(f"[LinkedIn] Post: {len(text)} chars")

    status, resp = http_request(
        "https://api.linkedin.com/v2/ugcPosts",
        data={
            "author": f"urn:li:person:{LINKEDIN_PERSON_ID}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {"text": text},
                    "shareMediaCategory": "NONE",
                }
            },
            "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"},
        },
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {LINKEDIN_ACCESS_TOKEN}",
            "X-Restli-Protocol-Version": "2.0.0",
        },
    )
    print(f"[LinkedIn] Status: {status}")
    return status in (200, 201)


# ─── Bluesky ────────────────────────────────────────────

def post_bluesky(post):
    if not BLUESKY_APP_PASSWORD:
        print("[Bluesky] Skipped — no app password configured")
        return False

    # Authenticate
    status, auth = http_request(
        "https://bsky.social/xrpc/com.atproto.server.createSession",
        data={"identifier": BLUESKY_HANDLE, "password": BLUESKY_APP_PASSWORD},
        headers={"Content-Type": "application/json"},
    )
    if status != 200:
        print(f"[Bluesky] Auth failed: {status}")
        return False

    access_token = auth.get("accessJwt")
    did = auth.get("did")

    text = repurpose(post, "Bluesky", 300, "- Keep it punchy, 2-3 short paragraphs\n- No hashtags")

    # Create post
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    status, resp = http_request(
        "https://bsky.social/xrpc/com.atproto.repo.createRecord",
        data={
            "repo": did,
            "collection": "app.bsky.feed.post",
            "record": {
                "$type": "app.bsky.feed.post",
                "text": text,
                "createdAt": now,
            },
        },
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}",
        },
    )
    print(f"[Bluesky] Status: {status}")
    return status == 200


# ─── Telegram ───────────────────────────────────────────

def post_telegram(post):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHANNEL_ID:
        print("[Telegram] Skipped — no bot token or channel ID configured")
        return False

    text = repurpose(post, "Telegram", 1000, "- Use markdown formatting\n- Bold the hook line\n- Include link at bottom")

    status, resp = http_request(
        f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
        data={
            "chat_id": TELEGRAM_CHANNEL_ID,
            "text": text,
            "parse_mode": "Markdown",
            "disable_web_page_preview": False,
        },
        headers={"Content-Type": "application/json"},
    )
    print(f"[Telegram] Status: {status}")
    return status == 200


# ─── Buffer ─────────────────────────────────────────────

def post_buffer(post):
    if not BUFFER_API_KEY:
        print("[Buffer] Skipped — no API key configured")
        return False

    # Get connected profiles
    status, profiles = http_request(
        f"https://api.bufferapp.com/1/profiles.json?access_token={BUFFER_API_KEY}",
        method="GET",
        headers={"Content-Type": "application/json"},
    )
    if status != 200 or not profiles:
        print(f"[Buffer] Failed to get profiles: {status}")
        return False

    text = repurpose(post, "social media", 280, "- Generic social post that works across platforms\n- Keep it tight, 2-3 sentences + link")

    # Queue to all connected profiles
    profile_ids = [p["id"] for p in (profiles if isinstance(profiles, list) else [])]
    if not profile_ids:
        print("[Buffer] No connected profiles found")
        return False

    status, resp = http_request(
        f"https://api.bufferapp.com/1/updates/create.json?access_token={BUFFER_API_KEY}",
        data=json.dumps({
            "text": text,
            "profile_ids": profile_ids,
        }).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    print(f"[Buffer] Queued to {len(profile_ids)} profiles, status: {status}")
    return status == 200


# ─── Main ───────────────────────────────────────────────

def main():
    if not ANTHROPIC_API_KEY:
        print("ERROR: ANTHROPIC_API_KEY not set")
        sys.exit(1)

    if not POSTS_FILE.exists():
        print("No posts found")
        sys.exit(1)

    with open(POSTS_FILE, "r") as f:
        posts = json.load(f)

    if not posts:
        print("No posts to repurpose")
        sys.exit(1)

    latest = posts[0]
    print(f"Repurposing: {latest['title']}")
    print(f"Blog URL: {BLOG_BASE_URL}/{latest['id']}")
    print("=" * 50)

    results = {}
    for name, fn in [
        ("LinkedIn", post_linkedin),
        ("Bluesky", post_bluesky),
        ("Telegram", post_telegram),
        ("Buffer", post_buffer),
    ]:
        try:
            results[name] = fn(latest)
        except Exception as e:
            print(f"[{name}] Error: {e}")
            results[name] = False

    print("=" * 50)
    print("Results:")
    for name, ok in results.items():
        print(f"  {name}: {'POSTED' if ok else 'SKIPPED/FAILED'}")


if __name__ == "__main__":
    main()
