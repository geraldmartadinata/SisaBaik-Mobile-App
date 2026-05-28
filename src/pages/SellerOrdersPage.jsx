import SellerLayout from '../layouts/SellerLayout';

export default function SellerOrdersPage() {
  return (
    <SellerLayout>
      <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <header className="px-5 pt-12 pb-4 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-900">Pesanan</h1>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 relative bg-gray-50">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200 flex-shrink-0">
              <img src="/src/assets/images/sisabaikbakery.png" alt="Merchant Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-5 pt-4 pb-2 bg-white">
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button className="flex-1 py-2.5 bg-white text-primary-600 text-xs font-bold rounded-lg shadow-sm text-center">
              Menunggu<br/>Pengambilan
            </button>
            <button className="flex-1 py-2.5 text-gray-500 text-xs font-medium rounded-lg text-center flex items-center justify-center hover:text-gray-700">
              Selesai
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="px-5 py-4 space-y-4">
          {/* Order Card 1 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[11px] text-gray-500 font-medium mb-0.5">Order #SB-9012</p>
                <h3 className="font-bold text-gray-900 text-sm">Budi Santoso</h3>
                <p className="text-[11px] text-gray-500 font-medium mt-1 flex items-center gap-1">
                  <span className="text-[12px]">🕒</span> Pengambilan: 19:00 - 20:30
                </p>
              </div>
              <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full">
                Menunggu
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-xs text-gray-600">2 Surprise Bags</p>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <button className="w-full py-3 rounded-xl bg-[#0f6f3b] text-white text-xs font-bold hover:bg-[#0c592f] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01" />
                </svg>
                Verifikasi QR / Tandai Diambil
              </button>
            </div>
          </div>

          {/* Order Card 2 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[11px] text-gray-500 font-medium mb-0.5">Order #SB-9013</p>
                <h3 className="font-bold text-gray-900 text-sm">Sarah Amelia</h3>
                <p className="text-[11px] text-gray-500 font-medium mt-1 flex items-center gap-1">
                  <span className="text-[12px]">🕒</span> Pengambilan: 19:00 - 20:30
                </p>
              </div>
              <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full">
                Menunggu
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-xs text-gray-600">1 Bakery Box</p>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <button className="w-full py-3 rounded-xl bg-[#0f6f3b] text-white text-xs font-bold hover:bg-[#0c592f] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01" />
                </svg>
                Verifikasi QR / Tandai Diambil
              </button>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}
