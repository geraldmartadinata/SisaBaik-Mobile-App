import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function CreateListingPage() {
  const navigate = useNavigate();
  const { setListings } = useApp();

  const [formData, setFormData] = useState({
    category: 'Bakery',
    quantity: 1,
    price: '',
    pickupTime: '19:00 - 20:30'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.price) return;

    const newListing = {
      id: `BAG-${Math.floor(1000 + Math.random() * 9000)}`,
      category: formData.category,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      pickupTime: formData.pickupTime,
      createdAt: new Date().toISOString()
    };

    setListings(prev => [newListing, ...prev]);
    navigate('/seller-dashboard', { replace: true });
  };

  return (
    <div className="page-wrapper bg-white page-transition">
      <div className="page-content">
        {/* Header */}
        <header className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-gray-100">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Buat Listing Baru</h1>
        </header>

        <main className="px-5 py-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori Makanan</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                <option value="Bakery">Bakery / Roti</option>
                <option value="Meals">Makanan Berat (Meals)</option>
                <option value="Groceries">Bahan Makanan (Groceries)</option>
                <option value="Desserts">Kue & Manisan (Desserts)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jumlah Bag (Kuantitas)</label>
              <div className="flex items-center gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                  className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-600 active:scale-95"
                >-</button>
                <div className="flex-1 text-center text-lg font-bold">{formData.quantity}</div>
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                  className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-xl font-bold text-primary-700 active:scale-95"
                >+</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Harga Diskon (Rp)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="20000"
                  className="input-field pl-12"
                  required
                  min="1000"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Berikan diskon minimal 50% dari harga asli.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Waktu Pengambilan</label>
              <input
                type="text"
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                placeholder="Contoh: 19:00 - 20:30"
                className="input-field"
                required
              />
            </div>

            <div className="pt-6">
              <button type="submit" className="btn-primary w-full shadow-lg shadow-primary-500/30">
                Terbitkan Listing
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
