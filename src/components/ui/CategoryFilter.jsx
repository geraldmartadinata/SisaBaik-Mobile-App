import { CATEGORIES } from '../../utils/constants';
import useDraggableScroll from '../../hooks/useDraggableScroll';

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  const scrollRef = useDraggableScroll();
  
  return (
    <div ref={scrollRef} className="flex gap-2 overflow-x-auto no-scrollbar px-5 py-2 cursor-grab active:cursor-grabbing select-none">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`
            flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium
            transition-all duration-200 active:scale-95
            ${activeCategory === cat.id
              ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          {cat.label}
        </button>
      ))}
      {/* Spacer for right padding */}
      <div className="w-1 shrink-0"></div>
    </div>
  );
}
