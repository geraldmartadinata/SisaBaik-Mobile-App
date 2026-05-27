import SellerLayout from '../layouts/SellerLayout';

export default function SellerOrdersPage() {
  return (
    <SellerLayout>
      <div className="px-5 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Kelola Pesanan</h1>
        
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Belum ada pesanan</h2>
          <p className="text-gray-500 text-sm">Pesanan dari pembeli akan muncul di sini.</p>
        </div>
      </div>
    </SellerLayout>
  );
}
