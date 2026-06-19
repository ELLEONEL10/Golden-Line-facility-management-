# AGENTS.md — GlamPotsdam Website Build Instructions

> **This file is your single source of truth.**
> Read it fully before writing any code. Follow every rule in order.
> You are vibe-coding this website — that means: move fast, stay creative, but never break the rules below.

---

## 🧠 Who You Are

You are a senior full-stack engineer building the **GlamPotsdam Gebäudereinigung** website — a professional cleaning company based in Potsdam, Germany. Your job is to ship a fast, beautiful, conversion-optimised website that makes visitors call or fill out a form.

**Live reference:** https://reinigungsservice-potsdam.de/
**Your stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · React Hook Form · Zod · Resend · Vercel

---

## 🎨 Brand Identity (Never Deviate)

| Token | Value |
|---|---|
| Primary Dark Blue | `#1A3A5C` |
| Mid Blue | `#2E6DA4` |
| Accent Gold | `#F0A500` |
| Background | `#FFFFFF` |
| Surface | `#F5F5F5` |
| Text Body | `#333333` |
| Font | Self-hosted via `next/font/google` — use **Sora** (headings) + **Inter** (body) |
| Logo | `/public/logo.png` — always link back to `/` |
| Tagline | *Zuverlässig. Vielseitig. Regional.* |

---

## 📁 Project Structure — Build It Exactly Like This

```
src/
  app/
    layout.tsx                  ← Root layout: Navbar + Footer + default metadata
    page.tsx                    ← Homepage
    leistungen/page.tsx         ← All services overview
    bueroreinigung-potsdam/page.tsx
    glasreinigung-potsdam/page.tsx
    industriereinigung-potsdam/page.tsx
    privathaushalt-reinigung/page.tsx
    kontakt/page.tsx
    impressum/page.tsx
    datenschutz/page.tsx
    api/
      contact/route.ts          ← Email handler (POST)
  components/
    atoms/
      Button.tsx
      Icon.tsx
      Badge.tsx
      Input.tsx
      Textarea.tsx
      Select.tsx
      Spinner.tsx
    molecules/
      ServiceCard.tsx
      NavItem.tsx
      FormField.tsx
      FAQItem.tsx
      ContactInfoRow.tsx
    organisms/
      Navbar.tsx
      HeroSection.tsx
      ServicesGrid.tsx
      AboutSection.tsx
      ContactFormSection.tsx
      FAQSection.tsx
      Footer.tsx
  lib/
    hooks/
      useContactForm.ts
    adapters/
      email.adapter.ts          ← EmailService interface + Resend implementation
    validators/
      contact.schema.ts         ← Zod schema
  data/
    services.data.ts
    faq.data.ts
  types/
    index.ts
  public/
    logo.png
    logo.svg
```

---

## 🧱 SOLID Rules — Enforce These Always

### S — Single Responsibility
- Every file does **one thing**. If you need "and" to describe it, split it.
- `ServiceCard.tsx` → renders one tile. No fetching, no routing.
- `useContactForm.ts` → form state + validation + submission only. No JSX.
- `services.data.ts` → raw data array only. No UI logic.

### O — Open/Closed
- Adding a new service = **add one object** to `services.data.ts`. Zero component changes.
- Button variants via a `variant` prop — never duplicate the component.
- New page sections wrap in `<Section>` layout — never edit the parent layout file.

### L — Liskov Substitution
- Every component that accepts a `ServiceItem` prop works with **any** valid `ServiceItem`.
- Use this interface everywhere — never use `any`:

```ts
// src/types/index.ts
export interface ServiceItem {
  id: string;
  icon: string;           // emoji
  title: string;
  description: string;
  category: 'commercial' | 'residential' | 'specialist';
  slug?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  honeypot?: string;      // always empty for real users
  gdprConsent: boolean;
}
```

### I — Interface Segregation
- `ContactFormProps` does **not** include SEO metadata.
- `NavItem` only receives `href`, `label`, optional `isActive`.
- Never pass the full services array to a component that only renders one card.

### D — Dependency Inversion
- The API route depends on the `EmailService` interface — never import Resend directly in a component.
- The `ServicesGrid` depends on `ServiceItem[]` — never hardcode service names in JSX.

```ts
// src/lib/adapters/email.adapter.ts
export interface EmailService {
  send(payload: { to: string; subject: string; text: string }): Promise<void>;
}
```

---

## 🗂️ Services Data — All 11 Services

