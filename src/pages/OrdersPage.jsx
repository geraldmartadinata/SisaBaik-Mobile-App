import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNavBar from '../components/ui/BottomNavBar';
import ReviewModal from '../components/modals/ReviewModal';
import { formatCurrency } from '../utils/formatCurrency';
import { getStoreImage, getMenuImage } from '../utils/imageMapper';

export default function OrdersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeOrders, completedOrders, markOrderAsReviewed } = useApp();
  const [activeTab, setActiveTab] = useState('active');
  const [reviewOrder, setReviewOrder] = useState(null);

  useEffect(() => {
    if (location.state?.orderCompleted && location.state?.completedOrderId) {
      setActiveTab('completed');
      const orderToReview = completedOrders.find(o => o.id === location.state.completedOrderId);
      if (orderToReview && !orderToReview.isReviewed) {
        setReviewOrder(orderToReview);
      }
      // Clear state so it doesn't pop up again on refresh or re-render
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, completedOrders, navigate, location.pathname]);

  const getStatusLabel = (status) => {
    const map = {
      confirmed: 'Confirmed',
      preparing: 'Preparing',
      ready: 'Ready for Pickup',
      completed: 'Completed',
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

  const renderOrderCard = (order, isCompleted = false) => {
    // Determine the main item name (use the first item or default)
    const itemName = order.items && order.items.length > 0 ? order.items[0].name : "Surprise Bag";
    const originalPrice = order.items && order.items.length > 0 ? (order.items[0].originalPrice || order.items[0].price * 3) : (order.total * 3);

    return (
      <div
        key={order.id}
        className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-left mb-4"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="font-bold text-gray-900 text-sm">{order.storeName}</span>
          </div>
          {isCompleted ? (
            <span className="text-xs text-gray-400">{order.orderCode || `#${order.id}`}</span>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
              <span className="text-[10px] font-semibold text-gray-700">
                {order.status === 'ready' ? 'Waiting for Pickup' : 'Preparing'}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div 
          className={`flex gap-3 ${!isCompleted ? 'mb-4' : 'mb-0'} cursor-pointer active:opacity-70 transition-opacity`}
          onClick={() => navigate(`/order/${order.id}`)}
        >
          {/* Image Placeholder */}
          <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden relative">
            <img 
              src={order.items && order.items.length > 0 ? getMenuImage(order.items[0].bagId) : getStoreImage(order.storeName)} 
              alt="Food" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            {!isCompleted && <p className="text-[10px] text-gray-500 mb-0.5">Order {order.orderCode || `#${order.id}`}</p>}
            <h3 className="font-semibold text-gray-900 text-sm truncate leading-tight mb-1">
              {itemName}
            </h3>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-bold text-gray-900 text-sm">{formatCurrency(order.total)}</span>
              {!isCompleted && (
                <span className="text-xs text-gray-400 line-through">{formatCurrency(originalPrice)}</span>
              )}
            </div>
            {isCompleted && (
              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-full w-fit">
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Active Order Details */}
        {!isCompleted && (
          <>
            <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-50/50 flex items-center justify-center text-primary-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Pickup Time</p>
                <p className="text-xs font-semibold text-primary-700">Today, 19:00 - 20:00</p>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 mb-4"></div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/order/${order.id}`, { state: { showQR: true } });
              }}
              className="w-full py-2.5 rounded-xl border-2 border-primary-600 text-primary-600 text-sm font-bold hover:bg-primary-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01" />
              </svg>
              Show QR
            </button>
          </>
        )}

        {/* Completed Order Action */}
        {isCompleted && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            {order.isReviewed ? (
              <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-sm font-semibold">
                <span>{order.rating ? order.rating.toFixed(1) : '5.0'}</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => {
                    const isFilled = order.rating ? i <= order.rating : true;
                    return (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={isFilled ? "#F59E0B" : "none"} stroke={isFilled ? "#F59E0B" : "#D1D5DB"} strokeWidth="1.5">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    );
                  })}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setReviewOrder(order)}
                className="w-full py-2.5 rounded-xl bg-primary-700 text-white text-sm font-bold shadow-md shadow-primary-700/30 hover:bg-primary-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
                Leave Review
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

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
        {isCompleted ? 'No history yet' : 'No active orders'}
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
          <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
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
              Active
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
              Completed
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
          onSubmit={(rating) => markOrderAsReviewed(reviewOrder.id, rating)}
        />
      )}
    </div>
  );
}
