import { PAYMENT_METHODS } from '../../utils/constants';

export default function PaymentMethodSelector({ selected, onSelect }) {
  return (
    <div className="flex gap-2">
      {PAYMENT_METHODS.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={`
            flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            active:scale-95
            ${selected === method.id
              ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          {method.label}
        </button>
      ))}
    </div>
  );
}
