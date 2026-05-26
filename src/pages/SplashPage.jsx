import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className={`page-wrapper bg-white flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center animate-bounce-in">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto mb-6 bg-primary-50 rounded-3xl flex items-center justify-center shadow-lg shadow-primary-600/10">
          <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
            {/* Shopping bag body */}
            <rect x="12" y="22" width="40" height="36" rx="6" fill="#16A34A" />
            {/* Bag handles */}
            <path d="M22 22V16a10 10 0 0 1 20 0v6" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Leaf icon inside */}
            <path d="M32 34c-4 0-8 4-8 8s4 8 8 8c2 0 4-1 5.5-2.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M32 34c4 0 8 4 8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <line x1="32" y1="34" x2="32" y2="46" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-bold text-primary-600 tracking-tight">SisaBaik</h1>

        {/* Loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-400 mt-6 font-medium">Ready to rescue?</p>
      </div>
    </div>
  );
}
