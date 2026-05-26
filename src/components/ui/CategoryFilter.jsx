import { CATEGORIES } from '../../utils/constants';

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-5 py-2">
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
    </div>
  );
}
