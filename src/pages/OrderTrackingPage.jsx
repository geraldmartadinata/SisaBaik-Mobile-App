import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useOrder } from '../context/OrderContext';
import OrderTimeline from '../components/ui/OrderTimeline';
import ordersData from '../data/orders.json';

export default function OrderTrackingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrderById, completeOrder } = useApp();
  const { activeOrder: legacyOrder } = useOrder();

  const [showQR, setShowQR] = useState(false);

  const handleMagicCompleteClick = () => {
    // Magic demo function to complete order
    if (order && order.id) {
      completeOrder(order.id);
      setShowQR(false);
      navigate('/orders', { state: { orderCompleted: true, completedOrderId: order.id } });
    }
  };

  // Try AppContext first, then legacy OrderContext, then dummy data
  const order = getOrderById(id) || legacyOrder || ordersData.activeOrder;

  if (!order) {
    return (
      <div className="page-wrapper bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No active orders</p>
          <button onClick={() => navigate('/home')} className="text-primary-600 font-semibold">
            Browse stores →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-gray-50 page-transition">
      <div className="page-content">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 bg-white">
          <button
            onClick={() => navigate('/orders')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Status Pesanan</h1>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Store Info Card */}
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-[15px]">
                  {order.storeName} - {order.storeBranch}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">ID: {order.orderCode || `#${order.id}`}</p>
              </div>
            </div>

            {/* Pickup Time */}
            <div className="flex items-center gap-2 mt-3 bg-primary-50 rounded-lg px-3 py-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-primary-700">Waktu Pengambilan</p>
                <p className="text-xs text-primary-600">Hari ini, {order.pickupWindow}</p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="card p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-5">Lacak Pesanan</h3>
            <OrderTimeline timeline={order.timeline} />
          </div>

          {/* Map */}
          <div className="card overflow-hidden">
            <div className="h-[180px] bg-gradient-to-br from-green-50 to-gray-100 relative">
              {/* Simulated map */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6B7280" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>

              {/* Road lines */}
              <svg className="absolute inset-0 w-full h-full opacity-15">
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#9CA3AF" strokeWidth="3" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#9CA3AF" strokeWidth="2" />
              </svg>

              {/* Store pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center shadow-lg shadow-primary-600/30 animate-bounce-in">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer for bottom buttons */}
          <div className="h-4" />
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex-none p-4 bg-white shadow-bottom-bar border-t border-gray-100 space-y-3">
        {/* Primary: Tampilkan QR */}
        <button
          onClick={() => setShowQR(true)}
          className="btn-primary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01" />
          </svg>
          <span>Tampilkan QR</span>
        </button>

        {/* Secondary outline: Chat Toko */}
        <button
          className="w-full py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Chat Toko
        </button>
      </div>

      {/* QR Code Overlay Modal */}
      {showQR && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowQR(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 w-full max-w-[340px] shadow-2xl relative animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h3 className="text-xl font-bold text-center text-gray-900 mb-6">Tunjukkan QR</h3>

            <div 
              className="w-56 h-56 mx-auto bg-white border-2 border-gray-100 rounded-2xl p-4 flex items-center justify-center shadow-inner cursor-pointer hover:border-primary-300 transition-colors"
              onClick={handleMagicCompleteClick}
            >
              <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* QR outer frame */}
                <rect x="4" y="4" width="152" height="152" rx="4" fill="white" stroke="#111827" strokeWidth="2"/>
                {/* Top-left finder pattern */}
                <rect x="12" y="12" width="40" height="40" rx="2" fill="#111827"/>
                <rect x="18" y="18" width="28" height="28" rx="1" fill="white"/>
                <rect x="24" y="24" width="16" height="16" rx="1" fill="#111827"/>
                {/* Top-right finder pattern */}
                <rect x="108" y="12" width="40" height="40" rx="2" fill="#111827"/>
                <rect x="114" y="18" width="28" height="28" rx="1" fill="white"/>
                <rect x="120" y="24" width="16" height="16" rx="1" fill="#111827"/>
                {/* Bottom-left finder pattern */}
                <rect x="12" y="108" width="40" height="40" rx="2" fill="#111827"/>
                <rect x="18" y="114" width="28" height="28" rx="1" fill="white"/>
                <rect x="24" y="120" width="16" height="16" rx="1" fill="#111827"/>
                {/* Data modules */}
                <rect x="60" y="12" width="8" height="8" fill="#111827"/>
                <rect x="76" y="12" width="8" height="8" fill="#111827"/>
                <rect x="92" y="12" width="8" height="8" fill="#111827"/>
                <rect x="60" y="24" width="8" height="8" fill="#111827"/>
                <rect x="84" y="24" width="8" height="8" fill="#111827"/>
                <rect x="60" y="36" width="8" height="8" fill="#111827"/>
                <rect x="76" y="36" width="8" height="8" fill="#111827"/>
                <rect x="92" y="36" width="8" height="8" fill="#111827"/>
                <rect x="12" y="60" width="8" height="8" fill="#111827"/>
                <rect x="28" y="60" width="8" height="8" fill="#111827"/>
                <rect x="44" y="60" width="8" height="8" fill="#111827"/>
                <rect x="60" y="60" width="8" height="8" fill="#111827"/>
                <rect x="84" y="60" width="8" height="8" fill="#111827"/>
                <rect x="108" y="60" width="8" height="8" fill="#111827"/>
                <rect x="124" y="60" width="8" height="8" fill="#111827"/>
                <rect x="140" y="60" width="8" height="8" fill="#111827"/>
                <rect x="72" y="72" width="16" height="16" rx="2" fill="#16A34A"/>
                <rect x="12" y="76" width="8" height="8" fill="#111827"/>
                <rect x="36" y="76" width="8" height="8" fill="#111827"/>
                <rect x="60" y="76" width="8" height="8" fill="#111827"/>
                <rect x="100" y="76" width="8" height="8" fill="#111827"/>
                <rect x="124" y="76" width="8" height="8" fill="#111827"/>
                <rect x="140" y="76" width="8" height="8" fill="#111827"/>
                <rect x="12" y="92" width="8" height="8" fill="#111827"/>
                <rect x="28" y="92" width="8" height="8" fill="#111827"/>
                <rect x="44" y="92" width="8" height="8" fill="#111827"/>
                <rect x="60" y="92" width="8" height="8" fill="#111827"/>
                <rect x="76" y="92" width="8" height="8" fill="#111827"/>
                <rect x="92" y="92" width="8" height="8" fill="#111827"/>
                <rect x="108" y="92" width="8" height="8" fill="#111827"/>
                <rect x="124" y="92" width="8" height="8" fill="#111827"/>
                <rect x="140" y="92" width="8" height="8" fill="#111827"/>
                <rect x="60" y="108" width="8" height="8" fill="#111827"/>
                <rect x="84" y="108" width="8" height="8" fill="#111827"/>
                <rect x="108" y="108" width="8" height="8" fill="#111827"/>
                <rect x="140" y="108" width="8" height="8" fill="#111827"/>
                <rect x="60" y="124" width="8" height="8" fill="#111827"/>
                <rect x="76" y="124" width="8" height="8" fill="#111827"/>
                <rect x="108" y="124" width="8" height="8" fill="#111827"/>
                <rect x="124" y="124" width="8" height="8" fill="#111827"/>
                <rect x="60" y="140" width="8" height="8" fill="#111827"/>
                <rect x="84" y="140" width="8" height="8" fill="#111827"/>
                <rect x="108" y="140" width="8" height="8" fill="#111827"/>
                <rect x="140" y="140" width="8" height="8" fill="#111827"/>
              </svg>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">Ketuk QR untuk simulasi penyelesaian pesanan (Demo)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
