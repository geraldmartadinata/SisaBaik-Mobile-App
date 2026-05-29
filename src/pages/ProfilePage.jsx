import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ImpactDashboard from '../components/ui/ImpactDashboard';
import BottomNavBar from '../components/ui/BottomNavBar';
import MerchantBottomNav from '../components/ui/MerchantBottomNav';

const menuItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    label: 'Edit Profil',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    label: 'Metode Pembayaran',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    label: 'Notifikasi',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    label: 'Bantuan & Laporan',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    label: 'Pengaturan Aplikasi',
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { role } = useApp();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="page-wrapper bg-gray-50 page-transition">
      <div className="page-content">
        {/* Profile Header */}
        <div className="w-full bg-white px-5 pt-10 pb-6 text-center">
          {/* Avatar */}
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-md">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#6B7280" stroke="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          {/* Name & Tier */}
          <h2 className="mt-4 text-lg font-bold text-gray-900">
            {user?.name || 'Gerald Martadinata'}
          </h2>
          <span className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-100">
            <span>🏆</span>
            {user?.tier || 'Food Rescuer Gold'}
          </span>
        </div>

        <div className="w-full px-5 py-4 space-y-4">
          {/* Dashboard */}
          <ImpactDashboard
            impact={user?.impact || { foodSavedKg: 12, totalOrders: 24, moneySaved: 450000 }}
            milestone={user?.milestone || { current: 'Gold', next: 'Platinum', progress: 85 }}
          />

          {/* Seller Action Button */}
          {role === 'buyer' ? (
            <button
              onClick={() => {
                setRole('seller');
                navigate('/seller-dashboard');
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3.5 rounded-xl 
                         hover:from-amber-600 hover:to-orange-600 active:scale-[0.98] transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Daftar sebagai Penjual</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/seller-dashboard')}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl 
                         hover:from-purple-700 hover:to-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                <rect x="3" y="14" width="7" height="7" rx="1"></rect>
              </svg>
              <span>Dashboard Penjual</span>
            </button>
          )}

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
      {role === 'seller' ? <MerchantBottomNav /> : <BottomNavBar />}
    </div>
  );
}
