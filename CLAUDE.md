# Lotus Direct Care - Project Memory & Parallel Development Guide

## 🏥 Project Overview
Lotus Direct Care is a medical practice website for Dr. Aaron Rosenberg, featuring functional medicine and direct primary care services. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Parallel Development Strategy

### Active Branches & Their Purpose
We're using a parallel development approach with different Claude instances working on separate branches:

1. **main** - Production branch (DO NOT WORK HERE DIRECTLY)
2. **develop** - Integration branch for testing before production
3. **ai-integration** - AI/Backend features (Terminal 1)
4. **frontend-updates** - UI/Frontend improvements (Terminal 2)

### Current Development Status

#### 🤖 AI Integration Branch (ai-integration)
**Last Active**: 2025-01-09
**Recent Progress**:
- ✅ Implemented AI-powered email response system
- ✅ Set up blog automation infrastructure
- ✅ Fixed serverless timeout issues
- ✅ Updated to Claude 3.5 Sonnet model
- ✅ Replaced logo image with elegant text branding
- ✅ Created AI configuration and prompt templates
- ✅ Fixed double greeting in AI emails and updated CTAs
- ✅ Implemented complete blog content automation system
- ✅ Built comprehensive admin dashboard with authentication
- ✅ Added email response review interface
- ✅ Created AI settings configuration UI

**Files Modified**:
- `/lib/ai/*` - AI service implementations
- `/lib/ai/blog-generator.ts` - Blog generation service
- `/lib/ai/prompts/blog-content.ts` - Medical blog templates
- `/app/api/ai-email/route.ts` - AI email endpoint
- `/app/api/ai-blog/*` - Blog generation endpoints
- `/app/api/cron/blog-generator/route.ts` - Automated blog cron job
- `/app/api/leads/route.ts` - Enhanced with AI integration
- `/app/admin/*` - Complete admin dashboard
- `/middleware.ts` - Admin authentication middleware
- Database migrations for AI features
- Environment configuration updates
- `vercel.json` - Cron job configuration

#### 🎨 Frontend Updates Branch (frontend-updates)
**Last Active**: 2025-01-09
**Recent Progress**:
- ✅ Updated direct primary care pricing to match membership page
- ✅ Fixed AI integration compatibility
- ✅ Removed email unique constraint

**Files Modified**:
- `/app/services/direct-primary-care/page.tsx` - Pricing updates
- `/app/api/leads/route.ts` - Enhanced lead handling
- Database migration for email constraints

## 📋 Development Workflow

### Before Starting Work
```bash
# Switch to your branch
git checkout [your-branch-name]

# Pull latest changes from develop
git pull origin develop

# Check this file for updates
cat CLAUDE.md
```

### During Development

#### For AI Integration Work (Terminal 1)
- Focus on: `/lib/ai/*`, `/app/api/*`, database files, environment config
- Avoid: UI components, frontend pages, styling files
- Use commit prefix: `feat(ai):`, `fix(ai):`, etc.

#### For Frontend Work (Terminal 2)
- Focus on: `/components/*`, `/app/*` (except api), `/public/*`, `/styles/*`
- Avoid: AI implementation files, API routes, database files
- Use commit prefix: `feat(ui):`, `fix(ui):`, etc.

### After Completing Features
1. Run tests and linting (if available)
2. Commit with descriptive messages
3. Push to your branch
4. Create PR to develop branch
5. Update this file with progress

## 🔄 Integration Strategy

### Merging Order
1. Feature branches → `develop`
2. Test thoroughly on `develop`
3. `develop` → `main` (production deployment)

### Handling Conflicts
- **API Interfaces**: Coordinate changes to shared types in `/lib/types/*`
- **Database Schema**: Always create migrations, never modify existing ones
- **Environment Variables**: Document new variables in `.env.example`

## 📊 Quick Reference

### Key Project Details
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with lotus theme colors
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Email**: Resend API (optional) + AI responses
- **AI**: Claude 3.5 Sonnet via Anthropic API

### Dr. Rosenberg's Credentials
- Licensed Physician (MD)
- Functional Medicine Training (IFM)
- NOT board certified (important for compliance)
- 10+ years of experience

### Important URLs
- Production: lotusdirectcare.com
- Staging: develop branch auto-deploys to Vercel

## 🚦 Current Sprint Focus

### AI Integration Goals
1. ✅ Email response automation
2. ✅ Blog content automation
3. ✅ Admin dashboard for AI management (basic implementation)
4. ⏳ CRM integration features

### Frontend Goals
1. ✅ Pricing consistency across pages
2. ⏳ Enhanced testimonials display
3. ⏳ Improved mobile responsiveness
4. ⏳ Service page enhancements

## 💡 Development Tips

### Working with Claude
1. **Always start by reading this file** to understand current context
2. **Check your branch** before making changes
3. **Use TodoWrite tool** to track complex tasks
4. **Commit frequently** with clear messages
5. **Document API changes** for the other terminal

### Git Commands Quick Reference
```bash
# Check current branch and status
git status

# See recent commits across all branches
git log --oneline --graph --all -20

# Check what files changed on your branch
git diff --stat develop..[your-branch]

# Standard workflow
git add .
git commit -m "type(scope): description"
git push origin [your-branch]
```

## 📝 Commit Message Format
```
<type>(<scope>): <description>

<optional detailed explanation>

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types**: feat, fix, docs, style, refactor, test, chore
**Scopes**: ai, ui, api, db, config, etc.

## 🔗 Related Documentation
- `/CLAUDE_COORDINATION.md` - Detailed branch coordination rules
- `/lotus-direct-care/CLAUDE.md` - Project-specific memory
- `/docs/` - Technical specifications and guides

## 📅 Last Updated
2025-01-09 - Created comprehensive parallel development guide

---

**Remember**: When switching between Claude instances/terminals, always check this file first to understand what work has been done on each branch!