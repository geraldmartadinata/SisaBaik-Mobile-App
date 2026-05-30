import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';

export default function CreateListingPage() {
  const navigate = useNavigate();
  const { setListings } = useApp();
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    category: 'Bakery',
    quantity: 1,
    price: '',
    pickupTime: '19:00 - 20:30'
  });

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.price) return;

    const newListing = {
      id: `BAG-${Math.floor(1000 + Math.random() * 9000)}`,
      category: formData.category,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      pickupTime: formData.pickupTime,
      createdAt: new Date().toISOString()
    };

    setListings(prev => [newListing, ...prev]);
    addToast('Listing published successfully!', 'success');
    navigate('/seller-dashboard', { replace: true });
  };

  const variants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="page-wrapper bg-white page-transition">
      <div className="page-content flex flex-col">
        {/* Header with Progress */}
        <header className="flex-none pt-5 pb-4 px-5 border-b border-gray-100 bg-white z-10 sticky top-0">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={prevStep}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
              <h1 className="text-lg font-bold text-gray-900 leading-none">Create Listing</h1>
              <p className="text-xs text-gray-500 mt-1">Step {step} of {totalSteps}</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary-500"
              initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </header>

        <main className="flex-1 px-5 py-6 overflow-x-hidden relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">What are you selling today?</h2>
                <p className="text-gray-500 text-sm mb-6">Choose the most appropriate food category.</p>
                <div className="grid grid-cols-2 gap-3">
                  {['Bakery', 'Meals', 'Groceries', 'Desserts'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setFormData({...formData, category: cat}); setTimeout(nextStep, 200); }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        formData.category === cat 
                        ? 'border-primary-500 bg-primary-50 shadow-sm shadow-primary-100' 
                        : 'border-gray-100 bg-white hover:border-gray-200'
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {cat === 'Bakery' ? '🥐' : cat === 'Meals' ? '🍱' : cat === 'Groceries' ? '🥬' : '🍰'}
                      </div>
                      <h3 className={`font-semibold ${formData.category === cat ? 'text-primary-700' : 'text-gray-700'}`}>
                        {cat === 'Bakery' ? 'Bakery' : cat === 'Meals' ? 'Heavy Meals' : cat === 'Groceries' ? 'Raw Ingredients' : 'Desserts'}
                      </h3>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">How many portions?</h2>
                <p className="text-gray-500 text-sm mb-6">Determine the number of Surprise Bag portions available.</p>
                <div className="flex items-center justify-center py-10">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                      className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-600 active:scale-95 transition-transform"
                    >-</button>
                    <div className="w-20 text-center text-5xl font-bold text-gray-900">{formData.quantity}</div>
                    <button 
                      onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                      className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary-600 active:scale-95 transition-transform shadow-md shadow-primary-500/20"
                    >+</button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">What is the discounted price?</h2>
                <p className="text-gray-500 text-sm mb-6">We recommend a 50-70% discount off the original price.</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">Rp</span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="20000"
                    autoFocus
                    className="w-full pl-14 pr-4 py-4 bg-gray-50 border-2 border-primary-200 rounded-2xl text-2xl font-bold text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">When can buyers pick up?</h2>
                <p className="text-gray-500 text-sm mb-6">Determine the pickup time window for orders at your store.</p>
                
                <div className="grid grid-cols-1 gap-3">
                  {['17:00 - 18:00', '19:00 - 20:30', '20:00 - 21:00', 'Store Closed (21:00+)'].map(time => (
                    <button
                      key={time}
                      onClick={() => setFormData({...formData, pickupTime: time})}
                      className={`p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                        formData.pickupTime === time 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-100 bg-white hover:border-gray-200'
                      }`}
                    >
                      <span className={`font-semibold ${formData.pickupTime === time ? 'text-primary-700' : 'text-gray-700'}`}>{time}</span>
                      {formData.pickupTime === time && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="flex-none p-5 border-t border-gray-100 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
          {step < totalSteps ? (
            <button 
              onClick={nextStep}
              disabled={step === 3 && !formData.price}
              className="btn-primary disabled:opacity-50 disabled:active:scale-100"
            >
              Continue
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="btn-primary shadow-lg shadow-primary-500/30"
            >
              Publish Listing
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
