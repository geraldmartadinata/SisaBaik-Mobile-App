import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

export default function PaymentSuccessModal({ order, onClose }) {
  const navigate = useNavigate();

  if (!order) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl mx-6 p-6 shadow-modal animate-bounce-in max-w-[360px] w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/30">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20,6 9,17 4,12" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 text-center">Pembayaran Berhasil!</h2>
        <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">
          Terima kasih telah menyelamatkan makanan hari ini, {order.userName || 'Gerald'}!
        </p>

        {/* Eco Impact Badge */}
        <div className="flex justify-center mt-4">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full border border-primary-100">
            <span className="text-lg">🌱</span>
            <span className="text-sm font-semibold">{order.foodSavedKg}kg food saved!</span>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-5 space-y-3 bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Order Code</span>
            <span className="font-semibold text-gray-900">{order.orderCode}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Pickup Time</span>
            <span className="font-semibold text-gray-900">{order.pickupWindow}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Paid</span>
            <span className="font-semibold text-primary-600">{formatCurrency(order.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => {
              onClose();
              navigate(`/order/${order.id}`);
            }}
            className="btn-primary"
          >
            Cek Status Pesanan →
          </button>
          <button
            onClick={() => {
              onClose();
              navigate('/home');
            }}
            className="w-full text-center text-sm font-medium text-primary-600 hover:text-primary-700 py-2 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
