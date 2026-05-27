import MerchantBottomNav from '../components/ui/MerchantBottomNav';

export default function SellerLayout({ children }) {
  return (
    <div className="page-wrapper bg-gray-50 page-transition">
      <div className="page-content">
        {children}
      </div>
      <MerchantBottomNav />
    </div>
  );
}
