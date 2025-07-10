import React from 'react';
import { EmailLeadData as LeadData } from '@/lib/email';

interface LeadNotificationEmailProps {
  leadData: LeadData;
}

export const LeadNotificationEmail: React.FC<LeadNotificationEmailProps> = ({ leadData }) => (
  <div>
    <h1>New Lead Submitted</h1>
    <p><strong>Name:</strong> {leadData.name}</p>
    <p><strong>Email:</strong> {leadData.email}</p>
    {leadData.phone && <p><strong>Phone:</strong> {leadData.phone}</p>}
    {leadData.reasonForVisit && <p><strong>Reason for Visit:</strong> {leadData.reasonForVisit}</p>}
    {leadData.preferredContact && <p><strong>Preferred Contact:</strong> {leadData.preferredContact}</p>}
    {leadData.message && <p><strong>Message:</strong><br/>{leadData.message}</p>}
  </div>
);

export default LeadNotificationEmail;
