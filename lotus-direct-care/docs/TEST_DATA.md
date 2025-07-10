# Test Data for AI Features Demo

## 📝 Sample Lead Form Submissions

Copy and paste these into the contact form to test different AI response scenarios:

### 1. General Inquiry - Functional Medicine
```
Name: Sarah Johnson
Email: test1@example.com
Phone: (555) 123-4567
Message: I've been dealing with chronic fatigue for years and my regular doctor 
hasn't been able to help. I'm interested in learning about your functional 
medicine approach and whether it might help identify the root cause of my issues.
```

### 2. Membership Pricing Question
```
Name: Michael Chen
Email: test2@example.com
Phone: (555) 234-5678
Message: Hi Dr. Rosenberg, I'm looking for a new primary care doctor who takes 
a more holistic approach. Can you tell me about your membership options and 
what's included? Do you accept insurance?
```

### 3. Specific Service Inquiry - Hormone Optimization
```
Name: Jennifer Williams
Email: test3@example.com
Phone: (555) 345-6789
Message: I'm a 45-year-old woman experiencing symptoms that might be related to 
perimenopause. I'd like to know more about your hormone optimization services 
and bioidentical hormone therapy options.
```

### 4. Urgent Health Concern
```
Name: Robert Taylor
Email: test4@example.com
Phone: (555) 456-7890
Message: I've been having severe digestive issues for the past month - bloating, 
pain, and irregular bowel movements. I need to see someone soon. What's your 
availability for new patients?
```

### 5. Ketamine Therapy Interest
```
Name: Emily Davis
Email: test5@example.com
Phone: (555) 567-8901
Message: I've been researching alternative treatments for my treatment-resistant 
depression. Can you provide information about your ketamine therapy program? 
What's the process and are there any contraindications I should know about?
```

### 6. Weight Management
```
Name: David Martinez
Email: test6@example.com
Phone: (555) 678-9012
Message: I've tried every diet and nothing seems to work long-term. I'm 
interested in your functional medicine approach to weight management and 
metabolic health. Do you offer comprehensive testing?
```

### 7. Longevity Medicine
```
Name: Patricia Anderson
Email: test7@example.com
Phone: (555) 789-0123
Message: I'm 55 and want to be proactive about healthy aging. What longevity 
and anti-aging services do you offer? I'm particularly interested in NAD+ 
therapy and comprehensive health optimization.
```

### 8. Multiple Concerns
```
Name: James Wilson
Email: test8@example.com
Phone: (555) 890-1234
Message: I have several health issues - chronic pain, poor sleep, low energy, 
and brain fog. I'm frustrated with the traditional approach of treating each 
symptom separately. How does your integrated approach work?
```

## 🤖 Expected AI Response Elements

For each submission, the AI should include:

1. **Personalized Greeting** - Uses the person's name
2. **Acknowledgment** - Shows understanding of their specific concerns
3. **Relevant Information** - Provides helpful details about requested services
4. **Educational Content** - Brief explanation of functional medicine approach
5. **Next Steps** - Clear call-to-action (usually scheduling a consultation)
6. **Contact Information** - How to reach the practice
7. **Professional Tone** - Warm but professional medical communication
8. **Disclaimer** - Appropriate medical disclaimer when needed

## 📊 Blog Topic Test Scenarios

When testing blog generation, try these topics in order:

### Health Condition Topics
1. "Gut Health and Immunity"
2. "Thyroid Dysfunction"
3. "Chronic Fatigue Syndrome"
4. "Autoimmune Conditions"
5. "Hormonal Imbalances"

### Treatment Approach Topics
1. "Benefits of Functional Medicine"
2. "Personalized Medicine Approach"
3. "Root Cause Analysis"
4. "Integrative Therapies"
5. "Preventive Health Strategies"

### Lifestyle Topics
1. "Nutrition for Optimal Health"
2. "Sleep Optimization"
3. "Stress Management Techniques"
4. "Exercise and Movement"
5. "Mind-Body Connection"

