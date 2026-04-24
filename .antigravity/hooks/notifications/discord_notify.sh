#!/bin/bash

# ┌─────────────────────────────────────────────────────────────────────────┐
# │ DEPRECATED: This script is no longer maintained                         │
# │                                                                         │
# │ Use notify.cjs instead - zero dependencies, works everywhere:           │
# │   node .antigravity/hooks/notifications/notify.cjs                           │
# │                                                                         │
# │ In your settings.json:                                                  │
# │   "Stop": [{"matcher": "*", "hooks": [{"type": "command",               │
# │     "command": "node .antigravity/hooks/notifications/notify.cjs"}]}]        │
# └─────────────────────────────────────────────────────────────────────────┘

echo "⚠️  DEPRECATED: discord_notify.sh is no longer maintained" >&2
echo "   Use: node .antigravity/hooks/notifications/notify.cjs" >&2
echo "   See: .antigravity/hooks/notifications/docs/discord-hook-setup.md" >&2
exit 1

# --- LEGACY CODE BELOW (kept for reference) ---

# Load environment variables with priority: process.env > .antigravity/.env > .antigravity/hooks/.env
load_env() {
    # 1. Start with lowest priority: .antigravity/hooks/.env
    if [[ -f "$(dirname "$0")/.env" ]]; then
        set -a
        source "$(dirname "$0")/.env"
        set +a
    fi

    # 2. Override with .antigravity/.env
    if [[ -f .antigravity/.env ]]; then
        set -a
        source .antigravity/.env
        set +a
    fi

    # 3. Process env (already loaded) has highest priority - no action needed
    # Variables already in process.env will not be overwritten by 'source'
}

load_env

# Read JSON input from stdin
INPUT=$(cat)

# Extract relevant information from the hook input
HOOK_TYPE=$(echo "$INPUT" | jq -r '.hookType // "unknown"')
PROJECT_DIR=$(echo "$INPUT" | jq -r '.projectDir // ""')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
SESSION_ID=$(echo "$INPUT" | jq -r '.sessionId // ""')
PROJECT_NAME=$(basename "$PROJECT_DIR")

# Configuration - these will be set via environment variables
DISCORD_WEBHOOK_URL="${DISCORD_WEBHOOK_URL:-}"

# Validate required environment variables
if [[ -z "$DISCORD_WEBHOOK_URL" ]]; then
    echo "⚠️  Discord notification skipped: DISCORD_WEBHOOK_URL not set" >&2
    exit 0
fi

# Function to send Discord message with embeds
send_discord_embed() {
    local title="$1"
    local description="$2"
    local color="$3"
    local fields="$4"

    local payload=$(cat <<EOF
{
    "embeds": [{
        "title": "$title",
        "description": "$description",
        "color": $color,
        "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%S.000Z)",
        "footer": {
            "text": "Project Name • ${PROJECT_NAME}"
        },
        "fields": $fields
    }]
}
EOF
)

    curl -s -X POST "$DISCORD_WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "$payload" > /dev/null 2>&1
}

# Generate summary based on hook type
case "$HOOK_TYPE" in
    "Stop")
        # Extract tool usage summary
        TOOLS_USED=$(echo "$INPUT" | jq -r '.toolsUsed[]?.tool // empty' | sort | uniq -c | sort -nr)
        FILES_MODIFIED=$(echo "$INPUT" | jq -r '.toolsUsed[]? | select(.tool == "Edit" or .tool == "Write" or .tool == "MultiEdit") | .parameters.file_path // empty' | sort | uniq)

        # Count operations
        TOTAL_TOOLS=$(echo "$INPUT" | jq '.toolsUsed | length')

        # Build description
        DESCRIPTION="✅ Google Antigravity session completed successfully"

        # Build tools used text
        TOOLS_TEXT=""
        if [[ -n "$TOOLS_USED" ]]; then
            TOOLS_TEXT=$(echo "$TOOLS_USED" | while read count tool; do
                echo "• **${count}** ${tool}"
            done | paste -sd '\n' -)
        else
            TOOLS_TEXT="No tools used"
        fi

        # Build files modified text
        FILES_TEXT=""
        if [[ -n "$FILES_MODIFIED" ]]; then
            FILES_TEXT=$(echo "$FILES_MODIFIED" | while IFS= read -r file; do
                if [[ -n "$file" ]]; then
                    relative_file=$(echo "$file" | sed "s|^${PROJECT_DIR}/||")
                    echo "• \`${relative_file}\`"
                fi
            done | paste -sd '\n' -)
        else
            FILES_TEXT="No files modified"
        fi

        # Build fields JSON
        FIELDS=$(cat <<EOF
[
    {
        "name": "⏰ Session Time",
        "value": "${TIMESTAMP}",
        "inline": true
    },
    {
        "name": "🔧 Total Operations",
        "value": "${TOTAL_TOOLS}",
        "inline": true
    },
    {
        "name": "🆔 Session ID",
        "value": "\`${SESSION_ID:0:8}...\`",
        "inline": true
    },
    {
        "name": "📦 Tools Used",
        "value": "${TOOLS_TEXT}",
        "inline": false
    },
    {
        "name": "📝 Files Modified",
        "value": "${FILES_TEXT}",
        "inline": false
    },
    {
        "name": "📍 Location",
        "value": "\`${PROJECT_DIR}\`",
        "inline": false
    }
]
EOF
)

        send_discord_embed "🤖 Google Antigravity Session Complete" "$DESCRIPTION" 5763719 "$FIELDS"
        ;;

    "SubagentStop")
        SUBAGENT_TYPE=$(echo "$INPUT" | jq -r '.subagentType // "unknown"')

        DESCRIPTION="Specialized agent completed its task"

        FIELDS=$(cat <<EOF
[
    {
        "name": "⏰ Time",
        "value": "${TIMESTAMP}",
        "inline": true
    },
    {
        "name": "🔧 Agent Type",
        "value": "${SUBAGENT_TYPE}",
        "inline": true
    },
    {
        "name": "🆔 Session ID",
        "value": "\`${SESSION_ID:0:8}...\`",
        "inline": true
    },
    {
        "name": "📍 Location",
        "value": "\`${PROJECT_DIR}\`",
        "inline": false
    }
]
EOF
)

        send_discord_embed "🎯 Google Antigravity Subagent Complete" "$DESCRIPTION" 3447003 "$FIELDS"
        ;;

    *)
        DESCRIPTION="Google Antigravity event triggered"

        FIELDS=$(cat <<EOF
[
    {
        "name": "⏰ Time",
        "value": "${TIMESTAMP}",
        "inline": true
    },
    {
        "name": "📋 Event Type",
        "value": "${HOOK_TYPE}",
        "inline": true
    },
    {
        "name": "🆔 Session ID",
        "value": "\`${SESSION_ID:0:8}...\`",
        "inline": true
    },
    {
        "name": "📍 Location",
        "value": "\`${PROJECT_DIR}\`",
        "inline": false
    }
]
EOF
)

        send_discord_embed "📝 Google Antigravity Event" "$DESCRIPTION" 10070709 "$FIELDS"
        ;;
esac

# Log the notification (optional)
echo "✅ Discord notification sent for $HOOK_TYPE event in project $PROJECT_NAME" >&2
