import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import PaymentMethodSelector from '../components/ui/PaymentMethodSelector';
import { formatCurrency } from '../utils/formatCurrency';
import { getMenuImage } from '../utils/imageMapper';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartStore, cartSubtotal, cartTotal, platformFee, clearCart, createOrder } = useApp();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('gopay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!cartStore || cartItems.length === 0) {
    return (
      <div className="page-wrapper bg-white flex items-center justify-center">
        <main className="text-center">
          <p className="text-gray-400 mb-4">Your cart is empty</p>
          <button onClick={() => navigate('/home')} className="text-primary-600 font-semibold">
            Browse stores →
          </button>
        </main>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    addToast('Processing secure payment...', 'success');

    setTimeout(() => {
      const order = createOrder({
        storeId: cartStore.id,
        storeName: cartStore.name,
        storeBranch: cartStore.branch,
        storeAvatar: null,
        pickupWindow: cartStore.pickupWindow,
        items: cartItems.map(item => ({
          bagId: item.bagId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: cartSubtotal,
        platformFee,
        total: cartTotal,
        paymentMethod,
        storeLat: cartStore.lat,
        storeLng: cartStore.lng,
        userName: user?.name,
      });

      clearCart();
      setIsProcessing(false);

      // Navigate back to the store detail page with the completed order in state
      navigate(`/store/${cartStore.id}`, { state: { completedOrder: order }, replace: true });
    }, 450); // 450ms constraint max
  };

  return (
    <div className="page-wrapper bg-gray-50 page-transition">
      
      {/* 1. Header Area (Fixed) */}
      <header className="flex-none z-10 bg-white">
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Checkout</h1>
        </div>
      </header>

      {/* 2. Scrollable App Content */}
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden w-full relative no-scrollbar">
        <div className="px-5 py-4 space-y-4">
          {/* Pickup Details */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h2 className="text-sm font-bold text-gray-900">Pickup Details</h2>
            </div>
            <h3 className="font-semibold text-gray-900 text-[15px]">{cartStore.name} - {cartStore.branch}</h3>
            <p className="text-xs text-gray-500 mt-1">{cartStore.address}</p>
            <p className="text-xs text-gray-500">Distance: {cartStore.distance}</p>
            <div className="flex items-center gap-2 mt-3 bg-primary-50 rounded-lg px-3 py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-primary-700">Pickup Window</p>
                <p className="text-xs text-primary-600">Today, {cartStore.pickupWindow}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <h2 className="text-sm font-bold text-gray-900">Order Summary</h2>
            </div>
            
            {cartItems.map(item => (
              <div key={item.bagId} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img src={getMenuImage(item.bagId)} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.quantity}x Quantity</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}

            {/* Totals */}
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Platform Fee</span>
                <span className="text-gray-900">{formatCurrency(platformFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-100">
                <span className="text-gray-900">Total</span>
                <span className="text-primary-600">{formatCurrency(cartTotal)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <h2 className="text-sm font-bold text-gray-900">Payment Method</h2>
            </div>
            <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />
          </div>
        </div>
      </main>

      {/* 3. Bottom Navigation (Fixed) */}
      <nav className="flex-none z-10 bg-white shadow-bottom-bar border-t border-gray-100 p-5">
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="btn-primary relative"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Pay Now - {formatCurrency(cartTotal)}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </>
          )}
        </button>
      </nav>

    </div>
  );
}
