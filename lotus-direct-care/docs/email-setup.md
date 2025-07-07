# Email Integration Setup Guide

This guide explains how to set up the email integration for the contact form using Resend.

## Overview

The contact form uses Resend to send two types of emails:
1. **Lead Notification Email** - Sent to the practice admin when a new lead submits the form
2. **Lead Confirmation Email** - Sent to the lead confirming their submission was received

## Setup Steps

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com) and sign up for an account
2. Verify your email address

### 2. Add and Verify Your Domain

1. In the Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `lotusdirectcare.com`)
4. Add the DNS records shown by Resend to your domain's DNS settings
5. Wait for domain verification (usually takes a few minutes)

### 3. Generate an API Key

1. Go to "API Keys" in the Resend dashboard
2. Click "Create API Key"
3. Give it a name (e.g., "Production" or "Development")
4. Copy the API key (it starts with `re_`)

### 4. Configure Environment Variables

Add these to your `.env.local` file:

```env
# Resend API Key
RESEND_API_KEY=re_your_api_key_here

# Email address to receive lead notifications
NOTIFICATION_EMAIL=admin@lotusdirectcare.com
```

### 5. Update Email Templates

The email templates are located in `/lib/email-templates/`:

- `lead-notification.tsx` - Customize the notification email sent to admins
- `lead-confirmation.tsx` - Customize the confirmation email sent to leads

To update the "from" email address, edit `/lib/email.ts`:

```typescript
from: 'Lotus Direct Care <noreply@lotusdirectcare.com>'
```

### 6. Database Migration

Run the migration to add the new contact fields to your database:

```sql
-- Run this in your Supabase SQL editor
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS preferred_contact TEXT CHECK (preferred_contact IN ('email', 'phone', 'either')),
ADD COLUMN IF NOT EXISTS reason_for_visit TEXT;

ALTER TABLE leads 
ALTER COLUMN message TYPE TEXT;
```

## Testing

1. Fill out the contact form on `/contact`
2. Check that:
   - The lead is saved in the database
   - You receive a notification email at the `NOTIFICATION_EMAIL` address
   - The lead receives a confirmation email
   - Check the application logs for any email errors

## Email Features

### Lead Notification Email
- Contains all form data (name, email, phone, preferred contact method, reason for visit, message)
- Formatted with proper styling using React Email components
- Includes clickable email and phone links
- Shows submission timestamp

### Lead Confirmation Email
- Professional thank you message
- Sets expectations (1-2 business day response time)
- Includes practice information (address, phone, hours)
- Call-to-action button to visit website

## Troubleshooting

### Emails Not Sending
1. Check that `RESEND_API_KEY` is set correctly
2. Verify your domain is verified in Resend
3. Check application logs for error messages
4. Ensure `NOTIFICATION_EMAIL` is set

### Domain Verification Issues
1. Make sure all DNS records are added correctly
2. Wait 10-15 minutes for DNS propagation
3. Use Resend's domain verification checker

### Development Testing
For local development, you can:
1. Use Resend's test mode (emails won't actually send)
2. Use a personal email for `NOTIFICATION_EMAIL`
3. Check Resend dashboard for email logs

## Production Checklist

- [ ] Domain verified in Resend
- [ ] Production API key generated and set
- [ ] `NOTIFICATION_EMAIL` set to correct admin email
- [ ] Database migration run
- [ ] Email templates customized with practice info
- [ ] Test emails working correctly
- [ ] Error handling tested