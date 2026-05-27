import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BottomNavBar from '../components/ui/BottomNavBar';
import CategoryFilter from '../components/ui/CategoryFilter';
import StoreCard from '../components/ui/StoreCard';
import storesData from '../data/stores.json';

export default function HomePage() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = storesData.filter(store => {
    const matchesCategory = activeCategory === 'all' || store.category === activeCategory;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get first name for greeting
  const firstName = user?.name?.split(' ')[0] || 'User';

  return (
    <div className="page-wrapper bg-gray-50 page-transition">
      {/* Map Area (takes up most of the screen inside the phone frame) */}
      <div className="relative flex-1 bg-gradient-to-b from-green-50 to-gray-100 overflow-hidden">
        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-4 px-5">
          {/* Greeting bar */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500 font-medium">Good morning,</p>
              <h2 className="text-lg font-bold text-gray-900">{firstName}</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {firstName.charAt(0)}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-2">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Find surplus food near you..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-11 py-3 bg-white rounded-xl text-sm placeholder:text-gray-400 
                       shadow-card border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
            </button>
          </div>

          {/* Category Filter */}
          <div className="-mx-5">
            <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          </div>
        </div>

        {/* Map Visual */}
        <div className="absolute inset-0 pt-36">
          {/* Simulated map background with gradient */}
          <div className="w-full h-full relative" style={{
            background: `
              radial-gradient(ellipse at 30% 40%, rgba(22, 163, 74, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 60%, rgba(22, 163, 74, 0.05) 0%, transparent 50%),
              linear-gradient(180deg, #f0fdf4 0%, #e5e7eb 50%, #d1d5db 100%)
            `
          }}>
            {/* Map grid lines (subtle) */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#6B7280" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simulated road lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#9CA3AF" strokeWidth="3" />
              <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="70%" y1="20%" x2="70%" y2="80%" stroke="#9CA3AF" strokeWidth="2" />
              <path d="M 0 30% Q 50% 20% 100% 40%" stroke="#9CA3AF" strokeWidth="2" fill="none" />
            </svg>

            {/* Store pins on map */}
            {filteredStores.map((store, index) => {
              // Distribute pins across the map area
              const positions = [
                { left: '25%', top: '25%' },
                { left: '65%', top: '15%' },
                { left: '45%', top: '50%' },
                { left: '20%', top: '65%' },
                { left: '72%', top: '55%' },
              ];
              const pos = positions[index % positions.length];

              const cheapestBag = store.surpriseBags.reduce((min, bag) =>
                bag.discountedPrice < min.discountedPrice ? bag : min
              , store.surpriseBags[0]);

              return (
                <div
                  key={store.id}
                  className="absolute transform -translate-x-1/2 -translate-y-full animate-bounce-in"
                  style={{ left: pos.left, top: pos.top, animationDelay: `${index * 100}ms` }}
                >
                  {/* Price bubble */}
                  <div className={`
                    px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-lg whitespace-nowrap
                    ${store.isOpen
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-400 text-white'
                    }
                  `}>
                    Rp {(cheapestBag.discountedPrice / 1000).toFixed(0)}.000
                  </div>
                  {/* Pin tail */}
                  <div className="flex justify-center">
                    <div className={`w-2 h-2 rotate-45 -mt-1 ${store.isOpen ? 'bg-primary-600' : 'bg-gray-400'}`} />
                  </div>
                </div>
              );
            })}

            {/* User location indicator */}
            <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10 relative" />
                <div className="absolute -inset-3 bg-blue-500/20 rounded-full animate-ping" />
                <div className="absolute -inset-6 bg-blue-500/10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Cards Carousel - Bottom */}
      <div className="flex-none w-full bg-white border-t border-gray-100 pt-4 pb-2">
        <div className="flex w-full gap-3 overflow-x-auto no-scrollbar px-5 pb-3">
          {filteredStores.filter(s => s.isOpen).map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
          {filteredStores.filter(s => s.isOpen).length === 0 && (
            <div className="w-full text-center py-8 text-gray-400 text-sm">
              No stores found for this category
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
}
