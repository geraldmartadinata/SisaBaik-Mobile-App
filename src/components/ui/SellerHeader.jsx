import { useState } from 'react';

export default function SellerHeader({ title }) {
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy notifications
  const notifications = [
    { id: 1, text: "Order #SB-9012 waiting for pickup", time: "10 mins ago", unread: true },
    { id: 2, text: "Listing 'Surprise Bag - Bakery' sold out", time: "1 hour ago", unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="px-5 pt-12 pb-4 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="relative">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 relative bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          )}
        </button>

        {showNotifications && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
              <div className="p-3 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-sm text-gray-800">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className={`p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${notif.unread ? 'bg-blue-50/30' : ''}`}>
                    <p className="text-xs text-gray-700 leading-snug">{notif.text}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
