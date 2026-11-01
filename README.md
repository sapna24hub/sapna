# 🌸 GlowAura | Luxury At-Home Beauty Parlour & Home Consultant

A full-stack modern web application built with **Python Django (REST API + SQLite Backend)** and **Node.js (React + Vite + TailwindCSS + Leaflet Frontend)** designed for at-home salon & beauty consultation services.

---

## 🌟 Key Features Implemented (User Requirements)

| Feature | Description |
| :--- | :--- |
| **📅 Booking System** | Multi-step interactive booking flow. Select services -> Pick convenient date & time slot -> Enter home address & skin/hair consultation notes -> Instant appointment reference ID generation (`GLOW-XXXX`). |
| **💆‍♀️ Service & Pricing** | Categorized beauty treatments (Facials, Hair Spa, Waxing & Threading, Mani-Pedi, Bridal Glam, Body Polishing) with transparent pricing, discount badges, duration, benefits & procedure list. |
| **💰 Total Cost Calculation** | Real-time bill breakdown: Services Subtotal + Home Visit & Travel fee (FREE on orders ≥ ₹799) + 18% GST - Promo Coupons (`GLOW100`, `FIRSTBEAUTY`, `GLOW20`) = **Grand Total Cost**. |
| **📍 Live GPS Tracking** | Interactive OpenStreetMap/Leaflet tracking map with animated consultant pin moving towards the customer's house, live ETA countdown, status timeline (Confirmed -> Assigned -> On the Way -> Arrived -> In Progress -> Completed), and an interactive **"Simulate Next Step"** testing controller! |
| **⭐ Review & Ratings** | 4.95★ rating metrics, customer feedback cards, filter by star ratings, and an interactive **"Write a Review"** modal that posts verified reviews directly to the database. |
| **🗺️ Location Coverage** | 6-digit postal Pincode availability checker with arrival time estimates, list of covered zones (Delhi NCR, Gurugram, Noida, Mumbai, Bengaluru), and travel fee transparency. |
| **📱 Social Media Hub** | Instagram makeover reels gallery with likes & comments, 1-Click WhatsApp direct consultant chat button ("Chat with Senior Beauty Expert"), YouTube tutorials, and VIP club newsletter signup. |
| **⚙️ Admin & Consultant Panel** | Quick dashboard to monitor all live bookings, update consultant travel status, advance GPS simulation steps, and link directly to full Django Admin. |

---

## 🚀 Quick Start (Local Launch)

### Option 1: One-Click Launch (Recommended)
Simply double-click the file:
```
E:\beauty_parlour_hub\start_all.bat
```
*(Or right-click `start_servers.ps1` and select "Run with PowerShell")*

This will automatically:
1. Start the Python Django backend on `http://127.0.0.1:8000`
2. Start the Node.js frontend on `http://localhost:3000`
3. Automatically open your browser to `http://localhost:3000`!

---

### Option 2: Manual Terminal Launch

#### 1. Start Django Backend
```powershell
cd E:\beauty_parlour_hub\backend
python manage.py runserver 127.0.0.1:8000
```
- API Base: `http://127.0.0.1:8000/api/`
- Django Admin: `http://127.0.0.1:8000/admin/`
  - **Username:** `admin`
  - **Password:** `admin123`

#### 2. Start Node.js Frontend (In a separate terminal)
```powershell
cd E:\beauty_parlour_hub\frontend
npm run dev
```
- Open browser at `http://localhost:3000`

---

## 🧪 Demo Data & Testing Quick Tips

- **Sample Live Tracking ID:** Enter `GLOW-DEMO1` in the Live Tracker to immediately see an active journey of consultant **Pooja Sharma** on her way with live GPS coordinates!
- **Advance GPS Simulation:** Click the **"Simulate Next Step →"** button on the live map or in the Admin drawer to watch the beautician marker move closer to the customer's house and update the timeline.
- **Promo Coupon Codes to try in cart:**
  - `GLOW100` : Flat ₹100 Discount
  - `FIRSTBEAUTY` : Flat ₹150 Discount
  - `GLOW20` : 20% Percentage Discount
- **Serviceable Pincodes to test:**
  - `110001` (Connaught Place, Delhi)
  - `110049` (South Extension, Delhi)
  - `122002` (Cyber City, Gurugram)
  - `400050` (Bandra West, Mumbai)
  - `560038` (Indiranagar, Bengaluru)

---

## 🛠️ Project Structure

```
E:\beauty_parlour_hub\
│
├── backend/                             # Python Django REST Backend
│   ├── manage.py
│   ├── db.sqlite3                       # Pre-seeded database with services, consultants & bookings
│   ├── requirements.txt
│   ├── beauty_backend/                  # Django project configuration & settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── api/                             # REST API app
│       ├── models.py                    # Category, Consultant, Service, Booking, Review, Location
│       ├── serializers.py               # DRF Serializers & Bill calculation logic
│       ├── views.py                     # API views & GPS simulation engine
│       ├── urls.py                      # REST Endpoints
│       ├── admin.py                     # Django Admin registration
│       └── management/commands/seed_data.py
│
├── frontend/                            # Node.js + React + Vite + Tailwind Frontend
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                      # Main full-stack coordinator
│       ├── index.css
│       ├── services/api.js              # REST client connector
│       └── components/
│           ├── Navbar.jsx               # Navigation, cart count & WhatsApp direct link
│           ├── Hero.jsx                 # Luxury banner & quick action triggers
│           ├── ServicePricingCatalog.jsx # Categorized services & details modal
│           ├── CartDrawer.jsx           # Total cost calculation & coupon engine
│           ├── BookingModal.jsx         # 3-step appointment scheduler & confetti confirmation
│           ├── LiveTracker.jsx          # Interactive Leaflet GPS map & journey timeline
│           ├── ReviewsSection.jsx       # 4.95★ reviews & submit review form
│           ├── LocationCoverage.jsx     # Pincode checker & metro areas
│           ├── SocialHub.jsx            # Instagram reels gallery & WhatsApp CTA
│           ├── AdminDrawer.jsx          # Live bookings manager & status controller
│           └── Footer.jsx               # How It Works 4-step flow & footer
│
├── start_all.bat                        # Double-clickable Windows launch script
├── start_servers.ps1                    # PowerShell launcher
└── README.md
```
