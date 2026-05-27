import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import MobileWrapper from './layouts/MobileWrapper';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import StoreDetailPage from './pages/StoreDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import SellerProfilePage from './pages/SellerProfilePage';
import RegisterMerchantPage from './pages/RegisterMerchantPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import SellerOrdersPage from './pages/SellerOrdersPage';
import CreateListingPage from './pages/CreateListingPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <MobileWrapper>
                <Routes>
                  <Route path="/" element={<SplashPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/store/:id" element={<StoreDetailPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order/:id" element={<OrderTrackingPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/seller-profile" element={<SellerProfilePage />} />
                  <Route path="/register-merchant" element={<RegisterMerchantPage />} />
                  <Route path="/seller-dashboard" element={<SellerDashboardPage />} />
                  <Route path="/seller-orders" element={<SellerOrdersPage />} />
                  <Route path="/create-listing" element={<CreateListingPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MobileWrapper>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
