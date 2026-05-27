# Full PRD Context: SisaBaik (Two-Sided Marketplace)

## 1. Core Concept & Users
"SisaBaik" connects consumers seeking cheap food with merchants selling leftover stock.
- **Consumer (Buyer):** Price-sensitive students. Needs map discovery, quick checkout, order tracking (QR), and giving reviews.
- **Merchant (Seller):** Busy MSME owners. Needs a simple dashboard, quick listing creation, order management, and performance tracking.

## 2. Technical Architecture (NO BACKEND)
- Single React App using a Mobile Wrapper (iPhone 17 Pro Max fluid ratio).
- **Global State (LocalStorage):** Must handle both Buyer and Seller states.
- **Role Switching:** Use a toggle in the Profile/Settings page to switch between `role: 'buyer'` and `role: 'seller'`.

## 3. The 7 Core Use Cases to Implement:
1. **Search (Buyer):** Map-based discovery fetching dynamic listings.
2. **Order (Buyer):** Checkout flow for "Surprise Bag".
3. **Pickup (Buyer & Seller):** Buyer shows QR code; Seller scans/verifies to mark as "Completed".
4. **Review (Buyer):** Buyer gives 1-5 stars after pickup.
5. **Registration/Login:** Entry point setting the initial role.
6. **Create Listing (Seller):** Form to input category, qty, price, pickup time. 
7. **Order Management & Dashboard (Seller):** - Tab 1: Dashboard (Sales charts, impact stats).
   - Tab 2: Orders (Active/Completed).
   - Tab 3: Reviews received.