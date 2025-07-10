# Environment Variable Setup Guide

## 🔧 Vercel Environment Configuration

### Step 1: Access Vercel Dashboard
1. Log in to your Vercel account
2. Navigate to your project (lotus-direct-care)
3. Go to Settings → Environment Variables

### Step 2: Required Environment Variables

#### 🔐 Authentication & Security
```bash
# Admin API Key - Generate a secure random string (32+ characters)
# Example: openssl rand -base64 32
ADMIN_API_KEY=your_secure_admin_api_key_here

# Cron Secret - For securing automated tasks
# Example: openssl rand -base64 24
CRON_SECRET=your_secure_cron_secret_here
```

#### 🤖 AI Configuration
```bash
# Anthropic API Key (Required for Claude)
# Get from: https://console.anthropic.com/
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx

# OpenAI API Key (Optional - for GPT models)
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-xxxxxxxxxxxxx

# Google AI API Key (Optional - for Gemini)
# Get from: https://makersuite.google.com/app/apikey
GOOGLE_AI_API_KEY=AIzaxxxxxxxxxxxxx
```

#### 🗄️ Database Configuration
```bash
# Supabase Configuration
# Get from: https://app.supabase.com/project/YOUR_PROJECT/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

#### 📧 Email Configuration (Optional)
```bash
# Resend API Key - For traditional email sending
# Get from: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

#### ⚙️ Feature Flags & Configuration
```bash
# Feature Flags
FEATURE_AI_EMAIL_RESPONSES=true
FEATURE_AI_BLOG_AUTOMATION=true
FEATURE_AI_CRM_INTEGRATION=false

# AI Model Configuration
AI_MODEL_PRIMARY=claude-3-5-sonnet-20241022
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=4000

# Email Response Configuration
AI_EMAIL_RESPONSE_DELAY_MS=120000  # 2 minutes delay

# Blog Generation Configuration
AI_BLOG_GENERATION_ENABLED=true
AI_BLOG_SCHEDULE_CRON="0 9 * * 1"  # Every Monday at 9am
AI_BLOG_MIN_WORDS=800
AI_BLOG_MAX_WORDS=1200
```

### Step 3: Setting Variables in Vercel

1. In Vercel Dashboard, go to Settings → Environment Variables
2. For each variable:
   - Click "Add New"
   - Enter the Key (e.g., `ANTHROPIC_API_KEY`)
   - Enter the Value
   - Select environments:
     - ✅ Production
     - ✅ Preview
     - ✅ Development (optional)
   - Click "Save"

### Step 4: Generating Secure Keys

#### For ADMIN_API_KEY:
```bash
# Option 1: Using OpenSSL (recommended)
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Using Python
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

#### For CRON_SECRET:
```bash
# Generate a 24-character secret
openssl rand -base64 24
```

### Step 5: Verify Configuration

After setting all variables:
1. Redeploy your application in Vercel
2. Check the deployment logs for any missing variable warnings
3. Test the admin login at `/admin` with your ADMIN_API_KEY

## 🔍 Environment Variable Reference

### Public vs Private Variables
- **NEXT_PUBLIC_*** - These are exposed to the browser
  - Only use for non-sensitive configuration
  - Example: `NEXT_PUBLIC_SUPABASE_URL`
  
- **Private Variables** - Server-side only
  - Use for API keys and secrets
  - Example: `ANTHROPIC_API_KEY`, `ADMIN_API_KEY`

### Variable Scopes

| Variable | Required | Scope | Description |
|----------|----------|-------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Server | Claude AI API access |
| `ADMIN_API_KEY` | Yes | Server | Admin authentication |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server | Supabase admin access |
| `OPENAI_API_KEY` | No | Server | OpenAI GPT access |
| `GOOGLE_AI_API_KEY` | No | Server | Google Gemini access |
| `RESEND_API_KEY` | No | Server | Email service |
| `CRON_SECRET` | Yes | Server | Cron job security |

## 🚨 Security Best Practices

1. **Never commit API keys to Git**
   - Use `.env.local` for local development
   - Ensure `.env*` files are in `.gitignore`

2. **Rotate keys regularly**
   - Change ADMIN_API_KEY monthly
   - Rotate API keys if exposed

3. **Use strong keys**
   - Minimum 32 characters for ADMIN_API_KEY
   - Use cryptographically secure random generators

4. **Limit API key permissions**
   - Use read-only keys where possible
   - Create project-specific API keys

5. **Monitor usage**
   - Check Anthropic/OpenAI dashboards for unusual activity
   - Set up billing alerts

## 🧪 Testing Your Configuration

### Quick Test Script
Create a file `test-env.js` locally:

```javascript
// DO NOT COMMIT THIS FILE
console.log('Testing environment variables...\n');

const required = [
  'ANTHROPIC_API_KEY',
  'ADMIN_API_KEY',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

const optional = [
  'OPENAI_API_KEY',
  'GOOGLE_AI_API_KEY',
  'RESEND_API_KEY'
];

console.log('Required Variables:');
required.forEach(key => {
  const exists = !!process.env[key];
  console.log(`${exists ? '✅' : '❌'} ${key}: ${exists ? 'Set' : 'Missing'}`);
});

console.log('\nOptional Variables:');
optional.forEach(key => {
  const exists = !!process.env[key];
  console.log(`${exists ? '✅' : '⚠️'} ${key}: ${exists ? 'Set' : 'Not set'}`);
});
```

Run with: `node test-env.js`

## 📋 Deployment Checklist

- [ ] All required environment variables are set in Vercel
- [ ] ADMIN_API_KEY is secure (32+ characters)
- [ ] Supabase variables match your project settings
- [ ] At least one AI provider API key is configured
- [ ] Feature flags are set according to your needs
- [ ] Cron configuration matches your timezone
- [ ] No API keys are committed to the repository
- [ ] Test deployment completes successfully
- [ ] Admin login works with your API key

## 🆘 Troubleshooting

### "Missing environment variable" errors
1. Check Vercel logs for specific variable names
2. Ensure variable names match exactly (case-sensitive)
3. Redeploy after adding variables

### "Invalid API key" errors
1. Verify key is copied correctly (no extra spaces)
2. Check API key hasn't expired
3. Ensure you're using the correct key type (e.g., service role vs anon)

### Admin login not working
1. Verify ADMIN_API_KEY is set in Production environment
2. Clear browser cache/cookies
3. Check browser console for specific errors

### AI features not working
1. Check if ANTHROPIC_API_KEY is valid
2. Verify you have API credits available
3. Check Vercel function logs for detailed errors