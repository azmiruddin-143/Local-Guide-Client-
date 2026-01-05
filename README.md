# 🗺️ Local Guide Platform - Frontend

A modern, responsive web application for connecting travelers with local tour guides. Built with Next.js 16, TypeScript, and Tailwind CSS.

# Live Url https://localguidebd.vercel.app/



## ✨ Features

### For Tourists
- 🔍 **Explore Tours** - Search and filter tours by location, category, price, language
- 📅 **Book Tours** - Select date/time slots with real-time availability
- 💳 **Secure Payments** - SSLCommerz payment gateway integration
- 📝 **Manage Bookings** - View, cancel, and retry failed payments
- ⭐ **Write Reviews** - Rate and review completed tours
- 💬 **Notifications** - Real-time booking and payment updates
- 📧 **Newsletter** - Subscribe to platform updates

### For Guides
- 🎯 **Create Tours** - Add tours with images, pricing, and details
- 📅 **Manage Availability** - Set date-based availability with time slots
- 📊 **View Bookings** - Manage incoming booking requests
- 💰 **Track Earnings** - View wallet balance and earnings history
- 💸 **Request Payouts** - Withdraw earnings to bank/mobile banking
- ⭐ **View Reviews** - See tourist reviews and ratings
- 📈 **Dashboard Analytics** - Track performance metrics

### For Admins
- 👥 **User Management** - View, edit, block/unblock users
- 🎯 **Tour Management** - Moderate and manage all tours
- 📝 **Booking Management** - View and manage all bookings
- 💳 **Payment Management** - View payments, process refunds
- 💸 **Payout Management** - Approve/reject guide payout requests
- ⭐ **Review Management** - Moderate reviews
- ⚙️ **Platform Settings** - Configure fees, contact info, social links
- 📧 **Newsletter Management** - Manage subscribers

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Icons**: Heroicons, Lucide React
- **Forms**: React Hook Form (implied)
- **Validation**: Zod
- **Date Handling**: date-fns, react-day-picker
- **Notifications**: Sonner (toast notifications)
- **Authentication**: JWT with HTTP-only cookies
- **State Management**: React Context + Server Components

---

## 📦 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend API** https://local-guide-server-bd.vercel.app/

---

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env.local
```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

---

## 🔧 Environment Variables

Create a `.env.local` file in the frontend root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Frontend URL (for redirects)
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# JWT Secret (must match backend)
JWT_SECRET=your_jwt_secret_key
```

