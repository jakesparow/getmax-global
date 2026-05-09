"""
LinkedIn OAuth2 Token Generator
Run this ONCE locally to get an access token, then save it as a GitHub secret.

Steps:
1. Run this script: python scripts/linkedin-auth.py
2. It opens your browser to LinkedIn's auth page
3. Approve access
4. Paste the redirect URL back here
5. Script exchanges code for token and prints your LINKEDIN_PERSON_ID and LINKEDIN_ACCESS_TOKEN
6. Save both as GitHub secrets
"""

import http.server
import json
import os
import sys
import urllib.parse
import urllib.request
import webbrowser
import threading

CLIENT_ID = os.environ["LINKEDIN_CLIENT_ID"]
CLIENT_SECRET = os.environ["LINKEDIN_CLIENT_SECRET"]
REDIRECT_URI = "http://localhost:9876/callback"
SCOPES = "openid profile email w_member_social"

auth_code = None

class CallbackHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        global auth_code
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)

        if "code" in params:
            auth_code = params["code"][0]
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(b"<h1>Success! You can close this tab.</h1><p>Go back to the terminal.</p>")
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"<h1>Error: No auth code received</h1>")

    def log_message(self, format, *args):
        pass  # Suppress logs


def get_access_token(code):
    """Exchange auth code for access token."""
    data = urllib.parse.urlencode({
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://www.linkedin.com/oauth/v2/accessToken",
        data=data,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def get_person_id(access_token):
    """Get the LinkedIn person ID (URN)."""
    req = urllib.request.Request(
        "https://api.linkedin.com/v2/userinfo",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        return data.get("sub")


def main():
    # Build auth URL
    auth_url = (
        f"https://www.linkedin.com/oauth/v2/authorization?"
        f"response_type=code&"
        f"client_id={CLIENT_ID}&"
        f"redirect_uri={urllib.parse.quote(REDIRECT_URI)}&"
        f"scope={urllib.parse.quote(SCOPES)}"
    )

    print("=" * 60)
    print("LINKEDIN OAUTH2 SETUP")
    print("=" * 60)
    print(f"\nOpening browser to authorize...")
    print(f"\nIf browser doesn't open, visit:\n{auth_url}\n")

    # Start local callback server
    server = http.server.HTTPServer(("localhost", 9876), CallbackHandler)
    thread = threading.Thread(target=server.handle_request)
    thread.start()

    # Open browser
    webbrowser.open(auth_url)

    print("Waiting for authorization...")
    thread.join(timeout=120)
    server.server_close()

    if not auth_code:
        print("\nERROR: No auth code received. Timed out or cancelled.")
        sys.exit(1)

    print(f"\nAuth code received! Exchanging for token...")

    # Exchange for token
    token_data = get_access_token(auth_code)
    access_token = token_data["access_token"]
    expires_in = token_data.get("expires_in", "unknown")

    # Get person ID
    person_id = get_person_id(access_token)

    print("\n" + "=" * 60)
    print("SUCCESS! Save these as GitHub secrets:")
    print("=" * 60)
    print(f"\nLINKEDIN_ACCESS_TOKEN={access_token}")
    print(f"LINKEDIN_PERSON_ID={person_id}")
    print(f"\nToken expires in: {expires_in} seconds (~{int(expires_in)//86400} days)")
    print(f"\nRun these commands:")
    print(f'  echo "{access_token}" | gh secret set LINKEDIN_ACCESS_TOKEN --repo jakesparow/getmax-global')
    print(f'  echo "{person_id}" | gh secret set LINKEDIN_PERSON_ID --repo jakesparow/getmax-global')


if __name__ == "__main__":
    main()
