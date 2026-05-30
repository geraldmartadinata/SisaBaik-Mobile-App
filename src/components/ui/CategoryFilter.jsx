import { CATEGORIES } from '../../utils/constants';
import useDraggableScroll from '../../hooks/useDraggableScroll';

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  const scrollRef = useDraggableScroll();
  
  return (
    <div ref={scrollRef} className="flex gap-2 overflow-x-auto no-scrollbar px-5 py-1.5 cursor-grab active:cursor-grabbing select-none">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`
            flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium
            transition-all duration-200 active:scale-95 border
            ${activeCategory === cat.id
              ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25 border-primary-600'
              : 'text-gray-700 bg-white/90 border-white/50 shadow-sm hover:bg-white'
            }
          `}
        >
          {cat.label}
        </button>
      ))}
      {/* jarak kanan */}
      <div className="w-1 shrink-0"></div>
    </div>
  );
}
