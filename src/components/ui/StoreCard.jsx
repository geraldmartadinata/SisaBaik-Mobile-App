import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

export default function StoreCard({ store }) {
  const navigate = useNavigate();
  const cheapestBag = store.surpriseBags.reduce((min, bag) =>
    bag.discountedPrice < min.discountedPrice ? bag : min
  , store.surpriseBags[0]);

  const totalLeft = store.surpriseBags.reduce((sum, bag) => sum + bag.quantityLeft, 0);

  return (
    <div
      onClick={() => navigate(`/store/${store.id}`)}
      className="flex-shrink-0 w-[280px] bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden
                 cursor-pointer active:scale-[0.97] transition-all duration-200 hover:shadow-card-hover"
    >
      {/* Store Image */}
      <div className="relative h-[130px] bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        </div>
        {/* Urgency Badge */}
        {totalLeft <= 5 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full animate-pulse-soft">
            {totalLeft} Left
          </div>
        )}
        {/* Discount badge */}
        <div className="absolute top-3 right-3 bg-primary-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
          {Math.round((1 - cheapestBag.discountedPrice / cheapestBag.originalPrice) * 100)}% OFF
        </div>
      </div>

      {/* Store Info */}
      <div className="p-3.5">
        <h3 className="font-semibold text-gray-900 text-[15px] truncate">{store.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{store.distance}</span>
          <span className="text-gray-300 mx-1">•</span>
          <span>Pick up {store.pickupWindow}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400 line-through">{formatCurrency(cheapestBag.originalPrice)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[15px] font-bold text-primary-600">{formatCurrency(cheapestBag.discountedPrice)}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#16A34A" stroke="none">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
