import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import BottomNavBar from '../components/ui/BottomNavBar';
import { formatCurrency } from '../utils/formatCurrency';
import ordersData from '../data/orders.json';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { activeOrder: contextOrder } = useOrder();

  // Use context order if available, otherwise show dummy data
  const activeOrder = contextOrder || ordersData.activeOrder;

  const getStatusLabel = (status) => {
    const map = {
      confirmed: 'Dikonfirmasi',
      preparing: 'Sedang Disiapkan',
      ready: 'Siap Diambil',
    };
    return map[status] || status;
  };

  const getStatusColor = (status) => {
    const map = {
      confirmed: 'bg-blue-50 text-blue-700',
      preparing: 'bg-amber-50 text-amber-700',
      ready: 'bg-primary-50 text-primary-700',
    };
    return map[status] || 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="page-wrapper bg-gray-50 page-transition">
      <div className="page-content">
        {/* Header */}
        <div className="px-5 pt-6 pb-4 bg-white">
          <h1 className="text-xl font-bold text-gray-900">Pesanan Saya</h1>
          <p className="text-sm text-gray-500 mt-1">Track your food rescue orders</p>
        </div>

        <div className="px-5 py-4">
          {activeOrder ? (
            <div className="space-y-3">
              {/* Active Order Label */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-soft" />
                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Active Order</span>
              </div>

              {/* Order Card */}
              <button
                onClick={() => navigate(`/order/${activeOrder.id}`)}
                className="card w-full p-4 text-left active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏪</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-[15px] truncate">
                      {activeOrder.storeName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {activeOrder.orderCode || `#${activeOrder.id}`}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(activeOrder.status)}`}>
                    {getStatusLabel(activeOrder.status)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                    <span>Pickup: {activeOrder.pickupWindow}</span>
                  </div>
                  <span className="text-sm font-bold text-primary-600">
                    {formatCurrency(activeOrder.total)}
                  </span>
                </div>
              </button>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-700">Belum ada pesanan</h3>
              <p className="text-sm text-gray-400 mt-1">Start rescuing food today!</p>
              <button
                onClick={() => navigate('/home')}
                className="mt-4 text-primary-600 font-semibold text-sm hover:text-primary-700"
              >
                Explore Stores →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
}
