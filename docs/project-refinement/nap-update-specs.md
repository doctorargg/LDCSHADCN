/# NAP & Contact Information Update Specification

Generated on 2025-07-06.

This document lists the authoritative business information found on `www.lotusdirectcare.com` (live site) and pin-points every place in the new code-base (`lotus-direct-care`) that needs to change so the new site reflects the correct data.

---

## 1. Authoritative Data (from live site)

| Field | Value |
|-------|-------|
| Business Name | **Lotus Direct Care** |
| Street Address | **1516 W Mequon Rd., STE 103, Mequon, WI 53092** |
| Phone | **(262) 242-0700** |
| Fax | **(855) 457-1293** |
| Email | (not explicitly shown – assume `info@lotusdirectcare.com` is still correct) |
| Business Hours | **Monday - Friday  9:00 AM – 5:00 PM** |

> Source: footer section of home page (`https://www.lotusdirectcare.com`), scraped 2025-07-06.

### Notes
* The live site lists **different phone and address** than those hard-coded in the new code-base.
* Business hours are displayed as a simple line (Monday-Friday), whereas the new site stores granular daily hours.

---

## 2. Current Values in New Code-base

Located in `lib/constants.ts`:

```
PHONE: "(262) 236-7129",
ADDRESS: {
  STREET: "11649 N Port Washington Rd",
  SUITE: "Suite 112",
  CITY: "Mequon",
  STATE: "WI",
  ZIP: "53092",
  FULL: "11649 N Port Washington Rd, Suite 112, Mequon, WI 53092",
},
```

---

## 3. Required Changes

1. **`lib/constants.ts`**
   * Update `CONTACT_INFO.PHONE` → `(262) 242-0700`.
   * Update `CONTACT_INFO.ADDRESS` fields:
     * `STREET` → `1516 W Mequon Rd.`
     * `SUITE` → `STE 103`
     * `FULL` → `1516 W Mequon Rd., STE 103, Mequon, WI 53092`
   * (Optional) Add `FAX` field → `(855) 457-1293`.

2. **`BUSINESS_HOURS`** (same file)
   * If granular hours remain desired, set `open: "9:00 AM", close: "5:00 PM"` for **MONDAY-FRIDAY** and `Closed` for weekends.

3. **SEO / Structured Data**
   * Verify JSON-LD or Open Graph tags (if any) pull from updated constants.
   * Regenerate sitemap if address is embedded.

4. **Content & UI**
   * Search templates/components that display phone or address (`grep -R "236-7129"` / `"Port Washington"`). Replace with new constants or dynamic reference.
   * Update hero images or graphics that embed the old address (if any).

---

## 4. Validation Checklist

- [ ] `npm run dev` displays updated phone & address across all pages (header, footer, contact, metadata).
- [ ] `npm test` passes (if tests exist).
- [ ] Rich-results test shows correct NAP.

---

_End of spec_
