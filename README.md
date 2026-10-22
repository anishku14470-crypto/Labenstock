# LABENSTOCK — Premium Contemporary Footwear E-Commerce Platform

LABENSTOCK is a full-stack, responsive luxury footwear e-commerce application built with Next.js (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, and Razorpay Standard Checkout.

---

## 1. Architectural Highlights

- **Dual-Mode Data Architecture (Repository Pattern)**:
  - **Safe Local Development Mode**: Out of the box, LABENSTOCK boots up immediately with a persistent in-memory/JSON storage engine pre-seeded with 12 handcrafted footwear styles, complete variant matrices, coupons, and orders.
  - **Supabase Cloud Mode**: Seamlessly connect your live Supabase PostgreSQL database, Row Level Security (RLS) policies, and Supabase Storage simply by providing environment variables in `.env.local`.
- **Financial Precision**:
  - Currency is locked to Indian Rupees (INR ₹) and represented internally as **integer paise** (e.g. ₹2,499.00 = `249900` paise) across the database, APIs, and client to prevent IEEE 754 floating-point rounding inaccuracies.
  - All totals, discounts, shipping fees, and taxes are strictly calculated and validated on the **server**—totals supplied by the browser are never trusted.
- **Razorpay Standard Integration**:
  - Official server-side order generation (`createRazorpayOrder`).
  - Cryptographic server-side verification using HMAC SHA-256 (`verifyRazorpaySignature`).
  - Idempotent Webhook handler (`/api/webhooks/razorpay`) with signature validation.
  - When test keys are not configured, the platform safely offers simulated test checkout and Cash on Delivery (COD) without crashing or pretending a connection exists.
- **Atomic Inventory & Overselling Prevention**:
  - Variant-specific inventory tracking by size (UK 7, 8, 9, 10, etc.) and color.
  - Atomic stock reservation and deduction upon order confirmation.
  - Real-time stock alerts for variants with 5 or fewer items remaining.
  - Comprehensive immutable inventory movement audit ledger.

---

## 2. Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom editorial brand tokens
- **Icons**: Lucide React
- **Validation**: Zod
- **Database**: Supabase PostgreSQL (with SQL migrations & RLS policies)
- **Payments**: Razorpay Standard Checkout (UPI, Cards, NetBanking, Wallets) + COD
- **Testing**: Node.js Automated Test Suite

---

## 3. Getting Started & Local Development

### Prerequisites
- Node.js 18+ (tested on Node v26)
- npm 10+

### Installation

1. Clone or open the repository:
   ```bash
   cd Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *(Note: You can leave `.env.local` as defaults to immediately run in Safe Local Development Mode!)*

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Execute Automated Test Suite:
   ```bash
   npm test
   ```

---

## 4. Demonstration Accounts & Credentials

To explore the private administrator dashboard and client flows immediately:

| Role | Email | Password | Access Route |
| :--- | :--- | :--- | :--- |
| **Store Administrator** | `admin@labenstock.com` | `LabenstockAdmin2025!` | `/admin` or `/login` |
| **Demo Customer** | `ananya.sharma@example.com` | `CustomerPass123!` | `/account` or `/login` |

*(Note: The login page includes one-click autofill buttons for both Administrator and Customer demo accounts).*

---

## 5. Connecting Supabase (Cloud Database & Storage)

When you are ready to connect a live Supabase project:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard and run the versioned migrations in order:
   - `supabase/migrations/00001_initial_schema.sql` (Creates tables, foreign keys, indexes)
   - `supabase/migrations/00002_rls_policies.sql` (Configures Row Level Security)
   - `supabase/migrations/00003_seed_data.sql` (Seeds demo categories, collections, settings, coupons)
3. In **Project Settings -> API**, copy your project credentials into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
   ```
4. Restart Next.js (`npm run dev`). The admin console will immediately reflect `✓ Supabase PostgreSQL`.

---

## 6. Configuring Razorpay (Live or Test Gateway)

1. Register or sign in at [dashboard.razorpay.com](https://dashboard.razorpay.com).
2. Navigate to **Settings -> API Keys** and generate **Test Keys**.
3. Add the keys to `.env.local`:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YourKeyIdHere
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
   ```
4. Set up a Webhook in the Razorpay Dashboard pointing to:
   `https://your-domain.com/api/webhooks/razorpay`
   Subscribed events: `order.paid`, `payment.captured`, `payment.failed`.

---

## 7. Demo Footwear Catalogue Seed

The platform includes 12 realistic footwear designs across 5 categories:

1. **LABENSTOCK Urban Flex Sneaker** — ₹2,499
2. **LABENSTOCK Core Knit Runner** — ₹2,799 (Sale: ₹2,499)
3. **LABENSTOCK Street Form Low** — ₹2,299
4. **LABENSTOCK Everyday Court** — ₹1,999
5. **LABENSTOCK Classic Derby** — ₹3,499
6. **LABENSTOCK Modern Oxford** — ₹3,999 (Sale: ₹3,599)
7. **LABENSTOCK City Loafer** — ₹2,999
8. **LABENSTOCK Suede Motion Loafer** — ₹3,299
9. **LABENSTOCK Daily Comfort Slip-On** — ₹1,799
10. **LABENSTOCK Trail Active** — ₹3,199 (Sale: ₹2,899)
11. **LABENSTOCK Essential Slide** — ₹999
12. **LABENSTOCK Weekend Sandal** — ₹1,299

Every demo product is tagged with `is_demo: true` and can be edited, unpublished, or replaced directly from the `/admin/products` console.

---

## 8. Customer Routes & Pages

- `/` — Homepage (Announcement bar, Sticky header, Editorial hero, Collections, Bestsellers, New arrivals, Value props, Promo banner, Demo reviews, Newsletter, Story, Footer)
- `/shop` — Product catalog with reactive multi-criteria filters (category, size, color, price slider, in-stock only) and sorting
- `/collections/[slug]` — Curated collection capsule views
- `/products/[slug]` — Product detail page with dynamic thumbnail gallery, variant selectors, live stock status, accordion specifications, and JSON-LD structured data
- `/search` — Live catalog search
- `/cart` — Shopping bag with free-shipping progress indicator and coupon code redemption
- `/checkout` — Indian customer address validation, PIN code check, server-side price re-validation, COD & Razorpay payment options
- `/order-success` — Verified confirmation with itemized snapshot, order reference, and timeline
- `/track-order` — Public consignment lookup with verification protection
- `/login` & `/register` — Authentication with demo quick-fill
- `/account` — Client profile & order history
- `/about`, `/contact`, `/faq` — Brand story and client concierge
- `/shipping-policy`, `/returns-refunds`, `/privacy-policy`, `/terms` — Operational policies

---

## 9. Admin Dashboard (`/admin`)

- **Overview (`/admin`)**: Revenue telemetry (paid orders), pending fulfillment queue, low-stock alerts, recent orders table.
- **Product Management (`/admin/products`)**: Add/edit footwear with multi-size variants, pricing, SKU assignment, image URLs, CSV export/import, published/draft status.
- **Order Management (`/admin/orders`)**: Search and filter orders, review customer address and payment references, assign courier AWB tracking numbers, update fulfillment, record refunds/cancellations.
- **Inventory Management (`/admin/inventory`)**: Size-specific stock counts, low-stock threshold monitoring, manual stock adjustments with reason logging (`restock`, `damaged`, `audit_correction`), and immutable movement audit ledger.
- **Marketing (`/admin/marketing`)**: Configure announcement bar text, homepage hero headlines/visuals, and create promotional discount coupons (`WELCOME10`, `LABEN500`).
- **Settings (`/admin/settings`)**: Configure brand details, shipping fees, free shipping thresholds, COD toggles, and inspect live database/payment gateway statuses.

---

## 10. Production Build & Deployment

1. Run production build:
   ```bash
   npm run build
   ```
2. Start production server:
   ```bash
   npm run start
   ```
3. Deploy to Vercel, Railway, AWS, or any Node.js hosting platform with standard Next.js environment configurations.
