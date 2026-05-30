import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import MerchantBottomNav from '../components/ui/MerchantBottomNav';
import SellerHeader from '../components/ui/SellerHeader';
import sellerProfileBg from '../assets/images/seller_profile.png';

const menuItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    label: 'Edit Store Profile',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    label: 'Bank Accounts',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    label: 'Store Notifications',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    label: 'Partner Help Center',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    label: 'App Settings',
  },
];

export default function SellerProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { setRole } = useApp();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="page-wrapper bg-gray-50 page-transition">
      <div className="page-content bg-gray-50 pb-24">
        {/* Header */}
        <SellerHeader title="Profile" />

        {/* Profile Info (Background Image) */}
        <div className="px-5 pt-6 pb-4">
          <div 
            className="w-full rounded-2xl p-5 flex flex-col justify-end items-start relative overflow-hidden shadow-md"
            style={{ 
              aspectRatio: '16/9',
              backgroundImage: `url(${sellerProfileBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white mb-2 shadow-sm">
                Group 8 Bakery
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-semibold border border-white/30">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Active Merchant
              </span>
            </div>
          </div>
        </div>

        <div className="w-full px-5 py-4 space-y-4">
          {/* Dashboard Switch */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-5 text-white shadow-lg shadow-primary-600/30">
            <h2 className="text-sm font-medium text-primary-100 mb-4 opacity-90 tracking-wide uppercase">Store Performance</h2>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-[17px] font-bold">1.25M</p>
                <p className="text-[10px] text-primary-100 mt-1">Revenue</p>
              </div>
              <div className="border-l border-primary-500/50 pl-2">
                <p className="text-[17px] font-bold">42 kg</p>
                <p className="text-[10px] text-primary-100 mt-1">Rescued</p>
              </div>
              <div className="border-l border-primary-500/50 pl-2">
                <p className="text-[17px] font-bold">4.8 <span className="text-[10px] font-normal text-amber-300">★</span></p>
                <p className="text-[10px] text-primary-100 mt-1">Rating</p>
              </div>
            </div>
          </div>

          {/* Seller Action Button */}
          <button
            onClick={() => {
              setRole('buyer');
              navigate('/profile');
            }}
            className="w-full bg-white border-2 border-primary-600 text-primary-600 font-semibold py-3.5 rounded-xl 
                       hover:bg-primary-50 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Switch to Buyer View</span>
          </button>

          {/* Menu Items */}
          <div className="card overflow-hidden">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                className={`
                  w-full flex items-center justify-between px-4 py-3.5 text-left
                  hover:bg-gray-50 active:bg-gray-100 transition-colors
                  ${index < menuItems.length - 1 ? 'border-b border-gray-50' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </button>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full text-center text-sm font-semibold text-red-500 hover:text-red-600 py-3 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <MerchantBottomNav />
    </div>
  );
}
