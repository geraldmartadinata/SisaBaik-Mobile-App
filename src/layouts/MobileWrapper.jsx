import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function MobileWrapper({ children }) {
  const [scale, setScale] = useState(1);
  const phoneRef = useRef(null);
  const outerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const calculateScale = () => {
      // ukuran hp asli
      const TARGET_WIDTH = 430;
      const TARGET_HEIGHT = 932;
      
      // sisa layar browser
      const availableWidth = window.innerWidth - 16;
      const availableHeight = window.innerHeight - 32;
      
      // hitung rasio zoom
      const scaleW = availableWidth / TARGET_WIDTH;
      const scaleH = availableHeight / TARGET_HEIGHT;
      
      // ambil rasio terkecil
      const finalScale = Math.min(1, scaleW, scaleH);
      
      setScale(finalScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // reset scroll
  useEffect(() => {
    if (phoneRef.current) phoneRef.current.scrollTop = 0;
    if (outerRef.current) outerRef.current.scrollTop = 0;
    // reset scroll document
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    {/* bg belakang */}
    <div ref={outerRef} className="flex items-center justify-center w-full h-[100dvh] bg-gray-200 overflow-hidden">
      
      {/* layar hp */}
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

