import SellerLayout from '../layouts/SellerLayout';

export default function SellerOrdersPage() {
  return (
    <SellerLayout>
      <div className="px-5 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Kelola Pesanan</h1>
        
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Belum ada pesanan</h2>
          <p className="text-gray-500 text-sm">Pesanan dari pembeli akan muncul di sini.</p>
        </div>
      </div>
    </SellerLayout>
  );
}
