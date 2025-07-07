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
  Button,
} from '@react-email/components';
import * as React from 'react';

interface LeadConfirmationEmailProps {
  name: string;
}

export const LeadConfirmationEmail = ({
  name,
}: LeadConfirmationEmailProps) => {
  const previewText = `Thank you for contacting Lotus Direct Care`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You for Contacting Lotus Direct Care</Heading>
          
          <Section style={section}>
            <Text style={greeting}>Dear {name},</Text>
            
            <Text style={text}>
              Thank you for reaching out to Lotus Direct Care. We have received your message 
              and appreciate your interest in our practice.
            </Text>
            
            <Text style={text}>
              Our team will review your inquiry and get back to you within 1-2 business days. 
              We look forward to helping you with your healthcare needs.
            </Text>
          </Section>

          <Section style={infoSection}>
            <Heading style={h2}>What to Expect Next</Heading>
            
            <Text style={text}>
              • A member of our team will contact you using your preferred contact method
            </Text>
            <Text style={text}>
              • We'll answer any questions you have about our practice
            </Text>
            <Text style={text}>
              • If needed, we can schedule a consultation or appointment
            </Text>
          </Section>

          <Section style={infoSection}>
            <Heading style={h2}>Our Practice Information</Heading>
            
            <Text style={infoText}>
              <strong>Lotus Direct Care</strong><br />
              123 Wellness Way<br />
              Raleigh, NC 27615
            </Text>
            
            <Text style={infoText}>
              <strong>Phone:</strong> <Link href="tel:9195551234" style={link}>(919) 555-1234</Link><br />
              <strong>Email:</strong> <Link href="mailto:info@lotusdirectcare.com" style={link}>info@lotusdirectcare.com</Link>
            </Text>
            
            <Text style={infoText}>
              <strong>Office Hours:</strong><br />
              Monday - Friday: 8:00 AM - 5:00 PM<br />
              Saturday: 9:00 AM - 1:00 PM<br />
              Sunday: Closed
            </Text>
          </Section>

          <Section style={ctaSection}>
            <Button
              style={button}
              href="https://lotusdirectcare.com"
            >
              Visit Our Website
            </Button>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              If you have any urgent medical concerns, please call our office directly 
              at (919) 555-1234 or seek immediate medical attention.
            </Text>
            
            <Text style={footerText}>
              This email was sent from Lotus Direct Care. If you did not submit a contact 
              form on our website, please disregard this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default LeadConfirmationEmail;

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

const infoSection = {
  padding: '0 48px',
  marginTop: '32px',
};

const ctaSection = {
  padding: '32px 48px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 48px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const greeting = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '16px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '16px',
};

const infoText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  marginBottom: '16px',
};

const link = {
  color: '#2754C5',
  textDecoration: 'underline',
};

const button = {
  backgroundColor: '#2754C5',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
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
  fontSize: '12px',
  lineHeight: '20px',
  marginBottom: '16px',
};