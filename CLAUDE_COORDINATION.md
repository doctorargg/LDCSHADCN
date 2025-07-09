# Claude Code Coordination File

## 🚦 Active Development Status

### Current Branches
- **main**: Production branch (DO NOT WORK HERE DIRECTLY)
- **develop**: Integration branch for testing
- **ai-integration**: AI/Backend work (Terminal 1)
- **frontend-updates**: UI/Frontend work (Terminal 2)

---

## 📋 Current Work Status

### Terminal 1 (AI Integration) - THIS TERMINAL
- **Current Branch**: ai-integration
- **Working on**: Setting up AI email response system and blog automation
- **Focus Areas**: 
  - `/lib/ai/*` - AI service implementations
  - `/app/api/*` - API endpoints for AI features
  - Database migrations and schemas
  - Environment configuration
- **Last Update**: 2025-01-09 (Initial setup)

### Terminal 2 (Frontend Updates) - YOUR OTHER TERMINAL
- **Current Branch**: frontend-updates
- **Working on**: [Awaiting your updates]
- **Focus Areas**:
  - `/components/*` - React components
  - `/app/*` - Next.js pages (except /app/api/*)
  - `/public/*` - Static assets
  - `/styles/*` - CSS and styling
- **Last Update**: [Awaiting your updates]

---

## 🚫 No-Touch Zones

### Terminal 1 (AI) MUST AVOID:
- `/components/*` - All UI components
- `/app/*` - All pages EXCEPT `/app/api/*`
- `/public/images/*` - Image assets
- `/styles/*` - Styling files

### Terminal 2 (Frontend) MUST AVOID:
- `/lib/ai/*` - AI implementation files
- `/app/api/*` - API routes
- `*.sql` - Database files
- `.env*` - Environment files
- `/lib/supabase.ts` - Database connection
- Any AI configuration files

---

## 📝 Git Commit Message Convention

Use this format: `type(scope): description`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
- `feat(ai): add email response generation`
- `feat(ui): update hero section design`
- `fix(api): resolve SendGrid integration issue`
- `docs(readme): update installation instructions`

---

## 🔄 Workflow Process

1. **Before Starting Work:**
   - Pull latest changes: `git pull origin develop`
   - Check this file for updates
   - Ensure you're on correct branch

2. **During Work:**
   - Make small, focused commits
   - Update this file if changing work areas
   - Test changes locally

3. **After Completing Feature:**
   - Push to your branch
   - Create PR to develop branch
   - Update status in this file

---

## 📊 Integration Points

These files may require coordination between terminals:

1. **API Endpoints** - Terminal 1 creates, Terminal 2 consumes
2. **Type Definitions** - Shared interfaces in `/lib/types/*`
3. **Environment Variables** - Coordinate any new additions

---

## 🎯 Current Sprint Goals

### AI Integration (Terminal 1):
1. ✅ Set up version control
2. ⏳ Create AI email response system
3. ⏳ Implement blog automation
4. ⏳ Build admin dashboard
5. ⏳ Add CRM features

### Frontend Updates (Terminal 2):
[To be defined by you]

---

## 💬 Communication

- Update this file when starting major work
- Use clear commit messages
- Comment code that interfaces with other terminal's work
- Flag any blocking issues immediately

---

## 🚀 Quick Commands

### For Terminal 1 (AI):
```bash
git checkout ai-integration
git pull origin develop
# ... make changes ...
git add .
git commit -m "feat(ai): your message"
git push origin ai-integration
```

### For Terminal 2 (Frontend):
```bash
git checkout frontend-updates
git pull origin develop
# ... make changes ...
git add .
git commit -m "feat(ui): your message"
git push origin frontend-updates
```

---

Last Updated: 2025-01-09 by Terminal 1 (AI Integration)