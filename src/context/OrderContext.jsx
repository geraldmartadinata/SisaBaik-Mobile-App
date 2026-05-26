import { createContext, useContext, useState } from 'react';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [activeOrder, setActiveOrder] = useState(null);

  const createOrder = (orderData) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}-A`;
    const orderCode = `#SB-${Math.floor(1000 + Math.random() * 9000)}A`;

    const newOrder = {
      id: orderId,
      orderCode,
      ...orderData,
      status: 'confirmed',
      timeline: [
        {
          step: 'confirmed',
          label: 'Pesanan Dikonfirmasi',
          description: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - Penjual telah menerima pesanan Anda.`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          completed: true,
        },
        {
          step: 'preparing',
          label: 'Sedang Disiapkan',
          description: 'Makanan sedang dikemas untuk diselamatkan.',
          time: null,
          completed: false,
          active: true,
        },
        {
          step: 'ready',
          label: 'Siap Diambil',
          description: 'Tunjukkan QR code saat tiba di toko.',
          time: null,
          completed: false,
        },
      ],
      foodSavedKg: (orderData.subtotal / 20000).toFixed(1),
    };

    setActiveOrder(newOrder);
    return newOrder;
  };

  const clearOrder = () => {
    setActiveOrder(null);
  };

  return (
    <OrderContext.Provider value={{ activeOrder, createOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
