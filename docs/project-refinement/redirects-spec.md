# Redirects Specification for Vercel

This document contains the necessary configuration to redirect all traffic from your old website URLs to the new, cleaner URLs on your Next.js site. This is critical for preserving SEO and ensuring a good user experience.

## Instructions

1.  Create a new file named `vercel.json` in the **root directory** of your Next.js project.
2.  Copy the entire JSON code block below and paste it into the `vercel.json` file.
3.  Deploy your project to Vercel. The redirects will be applied automatically.

---

## URL Mappings

The following table shows the mapping from the old source URLs to the new destination paths.

| Source Path | Destination Path |
| :--- | :--- |
| `/accessability-notice` | `/accessibility-notice` |
| `/privacy-practice` | `/privacy-policy` |
| `/video-reviews` | `/testimonials` |
| `/copy-of-newsletter-sign-up` | `/newsletter` |
| `/contact-us` | `/contact` |
| `/schedule-appointment` | `/contact` |
| `/physician` | `/about` |
| `/lead-collection` | `/` |
| `/ketamine1` | `/services/ketamine-therapy` |
| `/direct-primary-care` | `/services/direct-primary-care` |
| `/direct-access-to-your-doctor` | `/services/direct-primary-care` |
| `/post/:slug` | `/blog/:slug` |
| `/forum/:path*` | `/blog` |

---

## `vercel.json` Configuration

```json
{
  "redirects": [
    {
      "source": "/accessability-notice",
      "destination": "/accessibility-notice",
      "permanent": true
    },
    {
      "source": "/privacy-practice",
      "destination": "/privacy-policy",
      "permanent": true
    },
    {
      "source": "/video-reviews",
      "destination": "/testimonials",
      "permanent": true
    },
    {
      "source": "/copy-of-newsletter-sign-up",
      "destination": "/newsletter",
      "permanent": true
    },
    {
      "source": "/contact-us",
      "destination": "/contact",
      "permanent": true
    },
    {
      "source": "/schedule-appointment",
      "destination": "/contact",
      "permanent": true
    },
    {
      "source": "/physician",
      "destination": "/about",
      "permanent": true
    },
    {
      "source": "/lead-collection",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/ketamine1",
      "destination": "/services/ketamine-therapy",
      "permanent": true
    },
    {
      "source": "/direct-primary-care",
      "destination": "/services/direct-primary-care",
      "permanent": true
    },
    {
      "source": "/direct-access-to-your-doctor",
      "destination": "/services/direct-primary-care",
      "permanent": true
    },
    {
      "source": "/post/:slug*",
      "destination": "/blog/:slug*",
      "permanent": true
    },
    {
      "source": "/forum/:path*",
      "destination": "/blog",
      "permanent": true
    }
  ]
}
```
