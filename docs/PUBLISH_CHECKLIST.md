# Publishing Checklist — Information You Must Provide

This file lists all required legal, contact, privacy, security and deployment details you must add before publishing.

## Company & Legal
- Company Name (registered)
- Owner / Geschäftsführer full name(s)
- Full Business Address (street, number, postal code, city)
- Trade Register: register court and registration number (e.g., HRB ...)
- VAT / USt‑ID (or confirmation none applies)
- Official contact email and phone (canonical addresses)

## Contact Form & Email Delivery
- Recipient email for contact submissions
- Email provider credentials: `RESEND_API_KEY` or SMTP settings
- Verified sending email (for SPF/DKIM)
- Email from/reply-to policy
- Decide spam protection: honeypot-only or add CAPTCHA/rate-limiting

## Privacy / GDPR
- Data protection contact (DPO) email if any
- Data retention policy (how long messages/logs are stored)
- List of third-party processors (analytics, email, backups) with links
- Analytics choice (e.g., Plausible) and consent model
- Legal bases for each processing purpose (Art. 6 GDPR mappings)

## Security & Hosting
- Production domain (e.g., `https://reinigungsservice-potsdam.de`)
- SSL certificate confirmation (HTTPS configured)
- CSP and recommended security headers (decide policy)
- Rate-limiting / anti-abuse strategy for contact endpoint
- Backup and log storage location / retention

## SEO & Content
- Per-page meta titles and descriptions
- LocalBusiness JSON-LD: full address, phone, opening hours
- Final German alt text for all marketing images
- Confirm H1s for each main page

## Content Placeholders to Fill
- `src/pages/ImpressumPage.tsx`: Geschäftsführer, address, Amtsgericht, HRB, USt‑ID
- `src/pages/DatenschutzPage.tsx`: processors, retention periods, data contact
- `public/sitemap.xml`: replace `your-domain.example` with production domain

## Deployment / Ops
- Environment variables for hosting: `RESEND_API_KEY`, `CONTACT_EMAIL`, `SITE_DOMAIN`
- SPF/DKIM setup for sending domain
- Sitemap generation approach (static vs dynamic)
- CI/CD and hosting credentials (Vercel / Netlify / other)

---
Fill the fields above and tell me when you're ready — I can then update the Impressum/Datenschutz pages and wire the contact form to send real emails.
