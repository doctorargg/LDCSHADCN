import {
  Body,
  Button,
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

interface BlogNotificationEmailProps {
  recipientName?: string;
  blogTitle: string;
  blogExcerpt: string;
  blogSlug: string;
  blogCategory: string;
  blogContent?: string; // First few paragraphs for preview
  approvalToken?: string;
  isApprovalEmail?: boolean;
}

// Define email styles for the formatContentForEmail function
const emailH1 = 'color: #333; font-size: 24px; font-weight: bold; margin: 16px 0 8px; padding: 0;';
const emailH2 = 'color: #333; font-size: 20px; font-weight: bold; margin: 16px 0 8px; padding: 0;';
const emailH3 = 'color: #333; font-size: 18px; font-weight: bold; margin: 16px 0 8px; padding: 0;';
const emailP = 'color: #333; font-size: 16px; line-height: 26px; margin: 16px 0;';
const emailUl = 'color: #333; font-size: 16px; line-height: 26px; margin: 16px 0; padding-left: 20px;';
const emailLi = 'margin: 8px 0;';

export const BlogNotificationEmail = ({
  recipientName = 'there',
  blogTitle,
  blogExcerpt,
  blogSlug,
  blogCategory,
  blogContent,
  approvalToken,
  isApprovalEmail = false,
}: BlogNotificationEmailProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lotusdirectcare.com';
  const blogUrl = `${baseUrl}/resources/blog/${blogSlug}`;
  const approveUrl = approvalToken ? `${baseUrl}/api/admin/blog/approve?token=${approvalToken}&action=approve` : '';
  const rejectUrl = approvalToken ? `${baseUrl}/api/admin/blog/approve?token=${approvalToken}&action=reject` : '';

  // Helper function to convert basic markdown to HTML for email
  const formatContentForEmail = (content: string) => {
    if (!content) return '';
    
    // Take first 500 characters for preview
    const preview = content.substring(0, 500);
    
    // Basic markdown to HTML conversion for emails
    return preview
      .split('\n\n')
      .map(paragraph => {
        // Convert headers
        if (paragraph.startsWith('### ')) {
          return `<h3 style="${emailH3}">${paragraph.replace('### ', '')}</h3>`;
        }
        if (paragraph.startsWith('## ')) {
          return `<h2 style="${emailH2}">${paragraph.replace('## ', '')}</h2>`;
        }
        if (paragraph.startsWith('# ')) {
          return `<h1 style="${emailH1}">${paragraph.replace('# ', '')}</h1>`;
        }
        
        // Convert bold and italic
        let formatted = paragraph
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>');
        
        // Convert lists
        if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
          const items = paragraph.split('\n').map(item => 
            `<li style="${emailLi}">${item.replace(/^[-*]\s/, '')}</li>`
          ).join('');
          return `<ul style="${emailUl}">${items}</ul>`;
        }
        
        return `<p style="${emailP}">${formatted}</p>`;
      })
      .join('');
  };

  return (
    <Html>
      <Head />
      <Preview>
        {isApprovalEmail 
          ? `New blog post ready for approval: ${blogTitle}`
          : `New blog post from Dr. Rosenberg: ${blogTitle}`
        }
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {isApprovalEmail ? 'New Blog Post Awaiting Approval' : 'New Blog Post Published'}
          </Heading>
          
          <Text style={text}>
            Hi {recipientName},
          </Text>

          {isApprovalEmail ? (
            <>
              <Text style={text}>
                A new blog post has been generated and is ready for your review:
              </Text>

              <Section style={blogSection}>
                <Heading as="h2" style={h2}>
                  {blogTitle}
                </Heading>
                <Text style={categoryBadge}>
                  {blogCategory}
                </Text>
                <Text style={excerpt}>
                  {blogExcerpt}
                </Text>
              </Section>

              <Section style={buttonContainer}>
                <Button
                  style={{ ...button, ...approveButton }}
                  href={approveUrl}
                >
                  Approve & Publish
                </Button>
                <Button
                  style={{ ...button, ...rejectButton }}
                  href={rejectUrl}
                >
                  Reject
                </Button>
              </Section>

              <Text style={text}>
                Or you can review the full post in the admin dashboard:
              </Text>
              <Link href={`${baseUrl}/admin/ai/blog`} style={link}>
                View in Admin Dashboard
              </Link>
            </>
          ) : (
            <>
              <Text style={text}>
                Dr. Rosenberg has published a new blog post that might interest you:
              </Text>

              <Section style={blogSection}>
                <Heading as="h2" style={h2}>
                  {blogTitle}
                </Heading>
                <Text style={categoryBadge}>
                  {blogCategory}
                </Text>
                <Text style={excerpt}>
                  {blogExcerpt}
                </Text>
              </Section>

              <Button
                style={button}
                href={blogUrl}
              >
                Read Full Article
              </Button>

              <Hr style={hr} />

              <Text style={footer}>
                You're receiving this email because you subscribed to updates from Lotus Direct Care.
                If you no longer wish to receive these emails, you can{' '}
                <Link href={`${baseUrl}/unsubscribe`} style={link}>
                  unsubscribe here
                </Link>.
              </Text>
            </>
          )}

          <Text style={footer}>
            © {new Date().getFullYear()} Lotus Direct Care. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BlogNotificationEmail;

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

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 10px',
  padding: '0',
};

const h3 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '16px 0 8px',
  padding: '0',
};

const previewSection = {
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #e5e5e5',
};

const fadeText = {
  color: '#999',
  fontSize: '16px',
  textAlign: 'center' as const,
  margin: '8px 0 0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const blogSection = {
  backgroundColor: '#f6f9fc',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const categoryBadge = {
  backgroundColor: '#e5f3ff',
  color: '#0066cc',
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '4px 12px',
  borderRadius: '16px',
  display: 'inline-block',
  margin: '0 0 16px',
};

const excerpt = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
};

const button = {
  backgroundColor: '#4B7C4B',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 20px',
  margin: '16px 0',
};

const buttonContainer = {
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  margin: '24px 0',
};

const approveButton = {
  backgroundColor: '#22c55e',
};

const rejectButton = {
  backgroundColor: '#ef4444',
};

const link = {
  color: '#4B7C4B',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#666',
  fontSize: '12px',
  lineHeight: '20px',
  textAlign: 'center' as const,
  margin: '16px 0',
};