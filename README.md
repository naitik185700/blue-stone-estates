# BlueStone Estates 🏢 — Real Estate Platform

> **Flats • Builder Floors • Rent & Sale**  
> 📍 **Sector 69, Gurgaon**  
> 📞 **Call/WhatsApp: 9818014595**  
> 👉 **“Best Deals Guaranteed”**

A full-stack real estate web application inspired by **Regrob.com**, built with **Next.js (App Router)**, **React 19**, **Tailwind CSS v4**, **Node.js**, and **PostgreSQL**.

---

## 🌟 Key Features

- **Regrob-Inspired Search Engine**: Filter by Buy/Rent, Builder Floors, Flats, Penthouses, Commercial, BHK (2, 3, 4 BHK), and Budget.
- **Micro-Market Focus**: Deep focus on Sector 69, Gurgaon and the Southern Peripheral Road (SPR) corridor.
- **Verified Property Cards & Modals**: Detailed floor plans, high-res photos, amenities, landmarks, and instant booking.
- **Lead Capture & WhatsApp Integration**: Direct 1-tap WhatsApp chat with pre-filled property inquiries and phone calling.
- **Home Loan EMI Calculator**: Interactive sliders for loan amount, tenure, and interest rate with visual breakdowns.
- **Post Property FREE**: Owner listing portal for zero brokerage submissions.
- **VIP Site Visit Booking**: Schedule guided inspections with optional free doorstep cab pickup.
- **PostgreSQL Database**: Complete schema with `pg` connection pool, automatic offline JSON fallback, and migration/seed scripts.
- **Admin CRM**: Private dashboard at `/admin` for tracking leads, site visits, and adding new listings.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Run for Production
```bash
npm run build
npm run start
```

---

## 🗄️ Database Setup (Optional)

The platform runs 100% out of the box with the included fallback dataset in `data/`. To connect to PostgreSQL:

1. Configure `.env.local`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/bluestone_estates"
   ```

2. Seed database:
   ```bash
   npm run db:seed
   ```

Or spin up PostgreSQL using Docker:
```bash
docker compose up -d
npm run db:seed
```

---

## 📞 Contact

- **Phone / WhatsApp**: [+91 9818014595](tel:+919818014595)
- **Office**: Sector 69, Near Southern Peripheral Road (SPR), Gurgaon, Haryana 122101
