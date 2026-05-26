import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import OrderTimeline from '../components/ui/OrderTimeline';
import ordersData from '../data/orders.json';

export default function OrderTrackingPage() {
  const navigate = useNavigate();
  const { activeOrder: contextOrder } = useOrder();

  // Use context order if available, otherwise fallback to dummy data
  const order = contextOrder || ordersData.activeOrder;

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
            onClick={() => navigate('/home')}
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🏪</span>
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

          {/* Action Buttons */}
          <div className="space-y-3 pb-4">
            <button className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01" />
              </svg>
              <span>Tampilkan QR Code</span>
            </button>
            <button className="w-full text-center text-sm font-medium text-gray-500 hover:text-gray-700 py-2 flex items-center justify-center gap-2 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Chat Toko
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
