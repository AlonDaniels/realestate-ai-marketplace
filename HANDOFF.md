# RE AI Market — Handoff Document

## Project Overview

**RE AI Market** is a marketplace for AI-powered real estate tools where users can buy or sell AI tools with a monthly recurring revenue (MRR) model. The platform owner takes a 10% cut of every subscription.

- **Live URL:** https://realestateaimarketplace.com
- **GitHub:** https://github.com/AlonDaniels/realestate-ai-marketplace
- **Hosting:** Vercel (auto-deploys on `git push`)
- **Domain:** Cloudflare DNS → Vercel

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 16 (App Router) | Full-stack React framework |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS 4 + custom glassmorphism | UI design |
| Fonts | Cinzel (headings) + Josefin Sans (body) | Typography |
| Icons | Lucide React | SVG icon library |
| Auth | Clerk | Login, signup, sessions, MFA, SSO |
| Database | Neon (serverless Postgres) | Primary data store |
| ORM | Prisma 6 | Type-safe database queries + migrations |
| Payments | Stripe + Stripe Connect | Subscriptions, marketplace payouts |
| Validation | Zod | Runtime input validation on API routes |
| Rate Limiting | Upstash Redis | (configured, not yet active) |

---

## Architecture

### User Roles

| Role | Access |
|------|--------|
| **BUYER** | Browse, subscribe to tools, leave reviews, buyer dashboard |
| **SELLER** | Everything buyer has + submit tools, seller dashboard, Stripe Connect |
| **ADMIN** | Everything + admin dashboard, publish/unpublish/delete any tool, view analytics |

### Revenue Model
- Sellers set monthly subscription prices (in cents in DB, displayed as dollars)
- Platform takes **10%** of every subscription via Stripe Connect
- Sellers receive **90%** minus Stripe processing fees (~2.9% + 30¢)
- Free tools are also supported (price = 0)

### Data Flow
```
User signs up (Clerk) → Clerk webhook → User created in Neon DB
Seller submits tool → Tool created with status IN_REVIEW (or PUBLISHED if admin)
Buyer clicks Subscribe → Stripe Checkout → Stripe webhook → Subscription created in DB
```

---

## Pages & Routes

### Public Pages
| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Homepage — popular tools, free tools, creators, newsletter |
| `/browse` | `src/app/browse/page.tsx` | Marketplace — filter by category, sort, search |
| `/tool/[id]` | `src/app/tool/[id]/page.tsx` | Tool detail — description, reviews, subscribe button |
| `/pricing` | `src/app/pricing/page.tsx` | Pricing tiers + FAQ |
| `/sell` | `src/app/sell/page.tsx` | Seller landing page |
| `/creators` | `src/app/creators/page.tsx` | Featured creators |
| `/about` | `src/app/about/page.tsx` | About the platform |
| `/contact` | `src/app/contact/page.tsx` | Contact form |
| `/support` | `src/app/support/page.tsx` | Support options |
| `/terms` | `src/app/terms/page.tsx` | Terms of service |
| `/login` | `src/app/login/[[...login]]/page.tsx` | Clerk sign-in |
| `/signup` | `src/app/signup/[[...signup]]/page.tsx` | Clerk sign-up |

### Protected Pages
| Route | File | Role | Description |
|-------|------|------|-------------|
| `/dashboard` | `src/app/dashboard/page.tsx` | Any | Redirects to buyer or seller dashboard |
| `/dashboard/buyer` | `src/app/dashboard/buyer/page.tsx` | Any | Subscriptions, account info |
| `/dashboard/seller` | `src/app/dashboard/seller/page.tsx` | Seller+ | Tool management, stats, Stripe Connect |
| `/dashboard/seller/new` | `src/app/dashboard/seller/new/page.tsx` | Seller+ | Submit new tool |
| `/admin` | `src/app/admin/page.tsx` | Admin | Analytics, MRR, user stats, tool management |
| `/admin/add` | `src/app/admin/add/page.tsx` | Admin | Add product (instant publish) |

### API Routes
| Route | Methods | Auth | Description |
|-------|---------|------|-------------|
| `/api/tools` | GET, POST | Public / Seller | List published tools / Create tool |
| `/api/tools/[id]` | GET, PATCH | Public / Owner | Get tool / Update own tool |
| `/api/reviews` | POST | Buyer | Create or update review |
| `/api/admin/stats` | GET | Admin | Platform analytics |
| `/api/admin/tools` | GET, POST | Admin | List all tools / Create & publish tool |
| `/api/admin/tools/[id]` | PATCH, DELETE | Admin | Update status/featured, delete tool |
| `/api/stripe/checkout` | POST | Auth | Create Stripe checkout session |
| `/api/stripe/connect` | POST | Auth | Create Stripe Connect onboarding link |
| `/api/webhooks/clerk` | POST | Svix signature | Sync Clerk users to DB |
| `/api/webhooks/stripe` | POST | Stripe signature | Handle subscription lifecycle events |

---

## Database Schema

