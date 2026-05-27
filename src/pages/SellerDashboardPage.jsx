import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SellerLayout from '../layouts/SellerLayout';

export default function SellerDashboardPage() {
  const navigate = useNavigate();
  const { listings } = useApp(); // We'll display active listings soon

  return (
    <SellerLayout>
      <div className="flex flex-col space-y-6 pb-6">
        {/* Header */}
      <header className="px-5 pt-8">
        <h1 className="text-2xl font-bold text-gray-900">Halo, Toko Roti Makmur 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola penjualan makanan surplus Anda hari ini.</p>
      </header>

      {/* Stats Section */}
      <section className="px-5">
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-5 text-white shadow-lg shadow-primary-600/30">
          <h2 className="text-sm font-medium text-primary-100 mb-4 opacity-90 tracking-wide uppercase">Kinerja Toko</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold">Rp 450.000</p>
              <p className="text-xs text-primary-100 mt-1">Penjualan Minggu Ini</p>
            </div>
            <div className="border-l border-primary-500/50 pl-4">
              <p className="text-2xl font-bold">12 <span className="text-lg">kg</span></p>
              <p className="text-xs text-primary-100 mt-1">Makanan Diselamatkan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-5">
        <button
          onClick={() => navigate('/create-listing')}
          className="w-full bg-primary-600 text-white font-bold text-lg py-4 rounded-xl 
                     shadow-lg shadow-primary-500/30 hover:bg-primary-700 active:scale-[0.98] 
                     transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Buat Listing Surprise Bag
        </button>
      </section>

      {/* Active Listings Preview (Optional bonus) */}
      <section className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">Listing Aktif Anda</h2>
        </div>
        
        {listings.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🛍️</span>
            </div>
            <p className="text-gray-500 text-sm">Belum ada listing aktif saat ini.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map(item => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.category} Bag</h3>
                  <p className="text-xs text-gray-500 mt-1">Sisa: {item.quantity} • {item.pickupTime}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
    </SellerLayout>
  );
}
