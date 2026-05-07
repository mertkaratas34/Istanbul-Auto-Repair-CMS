# Istanbul Auto Repair - Service Management System

A modern, responsive web application for Istanbul Auto Repair Center. This prototype features a customer-facing landing page with appointment booking and an admin dashboard for service management.

## Features

- **Landing Page**: Hero section, services showcase, trust signals, and customer booking form
- **Online Booking**: Customer appointment scheduling with service type selection
- **Admin Panel**: 
  - View and manage all appointments
  - Update appointment status (New → In Shop → Finished)
  - Edit appointment details
  - Search appointments by customer name or license plate
  - Local storage-based data persistence
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with React, TypeScript, Tailwind CSS, and smooth animations

## Prerequisites

- **Node.js** 16+ 
- **npm** or **yarn**

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd istanbul-auto-repair
```

2. Install dependencies from `package.json`:
```bash
npm install
```

This command automatically installs all libraries listed in `requirements.txt`. You can also view all dependencies in the `requirements.txt` file.

**Alternative with yarn:**
```bash
yarn install
```

## Running Locally

### Development Server

Start the development server with hot module reloading:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

Build the project for production:
```bash
npm run build
```

The optimized build will be generated in the `dist/` folder.

### Preview Production Build

Test the production build locally:
```bash
npm run preview
```

### Type Checking

Run TypeScript type checking:
```bash
npm run lint
```

### Clean Build

Remove the `dist/` folder:
```bash
npm run clean
```

## Project Structure

```
src/
├── components/
│   ├── AdminLogin.tsx         # Admin authentication
│   ├── AdminPanel.tsx         # Admin dashboard
│   ├── BookingForm.tsx        # Customer appointment form
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx               # Landing page hero section
│   ├── LocationContact.tsx    # Contact and location info
│   ├── Services.tsx           # Services showcase
│   ├── StickyWhatsApp.tsx     # WhatsApp contact button
│   └── TrustSignals.tsx       # Customer testimonials
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## Admin Panel Access

The admin panel includes demo credentials for testing:
- **Email**: `admin@202studios.com`
- **Password**: `admin123`

Access the admin panel at `/admin/login` or click the "Admin Panel" link (if available in the UI).

## Data Storage

- Appointment data is stored in browser **localStorage**
- Appointments older than 7 days are automatically removed
- Data persists across browser sessions on the same device

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Motion/Framer Motion** - Smooth animations
- **Lucide React** - Icon library

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

