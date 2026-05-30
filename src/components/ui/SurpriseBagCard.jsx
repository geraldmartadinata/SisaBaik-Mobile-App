import { formatCurrency } from '../../utils/formatCurrency';
import { useApp } from '../../context/AppContext';
import { getMenuImage } from '../../utils/imageMapper';

export default function SurpriseBagCard({ bag, storeData }) {
  const { addItemToCart, removeItemFromCart, getCartItemQuantity } = useApp();
  const quantity = getCartItemQuantity(bag.id);
  const discountPercent = Math.round((1 - bag.discountedPrice / bag.originalPrice) * 100);

  return (
    <div className="flex gap-3.5 p-4 bg-white rounded-2xl border border-gray-100 shadow-card animate-fade-in">
      {/* gambar produk */}
      <div className="relative w-[90px] h-[90px] flex-shrink-0 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        <img src={getMenuImage(bag.id)} alt={bag.name} className="w-full h-full object-cover" />
        {/* lencana diskon */}
        <div className="absolute top-1.5 left-1.5 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
          {discountPercent}%
        </div>
      </div>

      {/* info produk */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-gray-900 text-sm leading-tight">{bag.name}</h4>
          {bag.quantityLeft <= 3 && (
            <span className="flex-shrink-0 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse-soft">
              {bag.quantityLeft} left
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{bag.description}</p>

        <div className="flex items-center justify-between mt-3">
          {/* harga */}
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-primary-600">
              {formatCurrency(bag.discountedPrice)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(bag.originalPrice)}
            </span>
          </div>

          {/* tombol jumlah */}
          <div className="flex items-center gap-1.5">
            {quantity > 0 ? (
              <>
                <button
                  onClick={() => removeItemFromCart(bag.id)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center 
                           text-gray-600 hover:bg-gray-200 active:scale-90 transition-all duration-150"
                >
                  <span className="text-sm font-bold">−</span>
                </button>
                <span className="w-6 text-center text-sm font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => addItemToCart(bag, storeData)}
                  disabled={quantity >= bag.maxPerOrder || quantity >= bag.quantityLeft}
                  className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center 
                           text-white hover:bg-primary-700 active:scale-90 transition-all duration-150
                           disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="text-sm font-bold">+</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => addItemToCart(bag, storeData)}
                disabled={bag.quantityLeft === 0}
                className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center 
                         text-white hover:bg-primary-700 active:scale-90 transition-all duration-150 shadow-md shadow-primary-600/30
                         disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
