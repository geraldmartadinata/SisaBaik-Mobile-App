import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SurpriseBagCard from '../components/ui/SurpriseBagCard';
import Badge from '../components/ui/Badge';
import PaymentSuccessModal from '../components/modals/PaymentSuccessModal';
import { AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/formatCurrency';
import { getStoreImage } from '../utils/imageMapper';
import storesData from '../data/stores.json';

export default function StoreDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartTotalItems, cartSubtotal, cartStore } = useApp();

  const store = storesData.find(s => s.id === id);

  // ── Payment success modal state ──
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    if (location.state?.completedOrder) {
      setCompletedOrder(location.state.completedOrder);
      // Clear the router state so a refresh won't re-show the modal
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  if (!store) {
    return (
      <div className="page-wrapper bg-white flex items-center justify-center">
        <p className="text-gray-400">Store not found</p>
      </div>
    );
  }

  const showCartBar = cartTotalItems > 0 && cartStore?.id === store.id;

  return (
    <div className="page-wrapper bg-gray-50 page-transition">
      <div className="page-content">
        {/* Hero Image */}
        <div className="relative h-[250px] bg-gray-100 overflow-hidden">
          <img src={getStoreImage(store.name)} alt={store.name} className="w-full h-full object-cover" />
          {/* Dark gradient overlay for top buttons */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center shadow-md 
                       active:scale-90 transition-transform"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center shadow-md active:scale-90 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center shadow-md active:scale-90 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16,6 12,2 8,6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Open Status */}
          {store.isOpen && (
            <div className="absolute bottom-4 left-4">
              <Badge variant="open">Open Now</Badge>
            </div>
          )}
        </div>

        {/* Store Info */}
        <div className="px-5 pt-5 pb-4 bg-white">
          <div className="flex items-start justify-between">
            <h1 className="text-[22px] font-bold text-gray-900 leading-tight">{store.name}</h1>
            <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              <span className="text-sm font-bold text-gray-900">{store.rating}</span>
              <span className="text-xs text-gray-400">({store.reviewCount}+ rescued)</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{store.distance} away</span>
            <span className="text-gray-300">•</span>
            <span>Downtown</span>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-3">
            {store.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-4 leading-relaxed">{store.description}</p>
        </div>

        {/* Surprise Bags Section */}
        <div className="px-5 pt-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Available Today</h2>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span>Pickup {store.pickupWindow}</span>
            </div>
          </div>

          <div className="space-y-3">
            {store.surpriseBags.map(bag => (
              <SurpriseBagCard key={bag.id} bag={bag} store={store} />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Cart Bar */}
      {showCartBar && (
        <div className="flex-none p-4 bg-white shadow-bottom-bar border-t border-gray-100 animate-slide-up">
          <button
            onClick={() => navigate('/checkout')}
            className="btn-primary"
          >
            <span className="flex items-center gap-2">
              <span className="bg-white/20 px-2.5 py-0.5 rounded-lg text-sm font-bold">
                {cartTotalItems} Item{cartTotalItems > 1 ? 's' : ''}
              </span>
              <span>Review Order - {formatCurrency(cartSubtotal)}</span>
            </span>
          </button>
        </div>
      )}

      {/* Payment Success Modal — shown after checkout redirect */}
      <AnimatePresence>
        {completedOrder && (
          <PaymentSuccessModal
            order={completedOrder}
            onClose={() => setCompletedOrder(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