```ts
// src/data/services.data.ts
export const ALL_SERVICES: ServiceItem[] = [
  { id: 'gebaeudereinigung',     icon: '🏢', title: 'Gebäudereinigung',
    description: 'Regelmäßige Unterhaltsreinigung für Wohn- & Gewerbeobjekte – vom Keller bis zum Dachgeschoss.',
    category: 'commercial' },

  { id: 'bueroreinigung',        icon: '💼', title: 'Büroreinigung & Praxenreinigung',
    description: 'Saubere Arbeits- und Behandlungsräume für mehr Hygiene und einen professionellen Eindruck.',
    category: 'commercial', slug: 'bueroreinigung-potsdam' },

  { id: 'glasreinigung',         icon: '🪟', title: 'Glas- und Fensterreinigung',
    description: 'Streifenfreier Durchblick bei Fenstern, Glasfassaden und Glastrennwänden – innen & außen.',
    category: 'specialist', slug: 'glasreinigung-potsdam' },

  { id: 'privathaushalt',        icon: '🏠', title: 'Privathaushalt-Reinigung',
    description: 'Flexible Reinigungsangebote für Wohnungen und Einfamilienhäuser – zuverlässig & diskret.',
    category: 'residential', slug: 'privathaushalt-reinigung' },

  { id: 'industriereinigung',    icon: '🧱', title: 'Industriereinigung & Lagerhallen',
    description: 'Reinigung technischer Flächen, Maschinenumgebung & großflächiger Hallen – auch unter Betrieb.',
    category: 'commercial', slug: 'industriereinigung-potsdam' },

  { id: 'kitareinigung',         icon: '🏫', title: 'Kita- & Schulreinigung',
    description: 'Hygienisch sichere Reinigung für öffentliche und private Bildungseinrichtungen.',
    category: 'commercial' },

  { id: 'teppichreinigung',      icon: '🧹', title: 'Treppenhaus- & Teppichreinigung',
    description: 'Gründliche Pflege von Treppenbereichen und textilen Bodenbelägen in Wohn- & Gewerbeobjekten.',
    category: 'residential' },

  { id: 'aussenreinigung',       icon: '🌿', title: 'Außenreinigung & Winterdienst',
    description: 'Pflege von Außenflächen, Gehwegen, Zufahrten – inklusive Räumen und Streuen im Winter.',
    category: 'specialist' },

  { id: 'desinfektionsservice',  icon: '🧴', title: 'Desinfektionsservice',
    description: 'Spezielle Reinigung für hygienekritische Bereiche wie Praxen, Eingänge und Sanitäranlagen.',
    category: 'specialist' },

  { id: 'lueftungsreinigung',    icon: '🌬️', title: 'Reinigung von Lüftungs- & Klimaanlagen',
    description: 'Staubfreie Luft – durch gründliche Reinigung von Klimasystemen & Lüftungstechnik.',
    category: 'specialist' },
];
```

---

## 📋 Build Steps — Execute in This Order

### Step 1 — Scaffold
```bash
npx create-next-app@latest glampotsdam --typescript --tailwind --app --src-dir
cd glampotsdam
npm install react-hook-form zod @hookform/resolvers resend
```
Configure `tailwind.config.ts` with the brand color tokens above.

---

### Step 2 — Root Layout (`src/app/layout.tsx`)
- Set `<html lang="de">` — required for German SEO
- Default metadata: title template `"GlamPotsdam | %s"`, description with 'Potsdam' keyword
- Render `<Navbar />` and `<Footer />` here
- Load fonts via `next/font/google` — self-hosted, GDPR-compliant

---

### Step 3 — Homepage (`src/app/page.tsx`)
Pages are **thin**. Import organisms only. No logic in page files.

```tsx
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid services={ALL_SERVICES} />
      <AboutSection />
      <ContactFormSection />
      <FAQSection />
    </>
  );
}
```

---

### Step 4 — Hero Section
Must answer in under 3 seconds: *Who? What? How to reach?*

- **H1:** `"Professionelle Gebäudereinigung in Potsdam"` — exact SEO keyword
- **Subheading:** The tagline
- **CTA 1 (primary):** `"Jetzt Anfragen"` → scrolls to `#anfrage`
- **CTA 2 (secondary):** `tel:+4916096383001` → click-to-call on mobile
- **Trust bar:** ⭐⭐⭐⭐⭐ · 100 km Radius · Inhabergeführt · Faire Preise
- Background: dark-blue-to-white gradient or photo with overlay

---

### Step 5 — Services Grid
- 3 cols desktop / 2 cols tablet / 1 col mobile
- Group: commercial → residential → specialist with sub-headings
- Each `ServiceCard`: large emoji icon, bold title, 2-line description
- Hover: card lifts with `box-shadow` transition

---

### Step 6 — About Section
- Two columns: text left, image right (reverse on mobile)
- Headline: `"Warum GlamPotsdam?"`
- 4 USP checkmarks: Flexibel · Großes Leistungsspektrum · Transparente Preise · Direkter Inhaberkontakt

---

### Step 7 — Contact Form
> This is the #1 conversion element. Keep it friction-free.

