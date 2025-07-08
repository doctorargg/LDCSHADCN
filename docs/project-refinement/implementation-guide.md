# Website Migration & Implementation Guide: LotusDirectCare.com

This guide outlines the steps to successfully migrate your existing website at `www.lotusdirectcare.com` to your new Next.js application hosted on Vercel.

**New Site Preview URL:** `https://ldcshadcn-git-main-docrosenberg-4134s-projects.vercel.app`

---

## Phase 1: Pre-Launch Checklist

Complete these steps *before* pointing your domain to the new site. This is the most critical phase to ensure a smooth transition.

### 1. Backend & Data Capture Testing

- **Objective:** Verify that all forms and data submission features on the new site are working correctly.
- **Action:**
    - [ ] Manually submit test data through every form (e.g., contact forms, appointment requests).
    - [ ] Confirm that the submitted data is received and stored in the correct backend or service (e.g., email inbox, database, CRM).
    - [ ] Check for and resolve any server errors (view Vercel function logs).

### 2. Analytics & Tracking Implementation

- **Objective:** Ensure that you can track visitor behavior and marketing campaign performance from day one.
- **Action:**
    - [ ] **Google Analytics 4 (GA4):**
        - Create a new GA4 property for `www.lotusdirectcare.com` if you don't have one.
        - Add the GA4 tracking script to your Next.js application. A common way is using `next/script` in your `_app.js` or a root layout file.
    - [ ] **Google Search Console:**
        - Verify ownership of `www.lotusdirectcare.com` in Google Search Console.
        - Submit the sitemap for your *new* site (e.g., `www.lotusdirectcare.com/sitemap.xml`) once it's live.
    - [ ] **Facebook Pixel (Meta Pixel):**
        - Get your Pixel ID from your Facebook Events Manager.
        - Integrate the Pixel into your Next.js app, similar to the GA4 script.
    - [ ] **Google Ads Tracking:**
        - If you run Google Ads, ensure your conversion tracking tags are set up and added to the new site.

### 3. SEO & Redirects

- **Objective:** Preserve your existing search engine rankings by telling search engines where your old pages have moved.
- **Action:**
    - [ ] **URL Mapping:** Create a comprehensive list of all URLs on your current site and map them to their new equivalents. See the `redirects-guide.md` file for detailed instructions.
    - [ ] **Implement Redirects:** Configure 301 (permanent) redirects in your Vercel project settings (`vercel.json`). This is crucial.

### 4. Final Content & Functionality Review

- **Objective:** Perform a final quality assurance check on the new site.
- **Action:**
    - [ ] **Proofread:** Read through all content for typos and grammatical errors.
    - [ ] **Check Links:** Click every internal and external link to ensure they work.
    - [ ] **Responsive Design:** Test the site on various devices (desktop, tablet, mobile) to confirm it looks and functions correctly.
    - [ ] **Favicon:** Ensure your `favicon.ico` is present and displays correctly.

---

## Phase 2: Launch Day Plan

This should be done during a low-traffic period if possible.

- **Objective:** Point your custom domain to the new Vercel-hosted site.
- **Action:**
    - [ ] **Add Domain to Vercel:** In your Vercel project dashboard, go to `Settings` -> `Domains` and add `lotusdirectcare.com` and `www.lotusdirectcare.com`.
    - [ ] **Update DNS Records:** Vercel will provide you with the DNS records (usually an `A` record for the root domain and a `CNAME` for the `www` subdomain) to update in your domain registrar's control panel (e.g., GoDaddy, Namecheap).
    - [ ] **Wait for Propagation:** DNS changes can take anywhere from a few minutes to 48 hours to fully propagate worldwide. You can use a tool like [DNSChecker.org](https://dnschecker.org/) to monitor the progress.

---

## Phase 3: Post-Launch Checklist

- **Objective:** Verify that the migration was successful and monitor for any issues.
- **Action:**
    - [ ] **Verify Redirects:** Once the DNS has propagated, test several of your most important old URLs to ensure they redirect correctly to the new pages.
    - [ ] **Check Analytics:** Confirm that Google Analytics and other tracking tools are receiving live data from the new site.
    - [ ] **Monitor Search Console:** Keep an eye on Google Search Console for any new crawl errors or warnings.
    - [ ] **Submit Sitemap:** If you haven't already, submit your new sitemap URL to Google Search Console.
    - [ ] **Announce:** Inform your audience about the new and improved website through your social media channels or newsletter.
