"""
Daily Blog Generator for Getmax Global
Runs via GitHub Actions cron — researches trending topics and generates a new blog post.
Uses Claude API for content generation.
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path
import urllib.request
import urllib.error

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
POSTS_FILE = Path(__file__).parent.parent / "public" / "blog" / "posts.json"

TOPICS = [
    "AI agents in business automation",
    "healthcare revenue cycle management trends",
    "voice AI and conversational agents",
    "cloud infrastructure cost optimization",
    "AI-powered content creation",
    "LLM orchestration and multi-model routing",
    "autonomous operations and zero-overhead companies",
    "drone technology and AI",
    "HR automation with AI",
    "legal tech and compliance automation",
    "data warehousing and real-time analytics",
    "AI tokenization and compute markets",
    "startup growth strategies with AI",
    "serverless architecture patterns",
    "open source AI models and fine-tuning",
]

CATEGORIES = ["AI & Automation", "Healthcare", "Products", "Engineering", "Industry", "Concepts"]

def call_claude(prompt):
    """Call Claude API directly via urllib (no SDK dependency)."""
    url = "https://api.anthropic.com/v1/messages"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
    }
    body = json.dumps({
        "model": "claude-haiku-4-5-20251001",
        "max_tokens": 2000,
        "messages": [{"role": "user", "content": prompt}],
    }).encode("utf-8")

    req = urllib.request.Request(url, data=body, headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=60) as resp:
        result = json.loads(resp.read().decode("utf-8"))
        return result["content"][0]["text"]


def generate_post():
    """Generate a new blog post."""
    # Pick a topic based on day of year for variety
    day = datetime.now().timetuple().tm_yday
    topic = TOPICS[day % len(TOPICS)]
    category = CATEGORIES[day % len(CATEGORIES)]

    prompt = f"""Write a blog post for Getmax Global (getmaxglobal.com), an AI-native business automation company.

Topic: {topic}
Category: {category}

Requirements:
- Title: catchy, specific, under 80 chars
- Excerpt: 1-2 sentences, compelling
- Content: 400-600 words in markdown format
- Use ## for section headers
- Include practical insights, not generic fluff
- Mention how AI agents and automation solve real problems
- Tone: confident, technical but accessible, forward-looking
- Generate 3 relevant tags

Return ONLY valid JSON in this exact format (no markdown wrapping):
{{
  "title": "...",
  "excerpt": "...",
  "category": "{category}",
  "tags": ["tag1", "tag2", "tag3"],
  "readTime": "X min",
  "content": "markdown content here"
}}"""

    response = call_claude(prompt)

    # Parse JSON from response (handle potential markdown wrapping)
    text = response.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
        text = text.rsplit("```", 1)[0]

    return json.loads(text)


def main():
    if not ANTHROPIC_API_KEY:
        print("ERROR: ANTHROPIC_API_KEY not set")
        sys.exit(1)

    # Load existing posts
    if POSTS_FILE.exists():
        with open(POSTS_FILE, "r") as f:
            posts = json.load(f)
    else:
        posts = []

    # Generate new post
    print(f"Generating blog post...")
    post_data = generate_post()

    # Create ID from title
    post_id = post_data["title"].lower()
    for ch in "?!@#$%^&*()+=[]{}|\\:;\"'<>,./":
        post_id = post_id.replace(ch, "")
    post_id = "-".join(post_id.split())[:60]

    # Check for duplicate
    if any(p["id"] == post_id for p in posts):
        post_id += f"-{datetime.now().strftime('%m%d')}"

    post_data["id"] = post_id
    post_data["date"] = datetime.now().strftime("%Y-%m-%d")

    # Add to front of list
    posts.insert(0, post_data)

    # Keep last 100 posts max
    posts = posts[:100]

    # Save
    with open(POSTS_FILE, "w") as f:
        json.dump(posts, f, indent=2)

    print(f"Generated: {post_data['title']}")
    print(f"ID: {post_id}")
    print(f"Category: {post_data['category']}")
    return post_data


if __name__ == "__main__":
    main()
