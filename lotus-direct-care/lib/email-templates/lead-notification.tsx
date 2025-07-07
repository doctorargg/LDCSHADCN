import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface LeadNotificationEmailProps {
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  reasonForVisit?: string;
  message: string;
  submittedAt: string;
}

export const LeadNotificationEmail = ({
  name,
  email,
  phone,
  preferredContact,
  reasonForVisit,
  message,
  submittedAt,
}: LeadNotificationEmailProps) => {
  const previewText = `New lead from ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          
          <Section style={section}>
            <Text style={text}>
              You have received a new contact form submission from your website.
            </Text>
          </Section>

          <Section style={detailsSection}>
            <Heading style={h2}>Contact Details</Heading>
            
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>
            
            <Text style={label}>Email:</Text>
            <Text style={value}>
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            
            {phone && (
              <>
                <Text style={label}>Phone:</Text>
                <Text style={value}>
                  <Link href={`tel:${phone}`} style={link}>
                    {phone}
                  </Link>
                </Text>
              </>
            )}
            
            {preferredContact && (
              <>
                <Text style={label}>Preferred Contact Method:</Text>
                <Text style={value}>{preferredContact}</Text>
              </>
            )}
            
            {reasonForVisit && (
              <>
                <Text style={label}>Reason for Visit:</Text>
                <Text style={value}>{reasonForVisit}</Text>
              </>
            )}
            
            <Text style={label}>Message:</Text>
            <Text style={messageValue}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              Submitted on: {submittedAt}
            </Text>
            <Text style={footerText}>
              This lead has been automatically saved to your database.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default LeadNotificationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const section = {
  padding: '0 48px',
};

const detailsSection = {
  padding: '0 48px',
  marginTop: '32px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 48px',
};

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
};

const label = {
  color: '#666',
  fontSize: '14px',
  fontWeight: '600',
  margin: '16px 0 4px',
};

const value = {
  color: '#333',
  fontSize: '16px',
  margin: '0 0 8px',
};

const messageValue = {
  color: '#333',
  fontSize: '16px',
  margin: '0 0 8px',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#f6f9fc',
  padding: '16px',
  borderRadius: '4px',
};

const link = {
  color: '#2754C5',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footer = {
  padding: '0 48px',
};

const footerText = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
};