import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BottomNavBar from '../components/ui/BottomNavBar';
import CategoryFilter from '../components/ui/CategoryFilter';
import StoreCard from '../components/ui/StoreCard';
import useDraggableScroll from '../hooks/useDraggableScroll';
import storesData from '../data/stores.json';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function HomePage() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useDraggableScroll();

  const filteredStores = storesData.filter(store => {
    const matchesCategory = activeCategory === 'all' || store.category === activeCategory;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get first name for greeting
  const firstName = user?.name?.split(' ')[0] || 'User';

  // Map center (Binus Alam Sutera)
  const mapCenter = [-6.223608769133971, 106.64941394052858];

  // Helper to create a custom HTML icon for Leaflet
  const createCustomIcon = (price, isOpen) => {
    const color = isOpen ? 'bg-primary-600' : 'bg-gray-400';
    const htmlString = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translate(-50%, -100%);">
        <div class="px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-lg whitespace-nowrap text-white ${color}">
          Rp ${(price / 1000).toFixed(0)}.000
        </div>
        <div class="w-2 h-2 rotate-45 -mt-1 ${color}"></div>
      </div>
    `;
    return L.divIcon({
      html: htmlString,
      className: '',
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  };



  return (
    <div className="page-wrapper bg-gray-50 page-transition">
      
      {/* Map Area (Top Half) */}
      <div className="relative flex-1 bg-gray-100 overflow-hidden z-0">
        
        {/* Floating Header overlay */}
        <div className="absolute top-0 left-0 right-0 z-[1000] pt-4 px-5 pointer-events-none">
          <div className="pointer-events-auto">
            {/* Greeting bar */}
            <div className="flex items-center justify-between mb-3 drop-shadow-md">
              <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40">
                <p className="text-xs text-gray-500 font-medium">Good morning,</p>
                <h2 className="text-sm font-bold text-gray-900">{firstName}</h2>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md">
                {firstName.charAt(0)}
              </div>
            </div>

            {/* Search bar */}
            <div className="relative mb-3 rounded-2xl overflow-hidden glass shadow-lg border border-white/40">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Find surplus food near you..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-transparent text-sm placeholder:text-gray-500 text-gray-900 focus:outline-none font-medium"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          </div>
        </div>

        {/* Real Map */}
        <MapContainer 
          center={mapCenter} 
          zoom={16} 
          zoomControl={false}
          className="w-full h-full z-0"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredStores.map((store, index) => {
            const cheapestBag = store.surpriseBags.reduce((min, bag) =>
              bag.discountedPrice < min.discountedPrice ? bag : min
            , store.surpriseBags[0]);

            return (
              <Marker 
                key={store.id} 
                position={[store.lat, store.lng]}
                icon={createCustomIcon(cheapestBag.discountedPrice, store.isOpen)}
              >
                <Popup className="rounded-xl overflow-hidden">
                  <div className="text-center font-semibold text-gray-900">{store.name}</div>
                  <div className="text-xs text-gray-500">{store.category}</div>
                </Popup>
              </Marker>
            );
          })}

          {/* User Location */}
          <Marker
            position={mapCenter}
            icon={L.divIcon({
              html: `<div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);">
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37258 0 0 5.37258 0 12C0 21 12 36 12 36C12 36 24 21 24 12C24 5.37258 18.6274 0 12 0Z" fill="#3B82F6"/>
                  <circle cx="12" cy="12" r="5" fill="white"/>
                </svg>
              </div>`,
              className: '',
              iconSize: [0, 0],
              iconAnchor: [0, 0],
            })}
          />
        </MapContainer>

        {/* Bottom Sheet anchored section (Fixed, floating at bottom of map) */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-10 pt-5">
          
          {/* Category Filter */}
          <div className="mb-4">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>

        {/* Store Cards Carousel */}
        <div ref={scrollRef} className="flex w-full gap-3 overflow-x-auto no-scrollbar px-5 pb-5 cursor-grab active:cursor-grabbing select-none flex-nowrap">
          {filteredStores.filter(s => s.isOpen).map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
          {filteredStores.filter(s => s.isOpen).length === 0 && (
            <div className="w-full text-center py-8 text-gray-400 text-sm">
              Tidak ada toko yang buka.
            </div>
          )}
          {/* Spacer for right padding in flex row */}
          <div className="w-2 shrink-0"></div>
        </div>
      </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
}
