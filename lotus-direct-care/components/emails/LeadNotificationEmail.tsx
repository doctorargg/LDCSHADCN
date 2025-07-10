import React from 'react';
import { LeadData } from '@/lib/email';

interface LeadNotificationEmailProps {
  leadData: LeadData;
}

export const LeadNotificationEmail: React.FC<LeadNotificationEmailProps> = ({ leadData }) => (
  <div>
    <h1>New Lead Submitted</h1>
    <p><strong>Name:</strong> {leadData.name}</p>
    <p><strong>Email:</strong> {leadData.email}</p>
    {leadData.phone && <p><strong>Phone:</strong> {leadData.phone}</p>}
    {leadData.reason_for_visit && <p><strong>Reason for Visit:</strong> {leadData.reason_for_visit}</p>}
    {leadData.preferred_contact && <p><strong>Preferred Contact:</strong> {leadData.preferred_contact}</p>}
    {leadData.message && <p><strong>Message:</strong><br/>{leadData.message}</p>}
  </div>
);

export default LeadNotificationEmail;
