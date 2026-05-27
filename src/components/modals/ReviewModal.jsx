import { useState } from 'react';

export default function ReviewModal({ order, onClose }) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!order) return null;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl mx-6 p-6 shadow-modal animate-bounce-in max-w-[360px] w-full">
        {submitted ? (
          /* Success state */
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Terima Kasih!</h2>
            <p className="text-sm text-gray-500 mt-1">Ulasan kamu sudah dikirim</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-5">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary-50 flex items-center justify-center border-4 border-white shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Beri Ulasan</h2>
              <p className="text-sm text-gray-500 mt-1">{order.storeName}</p>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = star <= (hoveredStar || rating);
                return (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-transform duration-150 hover:scale-110 active:scale-95"
                  >
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill={isActive ? '#F59E0B' : 'none'}
                      stroke={isActive ? '#F59E0B' : '#D1D5DB'}
                      strokeWidth="1.5"
                    >
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  </button>
                );
              })}
            </div>

            {/* Rating label */}
            <div className="text-center mb-5">
              <p className="text-sm font-medium text-gray-700 h-5">
                {rating === 1 && 'Sangat Buruk'}
                {rating === 2 && 'Kurang Baik'}
                {rating === 3 && 'Cukup Baik'}
                {rating === 4 && 'Baik'}
                {rating === 5 && 'Sangat Baik!'}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className={`btn-primary ${rating === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                Kirim Ulasan
              </button>
              <button
                onClick={onClose}
                className="w-full text-center text-sm font-medium text-gray-500 hover:text-gray-700 py-2 transition-colors"
              >
                Nanti Saja
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
