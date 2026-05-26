export default function Badge({ children, variant = 'green', className = '' }) {
  const variants = {
    green: 'bg-primary-100 text-primary-700',
    urgency: 'bg-red-600 text-white',
    open: 'bg-primary-600 text-white',
    category: 'bg-gray-100 text-gray-600',
    'category-active': 'bg-primary-600 text-white',
    info: 'bg-blue-50 text-blue-700',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