**Fields:**
1. Vor- und Nachname (required, min 2 chars)
2. E-Mail-Adresse (required, valid email)
3. Telefonnummer (required, German number regex)
4. Service Interest (required, `<Select>` with all 11 services + "Sonstiges")
5. Nachricht (optional, `<Textarea>`)
6. Hidden honeypot field (name="website", tabIndex={-1}) — **SPAM protection, never remove**
7. GDPR checkbox (required) linking to `/datenschutz`

**States:** idle → loading (Spinner) → success (confirmation message) → error (inline toast, form preserved)

**No CAPTCHA** — use honeypot only.

---

### Step 8 — FAQ Section
Accordion. One item open at a time. Include these 4 questions:

1. *Fallen Anfahrtskosten für die Objektbesichtigung an?* → Keine zusätzlichen Kosten innerhalb Potsdam
2. *Werden wir immer von denselben Reinigungskräften betreut?* → Feste Mitarbeitende, Ersatz bei Urlaub/Krankheit
3. *Bieten Sie auch Sonderreinigungen an?* → Ja, bei freien Kapazitäten
4. *Wie schnell können Sie mit der Reinigung starten?* → In der Regel zeitig, je nach Saison mit Vorlaufzeit

---

### Step 9 — Footer
- Company name + address: `Gerlachstr. 31/33, 14480 Potsdam`
- Phone: `(+49) 0160 963-83001`
- Email: `info@reinigungsservice-potsdam.de`
- Hours: `Mo–Fr 08:00–18:00 Uhr`
- Links: Impressum · Datenschutz (legally required — never remove)

---

### Step 10 — API Route (`src/app/api/contact/route.ts`)
```ts
export async function POST(request: Request) {
  const body = await request.json();
  // 1. Validate with Zod schema
  // 2. Reject if honeypot is non-empty
  // 3. Send email via EmailService adapter
  // 4. Return { ok: true } or { error: '...' }
}
```

**Never** import Resend directly here — use `emailService.send()` from the adapter.

---

## 🔍 SEO Rules — Always Apply

- Every page has a unique `<title>` and `<meta name="description">`
- H1 on every page contains "Potsdam"
- `lang="de"` on `<html>` — never change this
- All images use `next/image` with German `alt` text
- Add `LocalBusiness` JSON-LD schema to homepage:

```json
{
  "@type": "LocalBusiness",
  "name": "GlamPotsdam Gebäudereinigung",
  "telephone": "+49-160-96383001",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gerlachstr. 31/33",
    "addressLocality": "Potsdam",
    "postalCode": "14480",
    "addressCountry": "DE"
  },
  "openingHours": "Mo-Fr 08:00-18:00",
  "areaServed": "Potsdam"
}
```

---

## 🇩🇪 German Legal Requirements — Non-Negotiable

| Requirement | What to do |
|---|---|
| **Impressum** | Page at `/impressum` — full company address, phone, email |
| **Datenschutz** | Page at `/datenschutz` — GDPR-compliant privacy policy |
| **GDPR consent on form** | Checkbox required before submission — links to `/datenschutz` |
| **Self-hosted fonts** | Use `next/font/google` — never load from Google CDN directly |
| **No cookie banner needed** | Use Plausible analytics (cookieless) — no banner required |

---

## ⚡ Performance Rules

- All images via `next/image` — auto WebP, lazy load, no layout shift
- Hero image max 200 KB
- Logo in SVG format
- No heavy client-side JS on the homepage (keep it RSC where possible)
- Target Lighthouse score: **> 90** on both mobile and desktop

---

## 🚫 Never Do This

- ❌ Never hardcode service names in JSX — use `services.data.ts`
- ❌ Never import Resend or any SDK directly into a component
- ❌ Never use `any` type — use the interfaces in `src/types/index.ts`
- ❌ Never add a real CAPTCHA — use the honeypot field
- ❌ Never remove the Impressum or Datenschutz links from the footer
- ❌ Never load Google Fonts from the CDN — use `next/font/google`
- ❌ Never put business logic inside a page file — pages are thin wrappers only
- ❌ Never use inline styles — use Tailwind classes only
- ❌ Never skip `alt` text on images

---

## ✅ Definition of Done — Each Feature

A feature is done when:
- [ ] TypeScript compiles with zero errors (`npm run typecheck`)
- [ ] ESLint passes with zero warnings (`npm run lint`)
- [ ] Component renders correctly on mobile (375px) and desktop (1440px)
- [ ] All interactive elements are keyboard-accessible
- [ ] German `alt` text on every image
- [ ] No hardcoded strings that belong in `data/` files

---

## 🚀 Deployment

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Set env vars in Vercel dashboard: `RESEND_API_KEY`, `CONTACT_EMAIL`
4. Custom domain: `reinigungsservice-potsdam.de`
5. HTTPS auto-configured by Vercel

**Branches:**
- `main` → auto-deploys to production
- `staging` → deploys to staging URL
- Every PR → gets a preview URL

---

*AGENTS.md — GlamPotsdam Website · Last updated April 2026*
