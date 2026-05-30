import { useState } from 'react';
import SellerLayout from '../layouts/SellerLayout';
import SellerHeader from '../components/ui/SellerHeader';
import { useApp } from '../context/AppContext';

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState('menunggu');
  const { activeOrders, completedOrders, completeOrder } = useApp();

  return (
    <SellerLayout>
      <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <SellerHeader title="Orders" />

        {/* Tabs */}
        <div className="px-5 pt-4 pb-2 bg-white">
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button 
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg text-center ${activeTab === 'menunggu' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 font-medium hover:text-gray-700'}`}
              onClick={() => setActiveTab('menunggu')}
            >
              Waiting for<br/>Pickup
            </button>
            <button 
              className={`flex-1 py-2.5 text-xs rounded-lg text-center flex items-center justify-center ${activeTab === 'selesai' ? 'bg-white text-primary-600 shadow-sm font-bold' : 'text-gray-500 font-medium hover:text-gray-700'}`}
              onClick={() => setActiveTab('selesai')}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="px-5 py-4 space-y-4">
          {activeTab === 'menunggu' ? (
            <>
              {activeOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[11px] text-gray-500 font-medium mb-0.5">Order {order.orderCode}</p>
                      <h3 className="font-bold text-gray-900 text-sm">{order.userName || 'Buyer'}</h3>
                      <p className="text-[11px] text-gray-500 font-medium mt-1 flex items-center gap-1">
                        <span className="text-[12px]">🕒</span> Pickup: {order.pickupWindow || '19:00 - 20:30'}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full">
                      Waiting
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <p className="text-xs text-gray-600">
                      {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || '1 Surprise Bag'}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <button 
                      onClick={() => completeOrder(order.id)}
                      className="w-full py-3 rounded-xl bg-[#0f6f3b] text-white text-xs font-bold hover:bg-[#0c592f] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01" />
                      </svg>
                      Verify QR / Mark Picked Up
                    </button>
                  </div>
                </div>
              ))}
              {activeOrders.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">No active orders</p>
                </div>
              )}
            </>
          ) : (
            <>
              {completedOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm opacity-75">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[11px] text-gray-500 font-medium mb-0.5">Order {order.orderCode}</p>
                      <h3 className="font-bold text-gray-900 text-sm">{order.userName || 'Buyer'}</h3>
                      <p className="text-[11px] text-gray-500 font-medium mt-1 flex items-center gap-1">
                        <span className="text-[12px]">🕒</span> Picked Up: {order.completedAt ? new Date(order.completedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : 'Done'}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-gray-200 text-gray-600 text-[10px] font-bold rounded-full">
                      Completed
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <p className="text-xs text-gray-600">
                      {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || '1 Surprise Bag'}
                    </p>
                  </div>
                </div>
              ))}
              {completedOrders.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">No completed orders</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SellerLayout>
  );
}
