import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNavBar from '../components/ui/BottomNavBar';
import ReviewModal from '../components/modals/ReviewModal';
import { formatCurrency } from '../utils/formatCurrency';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { activeOrders, completedOrders } = useApp();
  const [activeTab, setActiveTab] = useState('active');
  const [reviewOrder, setReviewOrder] = useState(null);

  const getStatusLabel = (status) => {
    const map = {
      confirmed: 'Dikonfirmasi',
      preparing: 'Sedang Disiapkan',
      ready: 'Siap Diambil',
      completed: 'Selesai',
    };
    return map[status] || status;
  };

  const getStatusColor = (status) => {
    const map = {
      confirmed: 'bg-blue-50 text-blue-700',
      preparing: 'bg-amber-50 text-amber-700',
      ready: 'bg-primary-50 text-primary-700',
      completed: 'bg-gray-100 text-gray-600',
    };
    return map[status] || 'bg-gray-50 text-gray-700';
  };

  const renderOrderCard = (order, isCompleted = false) => (
    <div
      key={order.id}
      className="card w-full p-4 text-left"
    >
      <button
        onClick={() => !isCompleted && navigate(`/order/${order.id}`)}
        className={`w-full text-left ${!isCompleted ? 'active:scale-[0.98] transition-transform' : ''}`}
        disabled={isCompleted}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🏪</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-[15px] truncate">
              {order.storeName}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {order.orderCode || `#${order.id}`}
            </p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${getStatusColor(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span>{isCompleted ? (order.completedAt ? new Date(order.completedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'Selesai') : `Pickup: ${order.pickupWindow}`}</span>
          </div>
          <span className={`text-sm font-bold ${isCompleted ? 'text-gray-600' : 'text-primary-600'}`}>
            {formatCurrency(order.total)}
          </span>
        </div>
      </button>

      {/* Review Button — only for completed orders */}
      {isCompleted && (
        <button
          onClick={() => setReviewOrder(order)}
          className="w-full mt-3 py-2.5 rounded-xl border-2 border-primary-200 text-primary-600 text-sm font-semibold hover:bg-primary-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          Beri Ulasan
        </button>
      )}
    </div>
  );

  const renderEmptyState = (isCompleted) => (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
          {isCompleted ? (
            <>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22,4 12,14.01 9,11.01" />
            </>
          ) : (
            <>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </>
          )}
        </svg>
      </div>
      <h3 className="font-semibold text-gray-700">
        {isCompleted ? 'Belum ada riwayat' : 'Belum ada pesanan aktif'}
      </h3>
      <p className="text-sm text-gray-400 mt-1">
        {isCompleted ? 'Completed orders will appear here' : 'Start rescuing food today!'}
      </p>
      {!isCompleted && (
        <button
          onClick={() => navigate('/home')}
          className="mt-4 text-primary-600 font-semibold text-sm hover:text-primary-700"
        >
          Explore Stores →
        </button>
      )}
    </div>
  );

  return (
    <div className="page-wrapper bg-gray-50 page-transition">
      <div className="page-content">
        {/* Header */}
        <div className="px-5 pt-6 pb-0 bg-white">
          <h1 className="text-xl font-bold text-gray-900">Pesanan Saya</h1>
          <p className="text-sm text-gray-500 mt-1">Track your food rescue orders</p>

          {/* Tab Navigation */}
          <div className="flex mt-4 border-b border-gray-100">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 pb-3 text-sm font-semibold text-center transition-all relative ${
                activeTab === 'active'
                  ? 'text-primary-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Berlangsung
              {activeOrders.length > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-bold">
                  {activeOrders.length}
                </span>
              )}
              {activeTab === 'active' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-primary-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 pb-3 text-sm font-semibold text-center transition-all relative ${
                activeTab === 'completed'
                  ? 'text-primary-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Selesai
              {completedOrders.length > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold">
                  {completedOrders.length}
                </span>
              )}
              {activeTab === 'completed' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-primary-600 rounded-full" />
              )}
            </button>
          </div>
        </div>

        <div className="px-5 py-4">
          {/* Active Orders Tab */}
          {activeTab === 'active' && (
            <div className="space-y-3 animate-fade-in">
              {activeOrders.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-soft" />
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                      {activeOrders.length} Active Order{activeOrders.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  {activeOrders.map(order => renderOrderCard(order, false))}
                </>
              ) : (
                renderEmptyState(false)
              )}
            </div>
          )}

          {/* Completed Orders Tab */}
          {activeTab === 'completed' && (
            <div className="space-y-3 animate-fade-in">
              {completedOrders.length > 0 ? (
                completedOrders.map(order => renderOrderCard(order, true))
              ) : (
                renderEmptyState(true)
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar />

      {/* Review Modal */}
      {reviewOrder && (
        <ReviewModal
          order={reviewOrder}
          onClose={() => setReviewOrder(null)}
        />
      )}
    </div>
  );
}