### Models
- **User** — synced from Clerk. Fields: clerkId, email, name, role, stripeCustomerId, stripeAccountId, stripeOnboarded
- **Tool** — marketplace listings. Fields: name, slug, description, price (cents), category, status, tags, installs, rating, reviewCount, featured, stripeProductId/PriceId
- **Subscription** — buyer ↔ tool. Fields: stripeSubscriptionId, status, period dates
- **Review** — one per user per tool. Fields: rating (1-5), title, body
- **Payout** — seller earnings tracking. Fields: amount, status, period dates

### Key Indexes
All frequently queried fields are indexed: clerkId, email, slug, category, status, featured, price, rating, installs, createdAt.

---

## Components

| Component | File | Description |
|-----------|------|-------------|
| Header | `src/components/Header.tsx` | Nav bar with auth state, admin link (email-gated) |
| Footer | `src/components/Footer.tsx` | Links, categories, newsletter |
| HeroSection | `src/components/HeroSection.tsx` | Landing page hero |
| ToolCard | `src/components/ToolCard.tsx` | Tool card for marketplace grids |
| CreatorCard | `src/components/CreatorCard.tsx` | Creator profile card |
| HowItWorks | `src/components/HowItWorks.tsx` | 3-step explainer section |
| NewsletterForm | `src/components/NewsletterForm.tsx` | Email subscription form |
| SubscribeButton | `src/components/SubscribeButton.tsx` | Wired to Stripe checkout API |
| SellerActions | `src/app/dashboard/seller/SellerActions.tsx` | Stripe Connect onboarding button |

---

## Environment Variables

All stored in `.env.local` (local) and Vercel Environment Variables (production).

```
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database (Neon Postgres)
DATABASE_URL=postgresql://...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  (not yet configured)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Upstash Redis (not yet configured)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## External Services

| Service | Dashboard | Purpose |
|---------|-----------|---------|
| **Clerk** | https://dashboard.clerk.com | User auth, manage users |
| **Neon** | https://console.neon.tech | Database management |
| **Stripe** | https://dashboard.stripe.com | Payments, subscriptions, Connect |
| **Vercel** | https://vercel.com/alondanielsb-8986s-projects/realestate-ai-marketplace | Hosting, deployments, env vars |
| **Cloudflare** | https://dash.cloudflare.com | DNS for realestateaimarketplace.com |
| **GitHub** | https://github.com/AlonDaniels/realestate-ai-marketplace | Source code |

---

## Admin Access

- **Admin email:** alondaniels.b@gmail.com
- **Admin nav link:** Only visible to admin email (hardcoded in `Header.tsx` → `ADMIN_EMAILS` array)
- **Admin DB role:** Set in database as `ADMIN` role
- **Admin panel:** `/admin` — analytics, product management, MRR tracking

### How to add a product (as admin):
1. Go to https://realestateaimarketplace.com/admin
2. Click "Add Product"
3. Fill in name, description, category, price, tags
4. Click "Publish Product" — goes live immediately

### How to make another user admin:
```bash
# In the project directory
set -a && source .env.local && set +a
node -e "
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
db.user.update({ where: { email: 'NEW_EMAIL' }, data: { role: 'ADMIN' } })
  .then(u => { console.log('Done:', u.email, u.role); db.\$disconnect(); });
"
```

---

## Deployment

### Auto-deploy (normal workflow):
```bash
git add .
git commit -m "description"
git push
```
Vercel auto-deploys on every push to `master`.

### Manual deploy (if needed):
```bash
vercel --prod
```

### Database changes:
```bash
# Edit prisma/schema.prisma, then:
npx prisma db push        # Push schema changes to Neon
npx prisma generate        # Regenerate client types
```

---

## What's Not Yet Built

| Feature | Priority | Notes |
|---------|----------|-------|
| Upstash rate limiting | Low | Packages installed, env vars not configured |
| Stripe webhook secret | Medium | Need to create webhook endpoint in Stripe dashboard |
| Newsletter backend | Medium | Forms exist but don't submit anywhere (need Resend/ConvertKit) |
| Contact form backend | Medium | Form exists but doesn't send emails |
| File/image uploads | Medium | Tools don't have real images yet (using category icons) |
| Seller Stripe Connect flow | Medium | API exists, needs testing with real Stripe Connect |
| Real payment testing | High | Stripe is in test mode — switch to live keys for production |
| Search functionality | Low | Browse has filters but no text search |
| Edit tool page for sellers | Low | API exists (`PATCH /api/tools/[id]`), no UI yet |
| Email notifications | Low | No transactional emails (welcome, receipt, etc.) |

---

## Design System

| Element | Value |
|---------|-------|
| Primary color | `#0F766E` (teal) |
| Secondary/CTA | `#0369A1` (blue) |
| Background | `#F0FDFA` (mint) |
| Text primary | `#134E4A` |
| Heading font | Cinzel (serif) |
| Body font | Josefin Sans |
| Card style | Glassmorphism (backdrop-blur, translucent) |
| Border radius | 2xl (1rem) for cards, full for buttons |
| Animations | Fade-in-up with stagger, 150-300ms transitions |
| Icons | Lucide React (SVG, no emojis) |
