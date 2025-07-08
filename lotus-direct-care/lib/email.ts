import sgMail from '@sendgrid/mail';
import { render } from '@react-email/render';
import { LeadNotificationEmail } from './email-templates/lead-notification';
import { LeadConfirmationEmail } from './email-templates/lead-confirmation';
import { logger } from './logger';

// Set SendGrid API Key from environment variables
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  // Log a warning if the API key is missing. The email functions will not run.
  logger.warn('SENDGRID_API_KEY is not set. Email functionality will be disabled.');
}

export interface EmailLeadData {
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  reasonForVisit?: string;
  message: string;
}

// Check if the essential SendGrid environment variables are configured
const isEmailConfigured = process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL;

export async function sendLeadNotificationEmail(leadData: EmailLeadData) {
  if (!isEmailConfigured) {
    logger.warn('Email service not configured. Skipping notification email.');
    return { success: false, message: 'Email service not configured' };
  }

  if (!process.env.NOTIFICATION_EMAIL) {
    logger.warn('NOTIFICATION_EMAIL environment variable is not set. Skipping notification email.');
    return { success: false, message: 'NOTIFICATION_EMAIL not configured' };
  }

  const emailHtml = render(LeadNotificationEmail({
    ...leadData,
    submittedAt: new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'America/New_York',
    }),
  }));

  const msg = {
    to: process.env.NOTIFICATION_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL!, // Use the verified sender email from SendGrid
    subject: `New Lead: ${leadData.name}`,
    html: emailHtml,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    logger.error('Failed to send lead notification email via SendGrid', { error });
    throw error;
  }
}

export async function sendLeadConfirmationEmail(email: string, name: string) {
  if (!isEmailConfigured) {
    logger.warn('Email service not configured. Skipping confirmation email.');
    return { success: false, message: 'Email service not configured' };
  }

  const emailHtml = render(LeadConfirmationEmail({ name }));

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL!, // Use the verified sender email from SendGrid
    subject: 'Thank you for contacting Lotus Direct Care',
    html: emailHtml,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    logger.error('Failed to send lead confirmation email via SendGrid', { error });
    throw error;
  }
}

export async function sendEmails(leadData: EmailLeadData) {
  const results = {
    notification: { success: false, error: null as any },
    confirmation: { success: false, error: null as any },
  };

  if (!isEmailConfigured) {
    logger.warn('Email service not configured. Skipping all emails.');
    return results;
  }

  // Attempt to send the internal notification email
  try {
    await sendLeadNotificationEmail(leadData);
    results.notification.success = true;
  } catch (error) {
    logger.error('Error in sendLeadNotificationEmail (SendGrid)', { error });
    results.notification.error = error;
  }

  // Attempt to send the confirmation email to the user
  try {
    await sendLeadConfirmationEmail(leadData.email, leadData.name);
    results.confirmation.success = true;
  } catch (error) {
    logger.error('Error in sendLeadConfirmationEmail (SendGrid)', { error });
    results.confirmation.error = error;
  }

  // If both email sends failed, the API route will catch this and can log it
  if (!results.notification.success && !results.confirmation.success) {
    const errorDetails = {
      notification: results.notification.error,
      confirmation: results.confirmation.error,
      message: 'Both SendGrid email sends failed'
    };
    throw new Error(JSON.stringify(errorDetails));
  }

  return results;
}