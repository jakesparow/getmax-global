"""
Social Media Repurposer for Getmax Global
Takes the latest blog post and repurposes it for LinkedIn.
Runs after generate-blog.py in the GitHub Actions pipeline.
"""

import json
import os
import sys
from pathlib import Path
import urllib.request

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
LINKEDIN_ACCESS_TOKEN = os.environ.get("LINKEDIN_ACCESS_TOKEN")
LINKEDIN_PERSON_ID = os.environ.get("LINKEDIN_PERSON_ID")
POSTS_FILE = Path(__file__).parent.parent / "public" / "blog" / "posts.json"


def call_claude(prompt):
    """Call Claude API for content repurposing."""
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


def repurpose_for_linkedin(post):
    """Convert blog post to LinkedIn post format."""
    prompt = f"""Convert this blog post into a LinkedIn post.

Title: {post['title']}
Content: {post['content'][:1500]}

Rules:
- 200-250 words max, 20 lines max
- Mobile-formatted: blank lines between sentences
- Hook in first line (under 40 chars, attention-grabbing)
- Use line breaks for readability
- End with a question or call to action
- Include 3-5 relevant hashtags at the end
- No emojis
- Tone: confident CEO sharing insights, not salesy

Return ONLY the LinkedIn post text, nothing else."""

    return call_claude(prompt)


def post_to_linkedin(text):
    """Post to LinkedIn via API."""
    if not LINKEDIN_ACCESS_TOKEN or not LINKEDIN_PERSON_ID:
        print("LinkedIn credentials not configured — skipping post")
        print("---LINKEDIN POST DRAFT---")
        print(text)
        print("---END DRAFT---")
        return False

    url = "https://api.linkedin.com/v2/ugcPosts"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {LINKEDIN_ACCESS_TOKEN}",
        "X-Restli-Protocol-Version": "2.0.0",
    }
    body = json.dumps({
        "author": f"urn:li:person:{LINKEDIN_PERSON_ID}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": text},
                "shareMediaCategory": "NONE",
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"},
    }).encode("utf-8")

    req = urllib.request.Request(url, data=body, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            print(f"LinkedIn post published! Status: {resp.status}")
            return True
    except urllib.error.HTTPError as e:
        print(f"LinkedIn API error: {e.code} — {e.read().decode()}")
        return False


def main():
    if not ANTHROPIC_API_KEY:
        print("ERROR: ANTHROPIC_API_KEY not set")
        sys.exit(1)

    # Load latest post
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

    # Generate LinkedIn version
    linkedin_text = repurpose_for_linkedin(latest)
    print(f"LinkedIn post generated ({len(linkedin_text)} chars)")

    # Post to LinkedIn
    post_to_linkedin(linkedin_text)


if __name__ == "__main__":
    main()