---

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Application runs on `http://localhost:3000` with hot reload.

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (commonLayout)/           # Public pages layout
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── explore/              # Tour search page
│   │   │   ├── all-guides/           # Browse guides
│   │   │   ├── (auth)/               # Auth pages
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── forgot-password/
│   │   │   └── payment/              # Payment result pages
│   │   │       ├── success/
│   │   │       ├── failed/
│   │   │       └── cancelled/
│   │   ├── (dashboardLayout)/        # Dashboard layout
│   │   │   ├── (touristLayout)/      # Tourist dashboard
│   │   │   │   └── dashboard/
│   │   │   │       ├── bookings/
│   │   │   │       ├── payment-history/
│   │   │   │       └── profile/
│   │   │   ├── guide/                # Guide dashboard
│   │   │   │   └── dashboard/
│   │   │   │       ├── (Tour Management)/
│   │   │   │       │   ├── my-tours/
│   │   │   │       │   ├── create-tour/
│   │   │   │       │   ├── availability/
│   │   │   │       │   └── bookings/
│   │   │   │       ├── (Business)/
│   │   │   │       │   ├── earnings/
│   │   │   │       │   └── payouts/
│   │   │   │       └── profile/
│   │   │   └── admin/                # Admin dashboard
│   │   │       └── dashboard/
│   │   │           ├── (User Management)/
│   │   │           │   └── users-management/
│   │   │           ├── (Platform Management)/
│   │   │           │   ├── tours-management/
│   │   │           │   └── bookings-management/
│   │   │           ├── (Financial Management)/
│   │   │           │   ├── payments-management/
│   │   │           │   └── payouts-management/
│   │   │           ├── (Support)/
│   │   │           │   ├── reviews-management/
│   │   │           │   ├── contact-messages/
│   │   │           │   └── subscribe-emails/
│   │   │           └── (Settings)/
│   │   │               └── platform-settings/
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── common/                   # Shared components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── modules/                  # Feature-specific components
│   │   │   ├── Home/                 # Homepage sections
│   │   │   ├── Explore/              # Tour search components
│   │   │   ├── TourDetails/          # Tour detail components
│   │   │   ├── Booking/              # Booking flow components
│   │   │   ├── Dashboard/            # Dashboard components
│   │   │   ├── Tourist/              # Tourist-specific
│   │   │   ├── Guide/                # Guide-specific
│   │   │   └── Admin/                # Admin-specific
│   │   └── ui/                       # Radix UI components
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       └── ...
│   ├── lib/                          # Utilities
│   │   ├── utils.ts                  # Helper functions
│   │   ├── tokenHandlers.ts          # Cookie management
│   │   └── cn.ts                     # Class name merger
│   ├── types/                        # TypeScript types
│   │   ├── user.interface.ts
│   │   ├── tour.interface.ts
│   │   ├── booking.interface.ts
│   │   └── ...
│   ├── proxy.ts                      # Middleware for auth
│   └── middleware.ts                 # Next.js middleware
├── public/                           # Static assets
├── .env.local                        # Environment variables
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json
```

---

## 🎯 Key Features

### 1. Homepage
- Hero section with search
- Popular tours carousel
- Featured guides
- Tour categories
- How it works section
- Testimonials
- Newsletter subscription

### 2. Explore Tours
- Advanced search and filters
- Grid/List view toggle
- Real-time filtering
- Pagination
- Sort by price, rating, date
- Category badges
- Responsive design

### 3. Tour Details
- Image gallery
- Tour information
- Guide profile
- Availability calendar
- Real-time slot booking
- Guest count selection
- Reviews and ratings
- Related tours

### 4. Booking Flow
```
Select Tour → Choose Date/Time → Enter Guest Count → Review Details → Payment → Confirmation
```

### 5. Payment Integration
- SSLCommerz sandbox/live mode
- Secure payment processing
- Success/Failure/Cancel pages
- Payment retry functionality
- Payment history tracking

### 6. Dashboard Features

#### Tourist Dashboard
- View all bookings
- Cancel pending bookings
- Retry failed payments
- View payment history
- Write reviews
- Update profile

#### Guide Dashboard
- Create and manage tours
- Set availability slots
- View booking requests
- Track earnings
- Request payouts
- View reviews
- Update profile

#### Admin Dashboard
- User management (CRUD)
- Tour moderation
- Booking oversight
- Payment management
- Payout processing
- Review moderation
- Platform settings
- Newsletter management

---

## 👥 User Roles

### Tourist
- Browse and search tours
- Book tours with payment
- Manage bookings
- Write reviews
- View payment history

### Guide
- Create and manage tours
- Set availability
- Accept/reject bookings
- Track earnings
- Request payouts
- View reviews

### Admin
- Full platform control
- User management
- Content moderation
- Financial oversight
- Platform configuration

---

## 📄 Pages Overview

### Public Pages
- `/` - Homepage
- `/explore` - Tour search and filters
- `/tours/[slug]` - Tour details with booking
- `/all-guides` - Browse all guides
- `/login` - User login
- `/register` - User registration
- `/forgot-password` - Password reset

### Tourist Pages
- `/dashboard/bookings` - My bookings
- `/dashboard/payment-history` - Payment history
- `/dashboard/profile` - Profile settings

### Guide Pages
- `/guide/dashboard/my-tours` - Tour management
- `/guide/dashboard/create-tour` - Create new tour
- `/guide/dashboard/availability` - Availability management
- `/guide/dashboard/bookings` - Booking requests
- `/guide/dashboard/earnings` - Earnings overview
- `/guide/dashboard/payouts` - Payout requests
- `/guide/dashboard/profile` - Profile settings

### Admin Pages
- `/admin/dashboard/users-management` - User CRUD
- `/admin/dashboard/tours-management` - Tour moderation
- `/admin/dashboard/bookings-management` - All bookings
- `/admin/dashboard/payments-management` - Payment oversight
- `/admin/dashboard/payouts-management` - Payout processing
- `/admin/dashboard/reviews-management` - Review moderation
- `/admin/dashboard/platform-settings` - Platform config

### Payment Result Pages
- `/payment/success` - Payment successful
- `/payment/failed` - Payment failed
- `/payment/cancelled` - Payment cancelled

---

## 🎨 Components

### UI Components (Radix UI)
- Button, Input, Select, Checkbox
- Dialog, Alert Dialog, Dropdown Menu
- Tabs, Accordion, Popover
- Avatar, Badge, Card
- Slider, Switch, Separator
- Scroll Area, Navigation Menu

### Custom Components
- **Navbar** - Responsive navigation with auth
- **Footer** - Site footer with links
- **TourCard** - Tour display card
- **BookingModal** - Booking flow modal
- **AvailabilityCalendar** - Date/time picker
- **ReviewCard** - Review display
- **DashboardSidebar** - Dashboard navigation
- **FilterPanel** - Search filters
- **PaymentCard** - Payment history item

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Environment Variables**
   - Add all variables from `.env.local`
   - Set `NEXT_PUBLIC_API_URL` to production backend URL
   - Set `JWT_SECRET` to match backend

4. **Custom Domain** (Optional)
   - Add custom domain in Vercel settings
   - Update DNS records

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🔒 Authentication Flow

1. User logs in via `/login`
2. Backend returns JWT tokens
3. Tokens stored in HTTP-only cookies
4. Middleware (`proxy.ts`) validates tokens
5. Protected routes check user role
6. Expired tokens trigger re-login




---

**Version**: 0.1.0  
**Last Updated**: December 2025  
**Built with**: Next.js 16, TypeScript, Tailwind CSS
