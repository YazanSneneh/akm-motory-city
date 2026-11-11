# AKM Motor City (مدينة الخياط للسيارات)

A modern, high-performance dealership website and executive management portal re-implemented with the same stack: **Nuxt 3**, **Vue 3**, **Tailwind CSS**, **Reka/Radix UI** primitives, and **Lucide Icons**.

---

## 🚀 Key Improvements & Features

1. **Executive Dealership Admin Portal (`/admin`)**:
   - Modern, luxury dealership management dashboard.
   - **Real-Time KPIs**: Total fleet count, inventory value (~2.08M JOD), live customer reservations, and catalog view metrics.
   - **Fleet & Inventory Control (Full CRUD)**:
     - Search & filter by condition (New vs Pre-Owned), brand, and status.
     - 1-click **Available ⇄ Fully Reserved** toggle switch.
     - Add new vehicles with comprehensive technical specs & live photo preview.
     - Edit prices, model years, and specifications live.
     - Delete vehicles with confirmation.
   - **Reservations & Inquiries Hub**:
     - View all customer online bookings and 100 JOD deposits.
     - Status workflow: `Pending` → `Contacted` → `Confirmed` → `Completed` → `Cancelled`.
     - Direct **1-click WhatsApp customer reply** with pre-filled vehicle details and booking reference code.
     - Direct customer phone call button.
   - **Showroom Settings**: Edit showroom phone numbers, WhatsApp, and location.

2. **Customer Website Features**:
   - **Instant Search & Multi-Criteria Filtering**: Sub-millisecond filter by brand, body shape, engine/fuel type, transmission, drive type, price slider, and condition.
   - **Interactive 80-Frame 360° Car Viewer**: Drag-to-spin vehicle photography with rotational inertia, scrubber, and auto-rotation.
   - **Side-by-Side Comparison Matrix**: Floating comparison drawer and comprehensive spec comparison table for up to 3 cars.
   - **2-Step Online Reservation Flow**: 100 JOD deposit booking with Mastercard, Apple Pay, or direct WhatsApp booking with confetti celebration.
   - **3D VR Virtual Showroom**: Walkthrough experience of the flagship showroom.
   - **100% Bilingual**: Seamless English and Arabic toggle with true RTL layout and font switching (`Cairo`/`Tajawal` for Arabic, `Lato` for English).
   - **Currency Switcher**: Instant JOD ⇄ USD conversion.

---

## 🔐 Admin Portal Access

* **URL**: [http://localhost:3000/admin](http://localhost:3000/admin) (or `/admin/login`)
* **Default Credentials**:
  * **Email**: `admin@akm.jo`
  * **Password**: `akm2026`
* **Public Site Shortcut**: A discreet "Staff Portal" link is also available in the website footer.

---

## 🛠 Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (v3.21+) / [Vue 3](https://vuejs.org/) (Composition API `<script setup>`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)
- **State & Utilities**: [@vueuse/core](https://vueuse.org/)
- **Interactive FX**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment**: [Netlify](https://www.netlify.com/) (Nitro serverless functions preset)

---

## 📦 Project Structure

```text
├── assets/
│   └── css/main.css                 # Tailwind directives, scrollbars, glassmorphism
├── components/
│   ├── admin/
│   │   ├── AdminSidebar.vue         # Luxury sidebar with active badges & live site link
│   │   ├── CarEditModal.vue         # Add/edit vehicle modal with image preview
│   │   └── ReservationModal.vue     # Booking details with direct WhatsApp & phone call
│   ├── AboutSection.vue             # 4 Pillars: Warranties, History, Variety, Trust
│   ├── AppFooter.vue                # Footer with social links & Staff Portal shortcut
│   ├── AppHeader.vue                # Sticky navbar with search, currency, lang, wishlist
│   ├── BookingModal.vue             # 2-step reservation dialog with confetti & code
│   ├── CarCard.vue                  # Vehicle card with badges, specs row & hover dots
│   ├── CarCardSkeleton.vue          # Loading skeleton
│   ├── CarGallery.vue               # Photo carousel and 360 viewer switcher
│   ├── CompareDrawer.vue            # Floating bottom comparison tray
│   ├── CompareModal.vue             # Side-by-side comparison modal table
│   ├── FilterDrawer.vue             # Multi-attribute filter sidebar
│   ├── HeroSection.vue              # WebM video hero with smart search
│   └── ThreesixtyViewer.vue         # 80-frame interactive 360 drag-and-spin viewer
├── composables/
│   ├── useAdminAuth.ts              # Dealership staff authentication & session state
│   ├── useCompare.ts                # Vehicle compare state
│   ├── useCurrency.ts               # Currency conversion (JOD / USD)
│   ├── useFavorites.ts              # Wishlist state
│   └── useI18n.ts                   # Bilingual English / Arabic translation state
├── data/
│   └── site-data.json               # Extracted catalog (31 cars, specs, 360 frames, terms)
├── pages/
│   ├── admin/
│   │   ├── index.vue                # Executive Dealership Dashboard (Overview, Inventory, Bookings, Settings)
│   │   └── login.vue                # Luxury Staff Login portal
│   ├── index.vue                    # Homepage with video hero & featured inventory
│   ├── cars/
│   │   ├── index.vue                # Full catalog with live filters & pagination
│   │   └── [id].vue                 # Car detail page with 360 viewer & booking
│   ├── favourite.vue                # Wishlist page
│   ├── showroom.vue                 # 3D VR showroom tour
│   └── terms_conditions.vue         # Legal terms & reservation policies
├── server/
│   ├── utils/
│   │   └── store.ts                 # In-memory & JSON file persistence store
│   └── api/
│       ├── admin/                   # Admin management API routes (auth, stats, cars, reservations)
│       ├── bootstrap.get.ts         # Settings, banners & filters API
│       ├── cars.get.ts              # Filtered & paginated cars API
│       ├── cars/[id].get.ts         # Single car & related vehicles API
│       └── reservation.post.ts      # Reservation booking API
├── netlify.toml                     # Netlify deployment configuration
├── nuxt.config.ts                   # Nuxt 3 configuration & Google Fonts
└── tailwind.config.ts               # AKM color system & typography
```

---

## 🏃 Getting Started

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public website or [http://localhost:3000/admin](http://localhost:3000/admin) for the dashboard.

### Production Build & Preview
```bash
npm run build
node .output/server/index.mjs
```

### Deploy to Netlify
Push to your GitHub repository and link it to Netlify, or deploy directly via Netlify CLI:
```bash
npx netlify deploy --prod
```
The pre-configured `netlify.toml` handles the build and serverless function deployment automatically.