## 🧪 Admin Panel Test Scenarios

### Lead Management Tests
1. **Status Updates**: Change lead status from "new" → "contacted" → "converted"
2. **Bulk Actions**: Select multiple leads and archive
3. **Search/Filter**: Filter by date range, status, or search by name
4. **Export**: Test CSV export functionality

### Email Response Tests
1. **View Details**: Click on each email to see full content
2. **Resend**: Test resending functionality
3. **Status Filter**: Filter by sent/pending/failed
4. **Date Range**: View emails from specific time periods

### Blog Management Tests
1. **Create Draft**: Generate and save as draft
2. **Edit Draft**: Modify and republish
3. **Schedule Post**: Set future publication date
4. **Delete Post**: Test deletion (with confirmation)
5. **SEO Preview**: Check meta descriptions and keywords

### Settings Configuration Tests
1. **Provider Switch**: Change from Claude to OpenAI (if configured)
2. **Temperature**: Try 0.3 (focused) vs 0.9 (creative)
3. **Token Limits**: Test with 500 vs 4000 tokens
4. **Save & Apply**: Verify settings persist after page reload

## 🔄 Automation Test Scenarios

### Cron Job Simulation
To test the automated blog generation without waiting for Monday:

1. Temporarily modify cron schedule in Vercel to run every 5 minutes:
   ```
   AI_BLOG_SCHEDULE_CRON="*/5 * * * *"
   ```

2. Monitor `/admin/ai/blog` for new posts

3. Reset to weekly schedule after testing:
   ```
   AI_BLOG_SCHEDULE_CRON="0 9 * * 1"
   ```

### Email Delay Testing
Test different delay scenarios:

1. **Immediate** (for testing): Set `AI_EMAIL_RESPONSE_DELAY_MS=5000` (5 seconds)
2. **Standard**: Set `AI_EMAIL_RESPONSE_DELAY_MS=120000` (2 minutes)
3. **Extended**: Set `AI_EMAIL_RESPONSE_DELAY_MS=300000` (5 minutes)

## 📈 Performance Benchmarks

Expected response times for testing:

| Feature | Expected Time | Max Acceptable |
|---------|--------------|----------------|
| Lead form submission | < 1 second | 3 seconds |
| AI email generation | 5-10 seconds | 30 seconds |
| Blog post generation | 30-60 seconds | 120 seconds |
| Admin dashboard load | < 2 seconds | 5 seconds |
| Blog list pagination | < 1 second | 2 seconds |

## 🚨 Edge Case Testing

### Invalid Inputs
1. **Empty form submission** - Should show validation errors
2. **Invalid email format** - Should reject before submission
3. **SQL injection attempts** - Should be sanitized
4. **XSS attempts** - Should be escaped
5. **Very long messages** - Should handle gracefully (>5000 chars)

### API Limits
1. **Rate limiting** - Rapid submissions should be throttled
2. **Token limits** - Very long blog topics should truncate
3. **Concurrent requests** - Multiple users generating blogs

### Error States
1. **No API key** - Should show clear error message
2. **Invalid API key** - Should indicate authentication failure
3. **API service down** - Should handle gracefully with retry
4. **Database connection lost** - Should show maintenance message

## ✅ Complete Test Workflow

1. **Setup** (10 minutes)
   - Configure all environment variables
   - Deploy to Vercel
   - Verify deployment successful

2. **Basic Functionality** (20 minutes)
   - Submit 3 different lead forms
   - Verify AI emails received
   - Generate 2 blog posts
   - Test admin login

3. **Advanced Features** (20 minutes)
   - Test all admin panel features
   - Try different AI settings
   - Test error scenarios
   - Verify data persistence

4. **Performance** (10 minutes)
   - Time each operation
   - Check for any timeouts
   - Monitor Vercel logs
   - Test concurrent users

5. **Documentation** (10 minutes)
   - Screenshot key features
   - Note any issues found
   - Document actual vs expected behavior
   - Create bug reports if needed