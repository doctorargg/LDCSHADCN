# Redirects Guide for Website Migration

Properly redirecting URLs from your old site to your new site is one of the most important steps for retaining your SEO value. A 301 redirect tells search engines that a page has permanently moved, and it passes most of the old page's authority to the new one.

## Step 1: Find All Your Old URLs

You need a complete list of every indexed page on `www.lotusdirectcare.com`. If you don't have one, you can use a free sitemap generator tool by searching online for "XML sitemap generator" and providing it your URL.

## Step 2: Map Old URLs to New URLs

Create a spreadsheet (CSV) with two columns: `source` and `destination`.

-   **`source`**: The path of the old URL (e.g., `/about-us.html`).
-   **`destination`**: The full URL or path of the corresponding page on the new site (e.g., `/about`).

**Example Mapping:**

| source              | destination         |
| ------------------- | ------------------- |
| `/contact-us.php`   | `/contact`          |
| `/services/pricing` | `/pricing`          |
| `/blog/my-post`     | `/posts/my-post`    |

*Even if the path is the same, you should include it in your map to be safe.*

## Step 3: Implement Redirects in Vercel

Vercel makes this easy. You will create a `vercel.json` file in the root of your Next.js project.

Here is a template for your `vercel.json` file. You will add a `redirects` array containing an object for each redirect you need to create.

```json
{
  "redirects": [
    {
      "source": "/old-page-1",
      "destination": "/new-page-1",
      "permanent": true
    },
    {
      "source": "/about-us.html",
      "destination": "/about",
      "permanent": true
    },
    {
      "source": "/contact-us.php",
      "destination": "/contact",
      "permanent": true
    }
  ]
}
```

-   `source`: The old path.
-   `destination`: The new path.
-   `permanent`: Set to `true` to make it a 301 redirect.

### Specification for Claude Code

If you plan to use an AI assistant to generate this file, you can provide it with the following instructions:

**Prompt:**

"Based on the provided CSV file (`redirects.csv`) with 'source' and 'destination' columns, generate a `vercel.json` file that creates a permanent 301 redirect for each mapping. The file should contain a single `redirects` array with the appropriate objects."

Attach the CSV file you created in Step 2 to the prompt.
