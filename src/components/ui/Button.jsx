export default function Button({ children, variant = 'primary', onClick, className = '', disabled = false, ...props }) {
  const variants = {
    primary: 'bg-primary-600 text-white font-semibold hover:bg-primary-700 active:scale-[0.98]',
    secondary: 'bg-white text-primary-600 font-semibold border-2 border-primary-600 hover:bg-primary-50 active:scale-[0.98]',
    outline: 'bg-transparent text-gray-600 font-medium border border-gray-200 hover:bg-gray-50',
    ghost: 'bg-transparent text-primary-600 font-medium hover:bg-primary-50',
    social: 'bg-white text-gray-700 font-medium border border-gray-200 hover:bg-gray-50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-3.5 rounded-xl transition-all duration-200
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
