#!/bin/bash

# Deployment script for ai-integration branch
echo "🚀 Deploying ai-integration branch to GitHub and Vercel"
echo "=================================================="

# Navigate to project directory
cd "$(dirname "$0")/.." || exit 1

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📌 Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "ai-integration" ]; then
    echo "❌ Error: Not on ai-integration branch!"
    echo "Run: git checkout ai-integration"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes:"
    git status --porcelain
    echo ""
    read -p "Do you want to commit these changes? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add -A
        git commit -m "chore: commit pending changes before deployment

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
    fi
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push origin ai-integration

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📊 Deployment Status:"
    echo "- Branch: ai-integration"
    echo "- Latest commits:"
    git log --oneline -5
    echo ""
    echo "🔗 Vercel will automatically deploy this branch."
    echo "Check deployment status at: https://vercel.com/dashboard"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi

echo ""
echo "✨ Deployment script completed!"