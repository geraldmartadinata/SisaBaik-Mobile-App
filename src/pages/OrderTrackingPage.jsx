import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import OrderTimeline from '../components/ui/OrderTimeline';
import ordersData from '../data/orders.json';
import storesData from '../data/stores.json';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrderTrackingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrderById, completeOrder } = useApp();

  const location = useLocation();
  const [showQR, setShowQR] = useState(location.state?.showQR || false);

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
          <h1 className="text-lg font-bold text-gray-900">{order.status === 'completed' ? 'Order Details' : 'Order Status'}</h1>
        </div>

        {order.status === 'completed' ? (
          <div className="px-5 py-4 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Order Completed</h2>
              <p className="text-sm text-gray-500">Thank you for rescuing this food!</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-fade-in">
              <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-3">Order Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Store</span>
                <span className="text-sm font-semibold text-gray-900">{order.storeName}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Pickup Time</span>
                <span className="text-sm font-semibold text-gray-900">
                  {order.completedAt ? new Date(order.completedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : 'Completed'}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="text-sm font-semibold text-gray-900">{order.orderCode || `#${order.id}`}</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-4 mt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-900 font-bold">Total Payment</span>
                  <span className="text-sm font-bold text-primary-600">Rp {(order.total || 0).toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
                <p className="text-xs font-semibold text-primary-700">Pickup Time</p>
                <p className="text-xs text-primary-600">Today, {order.pickupWindow}</p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="card p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-5">Track Order</h3>
            <OrderTimeline timeline={order.timeline} />
          </div>

          {/* Map */}
          <div className="card overflow-hidden">
            <div className="h-64 relative">
              <MapContainer
                center={(() => {
                  const store = storesData.find(s => s.name === order.storeName);
                  return store ? [store.lat, store.lng] : [-6.223608769133971, 106.64941394052858];
                })()}
                zoom={16}
                zoomControl={false}
                scrollWheelZoom={false}
                dragging={false}
                className="w-full h-full z-0"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />

                {/* Polyline Route */}
                {storesData.find(s => s.name === order.storeName) && (
                  <Polyline 
                    positions={[
                      [-6.223608769133971, 106.64941394052858],
                      [storesData.find(s => s.name === order.storeName).lat, storesData.find(s => s.name === order.storeName).lng]
                    ]}
                    pathOptions={{ color: '#3B82F6', dashArray: '5, 10', weight: 3 }}
                  />
                )}

                {/* Merchant Pin */}
                <Marker
                  position={(() => {
                    const store = storesData.find(s => s.name === order.storeName);
                    return store ? [store.lat, store.lng] : [-6.223608769133971, 106.64941394052858];
                  })()}
                  icon={L.divIcon({
                    html: `<div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);">
                      <div style="width:36px;height:36px;background:#059669;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(5,150,105,0.4);">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="#059669"/></svg>
                      </div>
                      <div style="width:8px;height:8px;background:#059669;transform:rotate(45deg);margin-top:-5px;"></div>
                    </div>`,
                    className: '',
                    iconSize: [0, 0],
                    iconAnchor: [0, 0],
                  })}
                />

                {/* User Location */}
                <Marker
                  position={[-6.223608769133971, 106.64941394052858]}
                  icon={L.divIcon({
                    html: `<div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);">
                      <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.37258 0 0 5.37258 0 12C0 21 12 36 12 36C12 36 24 21 24 12C24 5.37258 18.6274 0 12 0Z" fill="#3B82F6"/>
                        <circle cx="12" cy="12" r="5" fill="white"/>
                      </svg>
                    </div>`,
                    className: '',
                    iconSize: [0, 0],
                    iconAnchor: [0, 0],
                  })}
                />
              </MapContainer>
            </div>
          </div>

          {/* Spacer for bottom buttons */}
          <div className="h-4" />
          </div>
        )}
      </div>

      {order.status !== 'completed' && (
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
            <span>Show QR</span>
          </button>

          {/* Secondary outline: Chat Toko */}
          <button
            onClick={() => navigate(`/chat?name=${encodeURIComponent(order.storeName)}`)}
            className="w-full py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Store Chat
          </button>
        </div>
      )}

      {/* QR Code Overlay Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-6 w-full max-w-[340px] shadow-2xl relative"
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

            <h3 className="text-xl font-bold text-center text-gray-900 mb-6">Show QR</h3>

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
              <p className="text-gray-500 text-sm">Tap QR to simulate order completion (Demo)</p>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
