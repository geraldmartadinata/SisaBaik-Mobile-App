import { createContext, useContext, useState } from 'react';
import { PLATFORM_FEE } from '../utils/constants';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [store, setStore] = useState(null);

  const addItem = (bag, storeData) => {
    // If adding from a different store, clear cart first
    if (store && store.id !== storeData.id) {
      setItems([]);
    }
    setStore(storeData);

    setItems(prev => {
      const existing = prev.find(item => item.bagId === bag.id);
      if (existing) {
        if (existing.quantity >= bag.maxPerOrder) return prev;
        return prev.map(item =>
          item.bagId === bag.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        bagId: bag.id,
        name: bag.name,
        image: bag.image,
        price: bag.discountedPrice,
        originalPrice: bag.originalPrice,
        quantity: 1,
        maxPerOrder: bag.maxPerOrder,
      }];
    });
  };

  const removeItem = (bagId) => {
    setItems(prev => {
      const existing = prev.find(item => item.bagId === bagId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.bagId === bagId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      const filtered = prev.filter(item => item.bagId !== bagId);
      if (filtered.length === 0) setStore(null);
      return filtered;
    });
  };

  const clearCart = () => {
    setItems([]);
    setStore(null);
  };

  const getItemQuantity = (bagId) => {
    const item = items.find(i => i.bagId === bagId);
    return item ? item.quantity : 0;
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal > 0 ? subtotal + PLATFORM_FEE : 0;

  return (
    <CartContext.Provider value={{
      items,
      store,
      addItem,
      removeItem,
      clearCart,
      getItemQuantity,
      totalItems,
      subtotal,
      total,
      platformFee: PLATFORM_FEE,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
