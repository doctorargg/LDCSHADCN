# Lotus Direct Care SEO Enhancement Specification

_Last updated: 2025-07-07_

## 1. Purpose
This specification translates the findings in `alaysis.md` and supplementary research (Firecrawl search + Perplexity queries) into a concrete, engineering-ready scope of work that **does not modify the core Next.js logic** but adds the required SEO assets, configuration, and content.

## 2. Scope
1. **Generate XML sitemap + robots.txt** via `next-sitemap` package.
2. **Canonical & dynamic metadata** at the page level using `generateMetadata`.
3. **Image optimisation** (hero & social previews) with Next 13 `<Image>` improvements and OG-image automation.
4. **Structured data** (`Article`, `FAQPage`, `Service`, `BreadcrumbList`).
5. **Performance tuning** for LCP & CLS (image sizing, font loading).
6. **Local SEO landing pages & schema (`MedicalClinic`)**.
7. **Backlink & citation campaign** – marketing deliverable, documented here for completeness.

## 3. Functional Requirements
| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| 1 | Add `next-sitemap` & expose `/sitemap.xml`, `/robots.txt` | ⬆ | Sitemap accessible in browser & submitted to GSC; robots.txt lists sitemap and allows all agents. |
| 2 | `<link rel="canonical">` per route | ⬆ | Lighthouse shows canonical present & unique for every page. |
| 3 | Unique `<title>` & `description` per page | ⬆ | Meta tags verified in HTML source; duplicates < 5%. |
| 4 | `og:image` & `twitter:image` per page | ⬆ | Social share validator shows rich cards. |
| 5 | Optimised hero images (WebP/AVIF, correct dimensions) | ⬆ | LCP < 2.5 s on 3G Lighthouse run. |
| 6 | Add `Article`, `FAQPage`, `Service`, `BreadcrumbList` schemas | ⬆ | Rich Results Test passes for each type. |
| 7 | Local SEO landing pages for Mequon & surrounding areas | ⬆ | Pages render with `LocalBusiness` schema & appear in sitemap. |
| 8 | Cache-control & compression headers (Next.js config / CDN) | ⬆ | PSI shows TTFB < 200 ms from Edge region. |
| 9 | Internal linking strategy implemented | ⬆ | Each service blog post links to ≥2 related pages. |

## 4. Non-Functional Requirements
* No breaking changes to existing React Server Components.
* Build time increase < 10%.
* Maintain current Lighthouse accessibility score (> 95).

## 5. Research Inputs
1. **Firecrawl search** – DPC competitor feature matrix & keyword trends (see appendix A).
2. **Perplexity** – best-practice prompts for canonical tags, structured data, and OG automation.

## 6. Deliverables & Timeline
| Week | Deliverable | Owner |
|------|-------------|-------|
| 1 | Sitemap + robots.txt; canonical & metadata framework | Dev |
| 2 | Hero image optimisation; OG-image automation | Dev |
| 3 | Structured data; internal linking roll-out | Dev / SEO |
| 3-4 | Local landing pages content draft | Content |
| 4 | Backlink & citation outreach kick-off | Marketing |

## 7. Risks & Mitigations
* **Image generation latency** – cache OG images in Vercel Edge.
* **Schema validation errors** – integrate unit test with `jest` + `schema-dts`.

## 8. Approval
| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner |  |  |  |
| Tech Lead |  |  |  |
| SEO Strategist |  |  |  |

---

### Appendix A – Firecrawl Research Highlights
* DPC Frontier map reveals >25 local competitors within 50 mi; keyword gap on “functional medicine Wisconsin”.
* HSAforAmerica state guides underline demand for transparent pricing.
* Common schema usage among top-ranking clinics: `MedicalOrganization`, `Physician`, `Service`.

