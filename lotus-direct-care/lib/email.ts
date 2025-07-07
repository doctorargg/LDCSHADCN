import { Resend } from 'resend';
import { LeadNotificationEmail } from './email-templates/lead-notification';
import { LeadConfirmationEmail } from './email-templates/lead-confirmation';

// Initialize Resend client conditionally
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface EmailLeadData {
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  reasonForVisit?: string;
  message: string;
}

export async function sendLeadNotificationEmail(leadData: EmailLeadData) {
  try {
    if (!resend) {
      console.warn('Email service not configured. Skipping notification email.');
      return { success: false, message: 'Email service not configured' };
    }

    if (!process.env.NOTIFICATION_EMAIL) {
      throw new Error('NOTIFICATION_EMAIL environment variable is not set');
    }

    const { data, error } = await resend.emails.send({
      from: 'Lotus Direct Care <noreply@lotusdirectcare.com>',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Lead: ${leadData.name}`,
      react: LeadNotificationEmail({
        ...leadData,
        submittedAt: new Date().toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'America/New_York',
        }),
      }),
    });

    if (error) {
      console.error('Error sending lead notification email:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send lead notification email:', error);
    throw error;
  }
}

export async function sendLeadConfirmationEmail(email: string, name: string) {
  try {
    if (!resend) {
      console.warn('Email service not configured. Skipping confirmation email.');
      return { success: false, message: 'Email service not configured' };
    }

    const { data, error } = await resend.emails.send({
      from: 'Lotus Direct Care <noreply@lotusdirectcare.com>',
      to: email,
      subject: 'Thank you for contacting Lotus Direct Care',
      react: LeadConfirmationEmail({ name }),
    });

    if (error) {
      console.error('Error sending lead confirmation email:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send lead confirmation email:', error);
    throw error;
  }
}

export async function sendEmails(leadData: EmailLeadData) {
  const results = {
    notification: { success: false, error: null as any },
    confirmation: { success: false, error: null as any },
  };

  if (!resend) {
    console.warn('Email service not configured. Skipping all emails.');
    return results;
  }

  // Send notification email
  try {
    await sendLeadNotificationEmail(leadData);
    results.notification.success = true;
  } catch (error) {
    results.notification.error = error;
  }

  // Send confirmation email
  try {
    await sendLeadConfirmationEmail(leadData.email, leadData.name);
    results.confirmation.success = true;
  } catch (error) {
    results.confirmation.error = error;
  }

  return results;
}