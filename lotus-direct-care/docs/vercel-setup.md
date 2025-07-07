# Vercel Deployment Guide

This guide walks you through deploying the Lotus Direct Care website to Vercel with proper environment variable configuration.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Access to the GitHub repository
- API credentials for Resend and Supabase

## Environment Variables

The application requires the following environment variables:

| Variable | Description | Required | Used By |
|----------|-------------|----------|---------|
| `RESEND_API_KEY` | Resend API key for sending emails | Yes | Server-side email service |
| `NOTIFICATION_EMAIL` | Email address to receive lead notifications | Yes | Lead notification system |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes | Client & server-side database |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes | Client & server-side database |
| `ADMIN_API_KEY` | Secure key for admin API authentication | Yes | Admin API endpoints |

### Important Notes on Naming Convention

- Variables starting with `NEXT_PUBLIC_` are exposed to the browser/client-side code
- Variables without this prefix are only available server-side
- The Supabase variables use `NEXT_PUBLIC_` prefix because the client needs to connect directly to Supabase
- The `RESEND_API_KEY` does NOT use the prefix as it must remain secret and server-side only

## Step-by-Step Deployment

### 1. Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Choose the repository branch to deploy (usually `main`)

### 2. Configure Environment Variables

During the import process, or from your project settings:

1. Navigate to your project dashboard on Vercel
2. Go to **Settings** → **Environment Variables**
3. Add each environment variable:

#### Adding RESEND_API_KEY
- **Key**: `RESEND_API_KEY`
- **Value**: Your Resend API key (starts with `re_`)
- **Environment**: Select all (Production, Preview, Development)
- Click "Save"

#### Adding NOTIFICATION_EMAIL
- **Key**: `NOTIFICATION_EMAIL`
- **Value**: Email address for receiving notifications (e.g., `info@lotusdirectcare.com`)
- **Environment**: Select all
- Click "Save"

#### Adding NEXT_PUBLIC_SUPABASE_URL
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Your Supabase project URL (e.g., `https://your-project.supabase.co`)
- **Environment**: Select all
- Click "Save"

#### Adding NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anonymous key (a long JWT token)
- **Environment**: Select all
- Click "Save"

#### Adding ADMIN_API_KEY
- **Key**: `ADMIN_API_KEY`
- **Value**: A secure random string (generate with `openssl rand -base64 32`)
- **Environment**: Select all
- Click "Save"

### 3. Deploy

1. After adding all environment variables, click "Deploy"
2. Vercel will build and deploy your application
3. Monitor the build logs for any errors

## Getting Your API Credentials

### Resend API Key

1. Sign up or log in at [resend.com](https://resend.com)
2. Go to [API Keys](https://resend.com/api-keys)
3. Click "Create API Key"
4. Give it a name (e.g., "Lotus Direct Care Production")
5. Copy the generated key (starts with `re_`)
6. **Important**: Save this key securely - you won't be able to see it again

### Supabase Credentials

1. Log in to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Find these values:
   - **Project URL**: Copy the URL under "Project URL"
   - **Anon/Public Key**: Copy the key under "Project API keys" → "anon public"

## Security Best Practices

### 1. Never Commit Sensitive Keys

- The `.env.local` file is gitignored and should never be committed
- Only commit `.env.example` with placeholder values
- Use Vercel's environment variables for production secrets

### 2. Principle of Least Privilege

- Use separate API keys for development and production
- Limit API key permissions when possible
- Rotate keys periodically

### 3. Environment-Specific Variables

You can set different values for different environments in Vercel:

- **Production**: Live website
- **Preview**: Pull request previews
- **Development**: Local development (though local uses `.env.local`)

### 4. Sensitive vs Public Variables

- **Server-only** (without `NEXT_PUBLIC_` prefix):
  - API keys that should never be exposed (RESEND_API_KEY, ADMIN_API_KEY)
  - Database passwords
  - Admin emails (NOTIFICATION_EMAIL)
  
- **Client-side** (with `NEXT_PUBLIC_` prefix):
  - Public API endpoints
  - Public keys (like Supabase anon key)
  - Feature flags

## Troubleshooting

### Build Failures

If your build fails:

1. Check the build logs in Vercel dashboard
2. Ensure all required environment variables are set
3. Verify variable names match exactly (case-sensitive)
4. Check that values don't have extra spaces or quotes

### Email Not Working

1. Verify `RESEND_API_KEY` is set correctly
2. Check that the sending domain is verified in Resend
3. Ensure `NOTIFICATION_EMAIL` is a valid email address
4. Check Resend dashboard for failed email attempts

### Database Connection Issues

1. Verify Supabase URL and key are correct
2. Check Supabase dashboard for any service issues
3. Ensure database migrations have been run
4. Check browser console for client-side errors

### Environment Variable Not Found

If you see "undefined" for environment variables:

1. Ensure variable names are spelled correctly
2. For client-side access, ensure the `NEXT_PUBLIC_` prefix is used
3. Redeploy after adding new environment variables
4. Clear browser cache if testing client-side variables

## Local Development

For local development, create a `.env.local` file in your project root:

```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

## Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Resend Documentation](https://resend.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## Support

If you encounter issues:

1. Check the Vercel deployment logs
2. Review this documentation
3. Check the project's GitHub issues
4. Contact your development team