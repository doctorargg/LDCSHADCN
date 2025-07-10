import React from 'react';

interface LeadConfirmationEmailProps {
  name: string;
}

export const LeadConfirmationEmail: React.FC<LeadConfirmationEmailProps> = ({ name }) => (
  <div>
    <h1>Thank You, {name}!</h1>
    <p>We have received your inquiry and will get back to you shortly.</p>
    <p>Sincerely,<br/>The Lotus Direct Care Team</p>
  </div>
);

export default LeadConfirmationEmail;
