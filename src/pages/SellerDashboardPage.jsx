import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getStoreImage, getMenuImage } from '../utils/imageMapper';
import SellerHeader from '../components/ui/SellerHeader';
import { motion, AnimatePresence } from 'framer-motion';
import SellerLayout from '../layouts/SellerLayout';

export default function SellerDashboardPage() {
  const navigate = useNavigate();
  const { listings } = useApp(); // We'll display active listings soon
  
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [showCloseModal, setShowCloseModal] = useState(false);

  const handleToggleShop = () => {
    if (isShopOpen) {
      setShowCloseModal(true);
    } else {
      setIsShopOpen(true);
    }
  };

  return (
    <SellerLayout>
      <div className="flex flex-col space-y-6 pb-24 bg-gray-50 min-h-screen relative page-transition">
        {/* Header */}
        <SellerHeader title="Dashboard" />

        {/* Shop Status Toggle */}
        <section className="px-5">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 border border-primary-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Store Status</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isShopOpen ? 'bg-primary-500' : 'bg-gray-400'}`}></div>
                  <p className={`text-[10px] font-medium ${isShopOpen ? 'text-primary-600' : 'text-gray-500'}`}>
                    {isShopOpen ? 'Open' : 'Closed'}
                  </p>
                </div>
              </div>
            </div>
            <div 
              onClick={handleToggleShop}
              className={`w-12 h-6 rounded-full flex items-center px-0.5 cursor-pointer shadow-inner transition-colors duration-300 ${isShopOpen ? 'bg-primary-500' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center transition-transform duration-300 ${isShopOpen ? 'transform translate-x-6' : 'transform translate-x-0'}`}>
                <div className="w-2.5 h-0.5 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-5">
          <h2 className="text-[15px] font-bold text-gray-900 mb-3">Today's Summary</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Revenue Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded flex items-center justify-center text-gray-500 border border-gray-200 bg-gray-50">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-500">Revenue</span>
              </div>
              <div>
                <p className="text-lg font-bold text-primary-600">Rp 1.250k</p>
                <p className="text-[10px] text-green-500 font-medium mt-1 flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  +12% this wk
                </p>
              </div>
            </div>

            {/* Impact Card */}
            <div className="bg-[#0f6f3b] rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <svg className="absolute -right-2 -bottom-2 w-20 h-20 text-[#14894a] opacity-50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.5c-1.5 0-4.5-1.5-6-4.5s0-7.5 3-10.5c1.5-1.5 3-4.5 3-4.5s1.5 3 3 4.5c3 3 4.5 7.5 3 10.5s-4.5 4.5-6 4.5z" />
              </svg>
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="w-5 h-5 rounded flex items-center justify-center text-white bg-white/20">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-white/90">Rescued</span>
              </div>
              <div className="relative z-10">
                <p className="text-xl font-bold text-white leading-tight">42 Kg</p>
                <p className="text-[10px] text-white/80 font-medium mt-0.5">Food</p>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Stats CSS Chart */}
        <section className="px-5">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h2 className="text-[15px] font-bold text-gray-900 mb-4">This Week's Sales</h2>
            <div className="flex items-end justify-between h-32 gap-2 mt-2">
              {[
                { day: 'Mon', val: 40 },
                { day: 'Tue', val: 65 },
                { day: 'Wed', val: 45 },
                { day: 'Thu', val: 80 },
                { day: 'Fri', val: 100 },
                { day: 'Sat', val: 60 },
                { day: 'Sun', val: 30 }
              ].map((data, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                  <div className="w-full relative h-[100px] bg-gray-50 rounded-t-sm flex items-end justify-center">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${data.val}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                      className={`w-full rounded-t-sm ${data.day === 'Jum' ? 'bg-[#0f6f3b]' : 'bg-primary-300'}`}
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded pointer-events-none">
                      {data.val}
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold ${data.day === 'Jum' ? 'text-gray-900' : 'text-gray-400'}`}>{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Listings */}
        <section className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold text-gray-900">Active Listings</h2>
            <a href="#" className="text-[10px] font-bold text-primary-600">See All</a>
          </div>
          
          <div className="space-y-3">
            {/* Active Item */}
            <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm relative overflow-hidden">
              <div className="flex gap-3">
                <div className="w-[72px] h-[72px] rounded-lg bg-gray-100 flex-shrink-0 relative">
                  <img src={getMenuImage('bag-003')} alt="Bag" className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute top-0 left-0 bg-primary-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl-lg rounded-br-lg">
                    x5
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-gray-900 text-xs">Surprise Bag - Roti</h3>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-red-50 text-red-600 rounded text-[9px] font-bold">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        20:30
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 leading-snug">Leftover sweet & plain bread today.</p>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <p className="font-bold text-primary-600 text-xs">Rp 25.000</p>
                    <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-[9px] font-medium text-gray-500 bg-gray-50">
                      2/5
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Draft Item */}
            <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm relative flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-700 text-xs">Surprise Bag - Kue Tart</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Draft • Not published</p>
              </div>
              <button className="w-6 h-6 flex items-center justify-center text-primary-600 bg-primary-50 rounded-md">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Floating Action Button */}
        <div className="px-5 mt-auto pb-4 pt-6">
          <button
            onClick={() => isShopOpen && navigate('/create-listing')}
            disabled={!isShopOpen}
            className={`w-full font-bold text-[15px] py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
              isShopOpen 
                ? 'bg-[#0f6f3b] text-white shadow-lg shadow-green-900/20 hover:bg-[#0c592f] active:scale-[0.98]' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Create Surprise Bag Listing
          </button>
          {!isShopOpen && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              Store is closed. Activate store status to create listings.
            </p>
          )}
        </div>
      </div>

      {/* Close Shop Modal */}
      <AnimatePresence>
        {showCloseModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Close Store?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to close the store now? You still have <span className="font-bold text-gray-900">5 Surprise Bags</span> in active listings.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCloseModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-gray-600 font-bold bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsShopOpen(false);
                    setShowCloseModal(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-white font-bold bg-amber-500 hover:bg-amber-600"
                >
                  Yes, Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SellerLayout>
  );
}
