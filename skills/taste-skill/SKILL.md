---
name: design-taste-frontend
description: Anti-slop frontend skill for landing pages, e-commerce, portfolios, and redesigns. Infers design direction, tunes dials (VARIANCE / MOTION / DENSITY), enforces high-contrast typography, strict em-dash ban, color consistency, and fluid spring physics.
---

# tasteskill: Anti-Slop Frontend Skill (Christian Multi Store Edition)

> Landing pages, e-commerce stores, portfolios, and redesigns.
> Every rule below is **contextual**. Read the brief, infer the vibe, and apply strict anti-slop craftsmanship.

---

## 0. BRIEF INFERENCE (Read the Room First)

Before touching code or tweaking dials, infer the user's intent:
1. **Page kind**: E-commerce / Landing / Catalog / Checkout.
2. **Vibe & Aesthetic**: Dark Minimal Tech / Cyber-Gamer Sofisticado (`#090A0F`, `#0D0E15`, `#13151F`).
3. **Core Colors**: High-contrast Neon Cyan (`#00E5FF`), Neon Purple (`#A855F7`), WhatsApp Green (`#25D366`).
4. **Typography**: Display Headings (`Plus Jakarta Sans` / `Outfit` / `Geist` - font-black) + Body (`Inter` / `Geist Sans`).

---

## 1. THE THREE DIALS

* **`DESIGN_VARIANCE: 8`** (1 = Perfect Symmetry, 10 = Artsy Asymmetry)
* **`MOTION_INTENSITY: 6`** (1 = Static, 10 = Cinematic Physics)
* **`VISUAL_DENSITY: 4`** (1 = Art Gallery Airy, 10 = Dense Cockpit)

---

## 2. HARD DESIGN RULES & ANTI-SLOP PROTOCOL

### 2.A The Complete Em-Dash Ban
- **ZERO em-dashes (`—`) anywhere in UI or copy.**
- Never use `—` in headlines, subheads, pill badges, buttons, quotes, or captions.
- Replace with regular hyphen (`-`), commas, periods, or restyle the sentence.

### 2.B Color & Shape Consistency Locks
- **One primary accent**: Neon Cyan (`#00E5FF`) for prices, highlights, tech badges.
- **Conversion accent**: WhatsApp Green (`#25D366`) for primary checkout actions.
- **Consistent Radius System**:
  - Main outer cards / containers: `rounded-3xl`
  - Cards, inputs & interactive buttons: `rounded-2xl`
  - Badges & floating action triggers: `rounded-full`

### 2.C Typography & Readability
- Display headlines: `Plus Jakarta Sans` with `font-black` / `font-extrabold`, tight tracking (`tracking-tight`).
- Body text: `Inter` with relaxed line-height (1.5–1.7) and WCAG AA contrast against dark surfaces.
- Italic descender clearance: when italic is used with descenders (`y, g, j, p, q`), ensure min `leading-[1.1]` and bottom reserve.

### 2.D Button Contrast & Single-Line CTAs
- Every primary CTA button must pass WCAG AA contrast (e.g. `text-black` on `#00E5FF` or `#25D366`).
- CTA text must fit on a single line at desktop (`whitespace-nowrap`).
- No duplicate CTA intent on the same viewport.

### 2.E Hero & Viewport Discipline
- Hero headline: max 2–3 lines.
- Supporting subtext: max 20 words, max 4 lines.
- Primary and secondary CTAs visible above the fold on standard desktop viewports.

### 2.F Real Component States & Feedback
- Hover states: `hover:scale-[1.02]` or `hover:brightness-110`.
- Active/Press states: `active:scale-[0.98]` tactile push.
- Spring physics transitions: `type: "spring", stiffness: 100, damping: 20` using `motion/react`.
- Skeletal loaders matching layout sizes (no generic circular spinners).

---

## 3. PRE-FLIGHT CHECKLIST

Before finalizing any frontend code:
- [ ] ZERO em-dashes (`—`) in any component or copy string.
- [ ] Color consistency locked (`#00E5FF`, `#A855F7`, `#25D366`).
- [ ] Shape consistency locked (`rounded-3xl` / `rounded-2xl` / `rounded-full`).
- [ ] Button contrast strictly passes WCAG AA (black text on bright buttons).
- [ ] All interactive buttons respond with spring physics or active press states.
- [ ] Viewport stability using `min-h-[100dvh]` instead of bugged `h-screen`.
- [ ] Zero horizontal scroll overflow on mobile (`overflow-x-hidden`).
