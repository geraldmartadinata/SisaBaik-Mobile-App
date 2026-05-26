import { formatCurrency } from '../../utils/formatCurrency';

export default function ImpactDashboard({ impact, milestone }) {
  return (
    <div className="animate-fade-in">
      {/* Stats Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card">
        <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4">MY IMPACT</h3>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{impact.foodSavedKg}kg</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Food Saved</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{impact.totalOrders}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Orders</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">{formatCurrency(impact.moneySaved).replace('Rp ', '')}
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">Rp Saved</p>
          </div>
        </div>

        {/* Milestone Progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-500">
              Next Milestone: <span className="font-semibold text-gray-700">{milestone.next}</span>
            </span>
            <span className="font-semibold text-primary-600">{milestone.progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${milestone.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
