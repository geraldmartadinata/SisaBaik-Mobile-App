export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'meals', label: 'Meals' },
  { id: 'groceries', label: 'Groceries' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'healthy', label: 'Healthy' },
];

export const PAYMENT_METHODS = [
  { id: 'gopay', label: 'GoPay', color: '#00AED6' },
  { id: 'ovo', label: 'OVO', color: '#4C3494' },
  { id: 'dana', label: 'DANA', color: '#108EE9' },
];

export const PLATFORM_FEE = 2000;

export const ORDER_STATUSES = {
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
};
