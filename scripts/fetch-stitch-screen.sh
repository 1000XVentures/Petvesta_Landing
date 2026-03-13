#!/usr/bin/env bash
# Fetch a Stitch screen via MCP and download screenshot (and optionally try HTML).
# Usage: STITCH_API_KEY=your_key ./fetch-stitch-screen.sh [projectId] [screenId]
# Default: project 15740684377947103030, screen 87bc53aac7d1491ca5d6ac8b4e6a6253

set -e
PROJECT_ID="${1:-15740684377947103030}"
SCREEN_ID="${2:-87bc53aac7d1491ca5d6ac8b4e6a6253}"
API_KEY="${STITCH_API_KEY:?Set STITCH_API_KEY}"

RESP=$(curl -s -X POST "https://stitch.googleapis.com/mcp" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Goog-Api-Key: $API_KEY" \
  -d "{\"jsonrpc\":\"2.0\",\"id\":\"1\",\"method\":\"tools/call\",\"params\":{\"name\":\"get_screen\",\"arguments\":{\"projectId\":\"$PROJECT_ID\",\"screenId\":\"$SCREEN_ID\"}}}")

# Extract screenshot URL and title (simple approach)
SCREENSHOT_URL=$(echo "$RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)
sc = d.get('result', {}).get('structuredContent', {}).get('screenshot', {})
print(sc.get('downloadUrl', ''))
" 2>/dev/null)
TITLE=$(echo "$RESP" | python3 -c "
import json, sys, re
d = json.load(sys.stdin)
text = json.dumps(d)
# title is in content[0].text as JSON
m = re.search(r'\"title\":\s*\"([^\"]+)\"', text)
print(m.group(1).replace(' ', '-').replace('/', '-') if m else 'screen')
" 2>/dev/null)

OUTDIR="stitch-export/screens/${TITLE:-screen}"
mkdir -p "$OUTDIR"
echo "$RESP" | python3 -m json.tool > "$OUTDIR/screen_metadata.json" 2>/dev/null || echo "$RESP" > "$OUTDIR/screen_raw.json"

if [ -n "$SCREENSHOT_URL" ]; then
  curl -L -o "$OUTDIR/$TITLE.png" "$SCREENSHOT_URL"
  echo "Downloaded screenshot to $OUTDIR/$TITLE.png"
else
  echo "Could not extract screenshot URL from MCP response."
fi
