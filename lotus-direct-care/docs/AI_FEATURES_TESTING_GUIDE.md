# AI Features Testing Guide

## 🚀 Quick Start Checklist

### 1. Environment Setup
- [ ] Set `ANTHROPIC_API_KEY` in Vercel environment variables
- [ ] Set `ADMIN_API_KEY` to a secure random string (e.g., 32+ characters)
- [ ] Ensure Supabase variables are configured:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Optional: Set `OPENAI_API_KEY` or `GOOGLE_AI_API_KEY` for alternative AI providers

### 2. Admin Dashboard Testing

#### Access Admin Panel
- [ ] Navigate to `https://your-site.vercel.app/admin`
- [ ] Enter your `ADMIN_API_KEY` on the login page
- [ ] Verify successful login and dashboard access

#### Dashboard Features
- [ ] Check main dashboard shows:
  - [ ] Total leads count
  - [ ] AI emails sent count
  - [ ] Blog posts published count
  - [ ] Recent activity feed

### 3. AI Email Response Testing

#### Submit Test Lead
- [ ] Go to any page with a contact form (e.g., `/contact`)
- [ ] Fill out the form with test data:
  ```
  Name: Test User
  Email: your-email@example.com
  Phone: 555-0123
  Message: I'm interested in learning about functional medicine
  ```
- [ ] Submit the form

#### Verify AI Response
- [ ] Wait 2 minutes for AI email to be sent
- [ ] Check your email for the AI-generated response
- [ ] Go to `/admin/ai/emails` to see:
  - [ ] Email appears in the list
  - [ ] Status shows as "sent"
  - [ ] Click "View" to see full email content
  - [ ] Test "Resend" functionality

### 4. AI Blog Generation Testing

#### Manual Blog Generation
- [ ] Navigate to `/admin/ai/blog`
- [ ] Click "Generate New Post"
- [ ] Select a topic from the dropdown
- [ ] Click "Generate"
- [ ] Wait for AI to generate content (30-60 seconds)
- [ ] Review generated content:
  - [ ] Title is relevant
  - [ ] Content is medical/health focused
  - [ ] SEO metadata is populated
  - [ ] Tags are appropriate
- [ ] Test "Save as Draft" functionality
- [ ] Test "Publish" functionality
- [ ] Verify published post appears at `/resources/blog/[slug]`

#### Edit Existing Blog Post
- [ ] From `/admin/ai/blog`, click "Edit" on any post
- [ ] Modify content
- [ ] Save changes
- [ ] Verify changes appear on the public blog

### 5. AI Settings Configuration

#### Test Provider Switching
- [ ] Go to `/admin/settings`
- [ ] Try switching between AI providers (if multiple API keys configured)
- [ ] Adjust temperature setting (0.0 - 1.0)
- [ ] Modify max tokens
- [ ] Save settings
- [ ] Generate a new blog post to verify settings are applied

### 6. API Endpoint Testing

#### Test Blog Generation API
```bash
curl -X GET https://your-site.vercel.app/api/ai-blog/test \
  -H "x-api-key: YOUR_ADMIN_API_KEY"
```

#### Test Manual Blog Generation
```bash
curl -X POST https://your-site.vercel.app/api/ai-blog/generate \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_ADMIN_API_KEY" \
  -d '{
    "topic": "Gut Health and Immunity",
    "publish": false
  }'
```

### 7. Automated Features Testing

#### Cron Job Verification
- [ ] Check Vercel dashboard for cron job logs
- [ ] Verify cron is scheduled for "Every Monday at 9am"
- [ ] Check `/admin/ai/blog` on Tuesday to see if automated post was created

### 8. Error Handling Testing

#### Test Missing API Key
- [ ] Temporarily remove `ANTHROPIC_API_KEY` from environment
- [ ] Try to generate a blog post
- [ ] Verify graceful error handling
- [ ] Restore API key

#### Test Invalid Lead Data
- [ ] Submit a form with invalid email
- [ ] Verify system handles gracefully
- [ ] Check admin panel for error logs

## 🐛 Troubleshooting

### Common Issues

1. **"Unauthorized" error on admin pages**
   - Verify `ADMIN_API_KEY` is set in environment variables
   - Clear browser cookies and try logging in again

2. **AI emails not sending**
   - Check Vercel logs for errors
   - Verify `ANTHROPIC_API_KEY` is valid
   - Check `/admin/ai/emails` for failed status

3. **Blog generation fails**
   - Ensure AI provider API key is valid
   - Check if you've exceeded API rate limits
   - Verify database connection is working

4. **Cron job not running**
   - Check Vercel dashboard → Functions → Cron Jobs
   - Verify `vercel.json` is properly configured
   - Check function logs for errors

## 📊 Performance Benchmarks

- Email generation: 5-10 seconds
- Blog post generation: 30-60 seconds
- Dashboard load time: <2 seconds
- Lead form submission: <1 second

## 🔒 Security Checklist

- [ ] `ADMIN_API_KEY` is at least 32 characters
- [ ] API keys are only set in Vercel environment (not in code)
- [ ] Admin routes return 401 without valid API key
- [ ] No sensitive data in browser console logs
- [ ] CORS properly configured for API routes

## 📝 Test Data Examples

### Sample Lead Messages for Testing
1. "I'm interested in functional medicine consultations"
2. "What are your membership prices?"
3. "Do you accept insurance?"
4. "I need help with chronic fatigue"
5. "Tell me about hormone optimization"

### Expected AI Response Patterns
- Personalized greeting with the user's name
- Acknowledgment of their specific inquiry
- Relevant information about services
- Clear call-to-action (schedule consultation)
- Professional medical disclaimer

## ✅ Sign-off Checklist

Before considering the AI features fully tested:
- [ ] All admin pages load without errors
- [ ] AI email responses are sending successfully
- [ ] Blog generation works for all topics
- [ ] Settings changes persist and take effect
- [ ] Error states are handled gracefully
- [ ] Performance is acceptable (<60s for blog generation)
- [ ] Security measures are in place
- [ ] Automated features are scheduled correctly