# Supabase Setup Guide

## Quick Start

1. **Create a Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up or log in
   - Click "New project"
   - Fill in project details and wait for setup

2. **Get Your API Keys**
   - Go to Settings > API in your Supabase dashboard
   - Copy the Project URL and anon/public key

3. **Create Environment File**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ADMIN_API_KEY=generate-a-secure-key-here
   ```

4. **Run Database Migrations**
   - Go to SQL Editor in Supabase dashboard
   - Copy and run the contents of `/docs/database-schema.sql`
   - This creates the leads table and sets up security policies

5. **Test the Integration**
   ```bash
   npm run dev
   ```
   - Submit a test lead through the contact form
   - Check Supabase Table Editor to see the new lead

## Admin API Usage

To fetch leads using the admin API:

```bash
curl -H "Authorization: Bearer your-admin-api-key" \
  http://localhost:3000/api/admin/leads
```

To update a lead status:

```bash
curl -X PATCH \
  -H "Authorization: Bearer your-admin-api-key" \
  -H "Content-Type: application/json" \
  -d '{"id": "lead-uuid", "status": "contacted"}' \
  http://localhost:3000/api/admin/leads
```

## Security Notes

1. **API Keys**: 
   - The `anon` key is safe for browser use (has RLS policies)
   - Never expose your `service_role` key
   - Keep `ADMIN_API_KEY` secure and rotate regularly

2. **Row Level Security (RLS)**:
   - Anonymous users can only insert leads
   - Authenticated users can view and update leads
   - Service role bypasses all RLS

3. **Best Practices**:
   - Enable 2FA on your Supabase account
   - Regularly review database access logs
   - Set up alerts for unusual activity

## Troubleshooting

### "Missing Supabase environment variables" error
- Ensure `.env.local` exists and contains valid keys
- Restart your development server after adding env vars

### "Database table not found" error
- Run the migration script in `/docs/database-schema.sql`
- Check that you're connected to the correct project

### "Unauthorized" error on admin endpoints
- Verify your `ADMIN_API_KEY` matches in both `.env.local` and your request
- Ensure you're using `Bearer` prefix in Authorization header

### Leads not appearing in database
- Check browser console for errors
- Verify Supabase project is active (not paused)
- Check RLS policies are correctly applied