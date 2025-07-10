import { render } from '@react-email/render';
import sgMail from '@sendgrid/mail';
import { LeadConfirmationEmail } from '@/components/emails/LeadConfirmationEmail';
import { LeadNotificationEmail } from '@/components/emails/LeadNotificationEmail';
import { logger } from './logger';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

const isEmailConfigured = SENDGRID_API_KEY && FROM_EMAIL && NOTIFICATION_EMAIL;

if (isEmailConfigured) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  logger.info('SendGrid email service configured.');
} else {
  logger.warn('SendGrid email service not configured. Skipping all emails.');
}

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  reason_for_visit?: string;
  preferred_contact?: 'email' | 'phone';
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!isEmailConfigured || !FROM_EMAIL) {
    logger.warn(`Skipping email to ${to} due to missing configuration.`);
    return;
  }

  const msg = {
    to,
    from: {
        name: 'Lotus Direct Care',
        email: FROM_EMAIL
    },
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    logger.info(`Email sent successfully to ${to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${to}`, { error });
    // Do not re-throw the error to prevent the API route from failing
  }
}

export async function sendLeadConfirmationEmail(leadData: LeadData) {
  if (!isEmailConfigured) return;

  const { name, email } = leadData;
  const emailHtml = render(LeadConfirmationEmail({ name }));

  await sendEmail(email, 'Thank You for Your Inquiry | Lotus Direct Care', emailHtml);
}

export async function sendLeadNotificationEmail(leadData: LeadData) {
  if (!isEmailConfigured || !NOTIFICATION_EMAIL) return;

  const emailHtml = render(LeadNotificationEmail({ leadData }));

  await sendEmail(NOTIFICATION_EMAIL, `New Lead Submitted: ${leadData.name}`, emailHtml);
}