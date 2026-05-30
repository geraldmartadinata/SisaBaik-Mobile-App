import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function MobileWrapper({ children }) {
  const [scale, setScale] = useState(1);
  const phoneRef = useRef(null);
  const outerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const calculateScale = () => {
      // The physical dimensions of our "perfect" phone simulator
      const TARGET_WIDTH = 430;
      const TARGET_HEIGHT = 932;
      
      // The available browser window space (with a little padding)
      const availableWidth = window.innerWidth - 16;
      const availableHeight = window.innerHeight - 32;
      
      // Calculate how much we need to scale down to fit
      const scaleW = availableWidth / TARGET_WIDTH;
      const scaleH = availableHeight / TARGET_HEIGHT;
      
      // We only scale DOWN (min 1). If the screen is huge, it stays at 1.
      // We pick the smallest scale factor to ensure both width and height fit on screen.
      const finalScale = Math.min(1, scaleW, scaleH);
      
      setScale(finalScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // GLOBAL SCROLL RESET: On every route change, forcefully reset scroll position
  // of both the phone container and the outer wrapper. This prevents any page
  // (chat, modals, etc.) from permanently shifting the phone frame.
  useEffect(() => {
    if (phoneRef.current) phoneRef.current.scrollTop = 0;
    if (outerRef.current) outerRef.current.scrollTop = 0;
    // Also reset window scroll in case anything bubbled to document level
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    // The Global Desktop Background
    <div ref={outerRef} className="flex items-center justify-center w-full h-[100dvh] bg-gray-200 overflow-hidden">
      
      {/* 
          The True Phone Simulator
          Instead of relying on Tailwind flexbox to squish the layout (which causes the 
          "zoomed in" broken layout), we render the app at EXACTLY 430x932 pixels so all 
          the internal Tailwind sizes (p-4, text-sm, etc) match the Vercel design perfectly.
          
          Then, we use CSS transform: scale() to dynamically shrink the rendered output 
          so it perfectly fits in the user's browser window without scrolling.
      */}
      <div 
        ref={phoneRef}
        className="relative bg-gray-50 rounded-[40px] shadow-2xl overflow-hidden flex flex-col shrink-0"
        style={{
          width: '430px',
          height: '932px',
          border: '8px solid #1f2937',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {children}
      </div>
    </div>
  );
}

