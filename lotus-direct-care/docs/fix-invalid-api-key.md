# Fix Invalid API Key Error - Research System

## Issue Identification

The debug output shows:
- Service key length: 218 characters (should be 219)
- Service key starts with: "yJhbGciOiJ..." (should start with "eyJhbGciOiJ...")
- Error: "Invalid API key"

**The service role key is missing the first character "e".**

## Immediate Fix Steps

### 1. Get the Correct Service Role Key

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings → API**
4. Under "Project API keys", find **service_role (secret)**
5. Click "Reveal" to show the key
6. **IMPORTANT**: Copy the ENTIRE key (should be exactly 219 characters)
7. The key should start with "eyJhbGciOiJ" (not "yJhbGciOiJ")

### 2. Update in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (ldcshadcn)
3. Go to **Settings → Environment Variables**
4. Find `SUPABASE_SERVICE_ROLE_KEY`
5. Click the three dots → Edit
6. **DELETE the entire current value**
7. **PASTE the complete key** from Supabase
8. Verify it starts with "eyJ" (not "yJ")
9. Click "Save"

### 3. Redeploy

1. In Vercel dashboard, go to the **Deployments** tab
2. Click the three dots on the latest deployment
3. Select "Redeploy"
4. Wait for deployment to complete

### 4. Verify the Fix

Visit these URLs after deployment:
1. `/api/admin/research/debug` - Should show:
   - serviceKeyLength: 219
   - serviceKeyFirstChar: "e"
   - serviceKeyStart: "eyJhbGciOiJ..."

2. `/admin/research/diagnostics` - Should show all green checkmarks

## Common Mistakes to Avoid

### ❌ Don't Make These Mistakes:
- Don't manually type the key
- Don't add quotes around the key
- Don't add spaces before or after
- Don't use the anon key instead of service_role key
- Don't copy from email/Slack where characters might be replaced

### ✅ Do This Instead:
- Copy directly from Supabase dashboard
- Use Ctrl+A to select all when the key is revealed
- Paste immediately into Vercel
- Double-check the first few characters match "eyJhbGciOiJ"

## Why This Happens

1. **Partial Copy**: The most common cause is not selecting the entire key when copying
2. **UI Issues**: Some browsers don't select the first character when clicking "Copy"
3. **Text Editors**: Pasting into text editors first can sometimes strip characters

## Prevention

To prevent this in the future:
1. Always verify key length (should be 219 characters)
2. Always check the key starts with "eyJ"
3. Use the browser's developer tools to inspect the input field after pasting
4. Consider using a password manager to store the complete key

## Still Not Working?

If the issue persists after following these steps:

1. **Clear Vercel Cache**:
   - Settings → Functions → Clear Cache
   - Redeploy

2. **Check for Spaces**:
   - Edit the environment variable
   - Make sure there are no spaces at the beginning or end
   - The value should be exactly 219 characters

3. **Try Manual Test**:
   - Use the debug script locally with the same key
   - If it works locally but not on Vercel, the issue is with how the key is stored

4. **Contact Support**:
   - Supabase support can verify if your service role key is valid
   - Vercel support can help with environment variable issues