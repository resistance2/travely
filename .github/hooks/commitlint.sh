#!/usr/bin/env bash
# prepare-commit-msg

if [ -z "$1" ]; then
    echo "Error: No commit message file provided"
    exit 1
fi

COMMIT_MSG_FILE="$1"
COMMIT_SOURCE="$2"

# Validate that commit message file exists
if [ ! -f "$COMMIT_MSG_FILE" ]; then
    echo "Error: Commit message file does not exist: $COMMIT_MSG_FILE"
    exit 1
fi

# Check if .env file exists and byulBash is set to true
if [ -f .env ]; then
    byul_bash=$(grep '^byulBash=' .env | cut -d '=' -f2)
    if [ "$byul_bash" != "true" ]; then
        exit 0
    fi
else
    exit 0
fi

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_color() {
    printf "${1}${2}${NC}\n"
}

read_json_value() {
    json_file="$1"
    key="$2"
    sed -n "s/^.*\"$key\": *\"\\(.*\\)\".*$/\\1/p" "$json_file" | sed 's/,$//'
}

extract_type_and_number() {
    branch_name="$1"
    
    # Extract type (bug, feat, fix, etc.) - take everything before the first slash
    branch_type=$(echo "$branch_name" | cut -d'/' -f1)
    
    # Extract issue number - take the last number sequence in the branch name
    issue_number=$(echo "$branch_name" | grep -Eo '[0-9]+$')
    
    echo "$branch_type|$issue_number"
}

format_commit_message() {
    commit_msg_file="$1"
    commit_source="$2"
    branch_name=$(git symbolic-ref --short HEAD)

    json_file=$(git rev-parse --show-toplevel)/byul.config.json
    if [ ! -f "$json_file" ]; then
        print_color "$YELLOW" "Warning: byul.config.json not found. Using default format."
        byul_format="[{type}] {commitMessage} #{issueNumber}"
    else
        byul_format=$(read_json_value "$json_file" "byulFormat")
        if [ -z "$byul_format" ]; then
            print_color "$YELLOW" "Warning: byulFormat not found in config. Using default format."
            byul_format="[{type}] {commitMessage} #{issueNumber}"
        fi
    fi

    # Extract type and issue number
    extracted=$(extract_type_and_number "$branch_name")
    branch_type=$(echo "$extracted" | cut -d'|' -f1)
    issue_number=$(echo "$extracted" | cut -d'|' -f2)
    echo "Branch type: $branch_type"
    echo "Issue number: $issue_number"
    echo "Commit source: $commit_source"

    if [ -z "$branch_type" ]; then
        print_color "$YELLOW" "Could not extract branch type. Skipping formatting."
        return 1
    fi

    if [ "$commit_source" = "message" ]; then
        # For -m flag commits
        first_line=$(head -n 1 "$commit_msg_file")
        
        formatted_msg=$(echo "$byul_format" |
            sed "s/{type}/$branch_type/g" |
            sed "s/{commitMessage}/$first_line/g" |
            sed "s/{issueNumber}/$issue_number/g")

        echo "$formatted_msg" > "$commit_msg_file.tmp"
        tail -n +2 "$commit_msg_file" >> "$commit_msg_file.tmp"
        mv "$commit_msg_file.tmp" "$commit_msg_file"
    else
        # For editor commits
        template_start=$(grep -n "^#" "$commit_msg_file" | head -n 1 | cut -d: -f1)
        
        formatted_msg=$(echo "$byul_format" |
            sed "s/{type}/$branch_type/g" |
            sed "s/{commitMessage}//g" |
            sed "s/{issueNumber}/$issue_number/g")
        
        formatted_msg=$(echo "$formatted_msg" | sed 's/:  */: /g')

        tmp_file="${commit_msg_file}.tmp"
        echo "$formatted_msg" > "$tmp_file"
        echo "" >> "$tmp_file"
        
        if [ -n "$template_start" ]; then
            tail -n +"$template_start" "$commit_msg_file" >> "$tmp_file"
        fi
        
        mv "$tmp_file" "$commit_msg_file"
    fi

    print_color "$GREEN" "✔ Commit message formatted successfully!"
    print_color "$BLUE" "New commit message: $formatted_msg"
    return 0
}

# Check if the commit is a merge, squash, or amend
if [ "$COMMIT_SOURCE" = "merge" ] || [ "$COMMIT_SOURCE" = "squash" ] || [ "$COMMIT_SOURCE" = "commit" ]; then
    print_color "$BLUE" "Merge, squash, or amend commit detected. Skipping formatting."
    exit 0
fi

if format_commit_message "$COMMIT_MSG_FILE" "$COMMIT_SOURCE"; then
    exit 0
else
    print_color "$RED" "❌ Failed to format commit message."
    exit 0
fi
