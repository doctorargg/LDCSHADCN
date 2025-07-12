# Research System Verification Guide

## Quick Test After Deployment

After deploying these fixes, verify the research system is working:

### 1. Check Debug Endpoint
Visit: `https://your-domain.vercel.app/api/admin/research/debug`

You should see:
- Both admin and server client results
- Admin client should show all queries
- Server client may show fewer/no queries (due to RLS)

### 2. Test Query Execution
1. Go to Admin → AI Tools → Research System
2. Click on any existing query (e.g., "Functional Medicine Approaches to...")
3. Click "Run Query"
4. The query should execute successfully without "Query not found" error

### 3. Test Source Management
1. Go to Admin → AI Tools → Research Sources
2. Try editing a source (click edit icon)
3. Make a small change and save
4. Should save without authentication errors

### 4. Test Creating New Query
1. Go to Admin → AI Tools → Research System
2. Click "New Query"
3. Fill in the form and save
4. Run the newly created query

## Common Issues and Solutions

### Issue: "Query not found" error
**Solution**: Already fixed by using admin client in ResearchService

### Issue: "Unauthorized" when editing sources
**Solution**: Already fixed by updating authentication in sources/[id] route

### Issue: Queries show in database but not in UI
**Cause**: RLS policies blocking access
**Solution**: Already fixed by using admin client consistently

## What Was Fixed

1. **ResearchService** (`/lib/services/research-service.ts`)
   - Switched from `createClient()` to `createAdminClient()`
   - Added debug logging
   - Fixed all methods: executeResearch, getActiveSources, saveResults, etc.

2. **Sources API** (`/app/api/admin/research/sources/[id]/route.ts`)
   - Fixed authentication to use admin token instead of supabase.auth
   - Consistent with other admin endpoints

3. **Debug Tools**
   - Added `/api/admin/research/debug` endpoint
   - Created `/scripts/test-research-query.js` for CLI testing

## Architecture Note

All admin research endpoints now follow this pattern:
1. Check for admin token in headers/cookies
2. Use `createAdminClient()` to bypass RLS
3. Perform operations with full database access
4. Return results to authenticated admin users

This ensures consistent behavior across all research system operations.