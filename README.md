# SisaBaik Mobile App

SisaBaik is a food rescue platform designed to combat food waste by connecting users with local merchants offering surplus food at discounted rates. This repository contains the frontend mobile web application.

## Tech Stack
- **Core:** React 19 + Vite (for fast HMR and optimized builds)
- **Routing:** React Router v7
- **Styling:** Tailwind CSS (utilizing custom glassmorphism utilities)
- **Maps:** Leaflet & React-Leaflet for location-based store discovery

## Architecture & Design Notes
- **Simulated Mobile Viewport:** The app uses a custom `<MobileWrapper />` layout to perfectly simulate a 430x932 mobile screen within desktop browsers, ensuring native mobile proportions are maintained during development.
- **Component-Driven:** Heavy reliance on reusable UI components (e.g., `StoreCard`, `CategoryFilter`) isolated in `src/components/ui` to keep pages clean.
- **Premium UI (Apple-Style Glassmorphism):** We implemented a highly translucent frosted glass effect across overlays (bottom sheets, nav bars) using precise `backdrop-filter: blur() saturate()` combinations for a native OS feel.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Local Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the dev server:**
   ```bash
   npm run dev
   ```
   The app will be served at `http://localhost:5173` (or the next available port).

## Project Structure
- `/src/pages`: Top-level route components (Home, Login, Profile, etc.)
- `/src/components`: Shared UI building blocks.
- `/src/layouts`: Layout wrappers (including the mobile device simulator).
- `/src/context`: Global state management (e.g., `AuthContext`).

## Contributing
When making UI changes, please ensure you test against the simulated mobile wrapper to verify that padding, safe areas, and touch-targets remain consistent with mobile design standards.
