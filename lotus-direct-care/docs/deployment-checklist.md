# Deployment Checklist for Vercel

## Pre-Deployment Checklist

- [ ] All environment variables are set in `.env.local` for local testing
- [ ] The application runs successfully locally with `npm run dev`
- [ ] All features work correctly (forms, emails, database)
- [ ] Code is committed to GitHub repository

## Vercel Deployment Steps

### 1. Initial Setup
- [ ] Sign in to [Vercel](https://vercel.com)
- [ ] Import the GitHub repository
- [ ] Select the correct branch (usually `main`)

### 2. Environment Variables
Add all required environment variables in Vercel Dashboard → Settings → Environment Variables:

- [ ] `RESEND_API_KEY` - Your Resend API key
- [ ] `NOTIFICATION_EMAIL` - Email for lead notifications
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- [ ] `ADMIN_API_KEY` - Secure admin API key

### 3. Verification
- [ ] Deploy the project
- [ ] Check build logs for errors
- [ ] Test the live site functionality:
  - [ ] Contact form submission
  - [ ] Email notifications are received
  - [ ] Database entries are created
  - [ ] All pages load correctly

### 4. Domain Setup (Optional)
- [ ] Add custom domain in Vercel settings
- [ ] Configure DNS records
- [ ] Enable HTTPS (automatic with Vercel)

## Post-Deployment

### Security Check
- [ ] Verify `.env.local` is NOT in the repository
- [ ] Check that sensitive keys are not exposed in client-side code
- [ ] Test that admin API endpoints require authentication

### Monitoring
- [ ] Set up error tracking (optional)
- [ ] Monitor Vercel analytics
- [ ] Check Resend dashboard for email delivery
- [ ] Monitor Supabase for database usage

## Troubleshooting Quick Links

- [Vercel Build Logs](https://vercel.com/docs/deployments/logs)
- [Environment Variables Guide](./vercel-setup.md)
- [Quick Reference](./env-quick-reference.md)
- [Email Setup Guide](./email-setup.md)
- [Supabase Setup Guide](./supabase-setup.md)

## Support Contacts

- **Vercel Support**: https://vercel.com/support
- **Resend Support**: https://resend.com/support
- **Supabase Support**: https://supabase.com/support