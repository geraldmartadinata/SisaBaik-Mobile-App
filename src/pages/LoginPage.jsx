import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/images/logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/home');
  };

  return (
    <div className="page-wrapper bg-white page-transition flex flex-col overflow-hidden">
      {/* Green Wave Header */}
      <div className="relative flex-none w-full">
        <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 px-5 pt-5 pb-14 relative overflow-hidden">
          {/* Wave decoration */}
          <svg className="absolute left-0 right-0 w-full" viewBox="0 0 430 40" preserveAspectRatio="none" style={{ height: '40px', bottom: '-1px' }}>
            <path d="M0 40 L0 15 Q107 0 215 15 Q322 30 430 15 L430 40 Z" fill="white" />
          </svg>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="login-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="12" cy="12" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#login-dots)" />
            </svg>
          </div>

          {/* Header bar: logo + Lewati */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="SisaBaik" className="w-8 h-8 object-contain brightness-0 invert" />
              <span className="text-white/90 font-bold text-sm tracking-tight">SisaBaik</span>
            </div>
            <button 
              onClick={() => { login('skip', 'skip'); navigate('/home'); }}
              className="text-white/90 text-sm font-semibold hover:text-white transition-colors"
            >
              Lewati
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="px-7 pt-6 pb-8 flex flex-col min-h-full">
          {/* Welcome Title */}
          <div className="mb-6">
            <h1 className="text-[30px] font-extrabold text-gray-900 leading-[1.15]">
              Selamat<br />
              <span className="text-primary-600">datang</span><br />
              kembali!
            </h1>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              Masuk untuk melanjutkan aksi baikmu menyelamatkan makanan hari ini.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex-1 flex flex-col">
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22,7-8.97,5.7a1.94,1.94 0 0 1-2.06,0L2,7" />
                  </svg>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 
                             focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Kata Sandi</label>
                  <button type="button" className="text-xs text-primary-600 font-semibold hover:text-primary-700">
                    Lupa Sandi?
                  </button>
                </div>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 
                             focus:border-transparent transition-all duration-200"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-primary-600 text-white font-bold py-4 rounded-2xl 
                         hover:bg-primary-700 active:scale-[0.98] transition-all duration-200
                         shadow-lg shadow-primary-600/25 text-[15px]"
              >
                Masuk →
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">atau masuk dengan</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social Login */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleLogin}
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl border-2 border-gray-200 
                         bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={handleLogin}
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl border-2 border-gray-200 
                         bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple
              </button>
            </div>

            {/* Register Link */}
            <div className="mt-auto pt-6 pb-2">
              <p className="text-center text-sm text-gray-500">
                Belum punya akun?{' '}
                <button type="button" className="text-primary-600 font-bold hover:text-primary-700">
                  Daftar sekarang
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
