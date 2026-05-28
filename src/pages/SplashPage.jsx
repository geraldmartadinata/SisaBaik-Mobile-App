import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';

export default function SplashPage() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const navTimer = setTimeout(() => navigate('/login'), 2300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`page-wrapper bg-white flex flex-col items-center justify-center relative overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Subtle leaf watermark in background */}
      <svg 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none"
        width="500" height="500" viewBox="0 0 500 500" fill="none"
      >
        {/* Large leaf shape */}
        <path d="M250 50 C 150 120, 80 250, 250 450 C 420 250, 350 120, 250 50Z" fill="#059669" />
        <path d="M250 120 C 200 180, 160 280, 250 400 C 340 280, 300 180, 250 120Z" fill="white" />
        {/* Leaf vein */}
        <line x1="250" y1="80" x2="250" y2="420" stroke="#059669" strokeWidth="4" />
        <path d="M250 180 C 220 200, 200 240, 180 260" stroke="#059669" strokeWidth="3" fill="none" />
        <path d="M250 220 C 280 240, 300 280, 320 300" stroke="#059669" strokeWidth="3" fill="none" />
        <path d="M250 280 C 220 300, 200 340, 190 360" stroke="#059669" strokeWidth="3" fill="none" />
        <path d="M250 320 C 280 340, 300 370, 310 390" stroke="#059669" strokeWidth="3" fill="none" />
      </svg>

      {/* Secondary smaller leaf, top-right */}
      <svg 
        className="absolute top-12 right-8 opacity-[0.05] pointer-events-none rotate-[-30deg]"
        width="180" height="180" viewBox="0 0 200 200" fill="none"
      >
        <path d="M100 10 C 60 50, 30 100, 100 190 C 170 100, 140 50, 100 10Z" fill="#059669" />
        <line x1="100" y1="30" x2="100" y2="170" stroke="white" strokeWidth="2" />
      </svg>

      {/* Bottom-left plant decoration */}
      <svg 
        className="absolute bottom-16 left-4 opacity-[0.06] pointer-events-none"
        width="120" height="160" viewBox="0 0 120 160" fill="none"
      >
        <path d="M60 160 L60 60" stroke="#059669" strokeWidth="3" />
        <path d="M60 100 C 30 80, 10 50, 20 20 C 40 30, 50 60, 60 80" fill="#059669" />
        <path d="M60 80 C 90 60, 110 30, 100 5 C 80 15, 70 40, 60 60" fill="#059669" />
        <path d="M60 120 C 35 105, 15 85, 25 60 C 40 70, 50 90, 60 105" fill="#059669" />
      </svg>

      {/* Center content */}
      <div className="relative z-10 text-center animate-bounce-in">
        {/* Logo from PNG */}
        <img 
          src={logoImg} 
          alt="SisaBaik Logo" 
          className="w-24 h-24 mx-auto mb-5 object-contain drop-shadow-md"
        />

        {/* Brand Name */}
        <h1 className="text-3xl font-extrabold text-primary-600 tracking-tight">SisaBaik</h1>
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-12 left-0 right-0 text-center z-10">
        <p className="text-sm text-gray-400 font-medium tracking-wide">
          <span className="border-b-2 border-primary-400 pb-0.5">Ready to rescue?</span>
        </p>
      </div>
    </div>
  );
}
