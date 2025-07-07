# Environment Variables Quick Reference

## Required Variables

```bash
# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTIFICATION_EMAIL=info@lotusdirectcare.com

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Admin API Security
ADMIN_API_KEY=your-secure-random-key-here
```

## Local Development Setup

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials in `.env.local`

3. Start the development server:
   ```bash
   npm run dev
   ```

## Vercel Deployment

Add these variables in Vercel Dashboard → Settings → Environment Variables:

- ✅ Set for all environments (Production, Preview, Development)
- ✅ No quotes needed around values
- ✅ Case-sensitive - copy names exactly

## Getting Credentials

### Resend
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys → Create API Key
3. Copy the key starting with `re_`

### Supabase
1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project → Settings → API
3. Copy the Project URL and anon public key

## Troubleshooting

- **Build fails**: Check all variables are set in Vercel
- **Emails not sending**: Verify RESEND_API_KEY and domain verification
- **Database errors**: Check Supabase credentials and migrations