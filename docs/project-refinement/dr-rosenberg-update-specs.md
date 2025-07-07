# Dr. Aaron Rosenberg – Professional Information Update Specification

Generated on 2025-07-06

This specification reconciles authoritative biographical details for **Dr. Aaron Rosenberg, MD** (as published on the live site `www.lotusdirectcare.com/physician`) with the placeholder content currently in the new code-base (`/app/about/dr-rosenberg/page.tsx`).

---

## 1. Authoritative Details (Live Site)

| Field | Live-Site Value |
|-------|-----------------|
| Full Name | **Aaron Rosenberg, MD** |
| Current Role | Founder & Medical Director, Lotus Direct Care |
| Undergraduate | **San Francisco State University** – Bachelor’s degree (field not listed) |
| Medical School | **Autonomous University of Guadalajara (Mexico)** – *Valedictorian*, graduated with academic honours |
| Post-Grad Internship | Public hospital in Guadalajara (Mexico’s 2nd-largest city) |
| Residency | **University of California, Davis-affiliated Internal Medicine residency (California)** |
| Certifications / Training | On certification path with **Institute for Functional Medicine** |
| Years Clinical Experience | "More than a decade" (≥10 years) |
| Special Interests | Functional Medicine, Direct Primary Care, Addiction Medicine |
| Languages | English & Spanish (fluent) |

> Source: physician profile page, scraped 2025-07-06.

---

## 2. Current Content in New Site

Excerpt from `/app/about/dr-rosenberg/page.tsx`:

* Hero badges list: *"MD, Board Certified", "Functional Medicine", "Addiction Medicine", "20+ Years Experience"*
* Education card lists generic placeholders:
  * *Doctor of Medicine (MD) – **Prestigious Medical School***
  * *Residency – **Leading Medical Center***
  * *Fellowship in Integrative Medicine – **Renowned Institute***
* Board Certifications list Internal Medicine, Functional Medicine, Addiction Medicine, Age Management Medicine.
* Metadata description: *"board-certified physician and functional medicine expert with over 20 years of experience"*.

These details are either placeholders or differ from the live-site bio.

---

## 3. Required Updates

1. **Hero Section & Badges**
   * Replace "20+ Years Experience" badge → **"10+ Years Experience"** (or exact figure if confirmed).
   * Ensure badge list reflects **Spanish-speaking** if desired.

2. **Metadata (`metadata` object at top of file)**
   * Update description to:  
     `"Meet Dr. Aaron Rosenberg, valedictorian of the Autonomous University of Guadalajara medical program, UC Davis-trained internist, and functional medicine practitioner serving Mequon, WI."`

3. **Education Card (`Education & Credentials` section)**
   * Replace placeholders with:
     ```
     Doctor of Medicine (MD) – Autonomous University of Guadalajara (Valedictorian)
     Post-Graduate Internship – Public Hospital, Guadalajara, MX
     Internal Medicine Residency – UC Davis-affiliated program, CA
     ```
   * Optional: create separate **Undergraduate** bullet for San Francisco State University.

4. **Board Certifications Card**
   * Confirm official certifications (live site does **not** specify "Board Certified" yet). Keep Internal Medicine; mark Functional Medicine as *"Certification in progress – Institute for Functional Medicine"*.
   * Age Management & Addiction Medicine may remain if verifiable; otherwise flag for verification.

5. **Professional Journey Paragraphs**
   * Add narrative details regarding valedictorian status, cross-cultural experience, functional medicine training path, bilingual care, community service focus.

6. **Miscellaneous**
   * Update any references to >20 years experience.
   * Add mention of Spanish fluency where relevant.
   * Verify schema/JSON-LD doctor data and OpenGraph tags pull from updated constants.

---

## 4. Validation Checklist

- [ ] Placeholders removed; all education and training fields show concrete institutions.
- [ ] Metadata description matches authoritative bio.
- [ ] No strings "Prestigious Medical School", "Leading Medical Center", etc. remain (`grep -R "Prestigious Medical"`).
- [ ] Hero badges accurately reflect years of experience and training status.
- [ ] Page passes editorial review for accuracy.

---

_End of specification_
