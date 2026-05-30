import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function RegisterMerchantPage() {
  const navigate = useNavigate();
  const { setRole } = useApp();
  const [formData, setFormData] = useState({
    storeName: '',
    category: 'Bakery',
    businessHours: '08:00 - 20:00'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.storeName) return;
    
    // simpan role seller
    setRole('seller');
    navigate('/seller-dashboard', { replace: true });
  };

  return (
    <div className="page-wrapper bg-white page-transition">
      <div className="page-content">
        {/* header */}
        <header className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-gray-100">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Daftar sebagai Penjual</h1>
        </header>

        <main className="px-5 py-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Bergabung dengan SisaBaik</h2>
            <p className="text-sm text-gray-500 mt-2">Ubah makanan berlebih Anda menjadi pendapatan dan selamatkan lingkungan.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Toko / Restoran</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                placeholder="Contoh: Toko Roti Harian"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                <option value="Bakery">Bakery</option>
                <option value="Meals">Makanan Berat (Meals)</option>
                <option value="Groceries">Bahan Makanan (Groceries)</option>
                <option value="Coffee">Kopi & Minuman (Coffee)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jam Operasional (Business Hours)</label>
              <input
                type="text"
                value={formData.businessHours}
                onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                placeholder="08:00 - 20:00"
                className="input-field"
                required
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="btn-primary w-full shadow-lg shadow-primary-500/30">
                Daftar Sekarang
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
