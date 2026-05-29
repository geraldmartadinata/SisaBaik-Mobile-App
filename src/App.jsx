import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import MobileWrapper from './layouts/MobileWrapper';
import PageTransition from './components/ui/PageTransition';

import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import StoreDetailPage from './pages/StoreDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import SellerOrdersPage from './pages/SellerOrdersPage';
import CreateListingPage from './pages/CreateListingPage';
import SellerProfilePage from './pages/SellerProfilePage';
import RegisterMerchantPage from './pages/RegisterMerchantPage';
import ChatPage from './pages/ChatPage';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><SplashPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/home" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/store/:id" element={<PageTransition><StoreDetailPage /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
        <Route path="/order/:id" element={<PageTransition><OrderTrackingPage /></PageTransition>} />
        <Route path="/orders" element={<PageTransition><OrdersPage /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
        <Route path="/seller-profile" element={<PageTransition><SellerProfilePage /></PageTransition>} />
        <Route path="/register-merchant" element={<PageTransition><RegisterMerchantPage /></PageTransition>} />
        <Route path="/seller-dashboard" element={<PageTransition><SellerDashboardPage /></PageTransition>} />
        <Route path="/seller-orders" element={<PageTransition><SellerOrdersPage /></PageTransition>} />
        <Route path="/create-listing" element={<PageTransition><CreateListingPage /></PageTransition>} />
        <Route path="/chat" element={<PageTransition><ChatPage /></PageTransition>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <ToastProvider>
            <MobileWrapper>
              <AnimatedRoutes />
            </MobileWrapper>
          </ToastProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
