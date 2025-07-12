# Debugging Guide - Lotus Direct Care

This guide helps troubleshoot common issues during development and deployment.

## Table of Contents
- [Build Errors](#build-errors)
- [TypeScript Errors](#typescript-errors)
- [Deployment Issues](#deployment-issues)
- [Runtime Errors](#runtime-errors)
- [Database Issues](#database-issues)
- [AI Service Errors](#ai-service-errors)
- [Email Issues](#email-issues)

---

## Build Errors

### Error: "Module not found"
**Symptoms**: 
```
Module not found: Can't resolve '@/lib/...'
```

**Solution**:
1. Check import path uses @ alias correctly
2. Verify file exists at the path
3. Check for typos in import statement
4. Ensure tsconfig.json has correct path mapping:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Error: "Cannot find module 'X' or its corresponding type declarations"
**Solution**:
1. Install missing package: `npm install X`
2. If types are missing: `npm install @types/X`
3. Check package.json includes the dependency
4. Run `npm install` to ensure all deps are installed

---

## TypeScript Errors

### Error: "Parameter 'X' implicitly has an 'any' type"
**Example**: Fixed in `/lib/services/blog-db.ts` line 37

**Solution**:
```typescript
// Before
data.map(post => this.convertToBlogPost(post))

// After
data.map((post: DatabaseBlogPost) => this.convertToBlogPost(post))
```

### Error: "Object is possibly 'null' or 'undefined'"
**Solution**:
1. Add null checks:
```typescript
if (!data) return null;
```
2. Use optional chaining:
```typescript
data?.property?.value
```
3. Provide default values:
```typescript
const value = data?.property || 'default';
```

### Error: "Type 'X' is not assignable to type 'Y'"
**Common Causes**:
- Missing properties in object literals
- Incorrect return types
- Mismatched function signatures

**Solution**:
1. Check the type definition
2. Ensure all required properties are included
3. Use type assertions if necessary (sparingly)

---

## Deployment Issues

### Vercel Build Failures

#### Pre-deployment Checklist:
```bash
# 1. Build locally
npm run build

# 2. Type check
npx tsc --noEmit

# 3. Check for errors
# Fix any errors before pushing
```

#### Common Vercel Errors:

**"Error: No output directory found"**
- Ensure `.next` folder is created during build
- Check `next.config.js` for custom output settings

**"Error: Missing environment variable"**
1. Check Vercel dashboard > Settings > Environment Variables
2. Add all variables from `.env.example`
3. Redeploy after adding variables

**"Function timeout"**
- Default timeout is 10s for hobby plan
- Upgrade to Pro for 60s timeout
- Or optimize long-running functions

### Edge Runtime Compatibility

**Error**: "Module not supported in Edge Runtime"
**Common incompatible modules**:
- `crypto` (use Web Crypto API instead)
- `fs` (file system not available)
- `sendgrid` (use fetch-based email service)

**Solution**:
1. Remove `runtime = 'edge'` from the route
2. Or replace with Edge-compatible alternatives:
```typescript
// Instead of Node crypto
import { randomUUID } from 'crypto';

// Use Web Crypto API
const id = crypto.randomUUID();
```

---

## Runtime Errors

### API Route Errors

**401 Unauthorized**
- Check authentication headers
- Verify admin token is correct
- Ensure cookies are being sent

**Debug authentication**:
```typescript
console.log('Headers:', request.headers);
console.log('Cookies:', request.cookies);
```

**500 Internal Server Error**
1. Check Vercel function logs
2. Add try-catch blocks
3. Log errors with context:
```typescript
try {
  // code
} catch (error) {
  console.error('Error in API route:', {
    error: error.message,
    stack: error.stack,
    body: await request.json()
  });
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

### CORS Errors
**Solution for API routes**:
```typescript
// Add CORS headers
return new NextResponse(body, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});
```

---

## Research Features 500 Errors

### Symptoms:
- Getting 500 errors when trying to create research queries or sources
- Authentication passes but database operations fail

### Possible Causes & Solutions:

1. **Database tables not created**
   ```bash
   # Run the migration locally or in Supabase dashboard
   supabase migration up
   ```
   - Verify these tables exist: `research_sources`, `research_queries`, `research_results`, `research_history`

2. **Row Level Security (RLS) blocking access**
   - Check Supabase dashboard > Authentication > Policies
   - The migration created policies for authenticated access
   - If still failing, temporarily disable RLS on research tables for testing

3. **Environment variables not set in Vercel**
   - Go to Vercel dashboard > Settings > Environment Variables
   - Ensure these are set:
     - `ADMIN_API_KEY` (required)
     - `SUPABASE_SERVICE_ROLE_KEY` (required)
     - `GEMINI_API_KEY` (optional for now)
     - `FIRECRAWL_API_KEY` (optional for now)

4. **Check Vercel Function Logs**
   - Go to Vercel dashboard > Functions tab
   - Look for the failing API route (e.g., `/api/admin/research/queries`)
   - Check logs for specific error messages

### Debugging Steps:
1. Check browser console for request/response details
2. Look at Vercel function logs for server-side errors
3. Verify the data being sent matches expected format
4. Check if auth tokens are being properly sent

### If Sources Don't Appear:

1. **Use the System Check button** on the Research Dashboard
   - This runs comprehensive diagnostics
   - Shows which tables exist and record counts
   - Checks environment variables
   - Tests write permissions

2. **Check Vercel Logs** for the sources page
   - Look for "Fetching research sources..." log
   - Check if it shows "Found X sources"
   - Look for any error messages

3. **Verify Migration Status**
   - The sources were added in migration files:
     - `20250711_create_research_tables.sql` (7 default sources)
     - `20250711_add_curated_research_sources.sql` (20 additional sources)
   - Run migrations in Supabase dashboard or locally

4. **Manual Database Check**
   - Go to Supabase dashboard > Table Editor
   - Check if `research_sources` table exists
   - Check if it has any records
   - If table exists but is empty, migrations may have failed silently

---

## Database Issues

### Supabase Connection Errors

**"Invalid API key"**
1. Check SUPABASE_SERVICE_ROLE_KEY in env
2. Verify you're using service role key for server operations
3. Use anon key for client-side operations

**"relation does not exist"**
1. Check migration files have been run
2. Verify table name spelling
3. Run migrations:
```bash
npx supabase migration up
```

**"permission denied for table"**
1. Check Row Level Security (RLS) policies
2. Use service role client for admin operations
3. Add appropriate policies in Supabase dashboard

### Query Debugging
```typescript
// Log the query for debugging
console.log('Query:', {
  table: 'blog_posts_ai',
  filters: { status: 'published' },
  order: 'published_at'
});

const { data, error } = await supabase
  .from('blog_posts_ai')
  .select('*')
  .eq('status', 'published');

if (error) {
  console.error('Supabase error:', error);
}
```

---

## AI Service Errors

### Anthropic API Errors

**"Invalid API key"**
- Verify ANTHROPIC_API_KEY is set
- Check key starts with 'sk-'
- Ensure no extra spaces in env variable

**"Rate limit exceeded"**
```typescript
// Implement exponential backoff
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}
```

**"Context length exceeded"**
- Reduce prompt size
- Truncate content if necessary
- Use streaming for long responses

### Common AI Prompt Issues

**Poor quality responses**:
1. Check temperature settings (0.7 is good default)
2. Improve system prompts
3. Add examples to prompts
4. Be specific about format requirements

---

## Email Issues

### SendGrid Errors

**"Unauthorized"**
- Verify SENDGRID_API_KEY
- Check sender email is verified
- Ensure FROM email matches verified sender

**"Message send failed"**
```typescript
// Debug email sending
console.log('Email config:', {
  to: email,
  from: process.env.SENDGRID_FROM_EMAIL,
  subject: subject,
  hasHtml: !!html,
  hasText: !!text
});
```

**Email not received**:
1. Check spam folder
2. Verify recipient email
3. Check SendGrid dashboard for bounces
4. Test with a different email provider

### Email Template Issues

**Styles not rendering**:
- Use inline styles for email
- Avoid external CSS
- Test with email preview tools

**React Email debugging**:
```typescript
// Preview email locally
import { render } from '@react-email/render';

const html = render(<EmailTemplate {...props} />);
console.log('Email HTML:', html);
```

---

## Quick Debugging Commands

```bash
# Check TypeScript errors
npx tsc --noEmit

# Build locally
npm run build

# Check for unused dependencies
npx depcheck

# Clear Next.js cache
rm -rf .next

# Check environment variables
npm run env:check

# Test API endpoint
curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -H "x-admin-token: your-token" \
  -d '{"test": "data"}'
```

---

## Debugging Tips

1. **Always check logs first**
   - Browser console for client errors
   - Terminal for server errors
   - Vercel logs for production

2. **Use descriptive console.logs**
   ```typescript
   console.log('[BlogService] Fetching posts:', { 
     status, 
     limit, 
     offset 
   });
   ```

3. **Enable source maps in production**
   - Helps with error tracking
   - Configure in next.config.js

4. **Test incrementally**
   - Make small changes
   - Test after each change
   - Commit working versions

5. **Use proper error boundaries**
   - Catch errors in React components
   - Provide fallback UI
   - Log errors for debugging

---

*Update this guide when encountering new issues and solutions.*