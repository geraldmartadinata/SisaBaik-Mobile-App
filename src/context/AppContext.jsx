import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

// fungsi lokal storage
const STORAGE_KEYS = {
  CART: 'sisabaik_cart',
  ACTIVE_ORDERS: 'sisabaik_active_orders',
  COMPLETED_ORDERS: 'sisabaik_completed_orders',
  ROLE: 'sisabaik_role',
  LISTINGS: 'sisabaik_listings'
};

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // abaikan error kuota
  }
}

// bungkus context
export function AppProvider({ children }) {
  // data awal
  const DUMMY_ORDERS = [
    {
      id: "ORD-1234-A",
      orderCode: "#SB-1234A",
      storeName: "Tomoro Coffee",
      storeBranch: "Binus ALS",
      status: "preparing",
      createdAt: new Date().toISOString(),
      items: [{ bagId: "bag-001", name: "Coffee & Pastry Bundle", price: 20000, quantity: 1 }],
      subtotal: 20000,
      platformFee: 2000,
      total: 22000,
      foodSavedKg: "1.0",
      timeline: [
        { step: "confirmed", label: "Order Confirmed", description: "The seller has received the order.", time: "14:00", completed: true },
        { step: "preparing", label: "Preparing", description: "Food is being packed.", time: "14:15", completed: false, active: true },
        { step: "ready", label: "Ready for Pickup", description: "Show your QR code at the store.", time: null, completed: false }
      ]
    }
  ];

  // state aplikasi
  const [cart, setCart] = useState(() => loadFromStorage(STORAGE_KEYS.CART, { items: [], store: null }));
  const [activeOrders, setActiveOrders] = useState(() => {
    const stored = loadFromStorage(STORAGE_KEYS.ACTIVE_ORDERS, []);
    return stored.length > 0 ? stored : DUMMY_ORDERS;
  });
  const [completedOrders, setCompletedOrders] = useState(() => loadFromStorage(STORAGE_KEYS.COMPLETED_ORDERS, []));
  const [role, setRole] = useState(() => loadFromStorage(STORAGE_KEYS.ROLE, 'buyer'));
  const [listings, setListings] = useState(() => loadFromStorage(STORAGE_KEYS.LISTINGS, []));

  // sinkronisasi tab
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (!e.key) return; // abaikan jika kosong
      
      try {
        const newValue = e.newValue ? JSON.parse(e.newValue) : null;
        switch (e.key) {
          case STORAGE_KEYS.CART:
            if (newValue) setCart(newValue);
            break;
          case STORAGE_KEYS.ACTIVE_ORDERS:
            if (newValue) setActiveOrders(newValue);
            break;
          case STORAGE_KEYS.COMPLETED_ORDERS:
            if (newValue) setCompletedOrders(newValue);
            break;
          case STORAGE_KEYS.ROLE:
            if (newValue) setRole(newValue);
            break;
          case STORAGE_KEYS.LISTINGS:
            if (newValue) setListings(newValue);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error parsing storage change:", error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // simpan saat berubah
  useEffect(() => { saveToStorage(STORAGE_KEYS.CART, cart); }, [cart]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.ACTIVE_ORDERS, activeOrders); }, [activeOrders]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.COMPLETED_ORDERS, completedOrders); }, [completedOrders]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.ROLE, role); }, [role]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.LISTINGS, listings); }, [listings]);

  // fungsi keranjang
  const addItemToCart = useCallback((bag, storeData) => {
    setCart(prev => {
      let currentItems = prev.items;
      if (prev.store && prev.store.id !== storeData.id) currentItems = [];
      
      const existing = currentItems.find(item => item.bagId === bag.id);
      let updatedItems;

      if (existing) {
        if (existing.quantity >= bag.maxPerOrder) return { ...prev, store: storeData };
        updatedItems = currentItems.map(item => item.bagId === bag.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        updatedItems = [...currentItems, { bagId: bag.id, name: bag.name, image: bag.image, price: bag.discountedPrice, originalPrice: bag.originalPrice, quantity: 1, maxPerOrder: bag.maxPerOrder }];
      }

      return { items: updatedItems, store: storeData };
    });
  }, []);

  const removeItemFromCart = useCallback((bagId) => {
    setCart(prev => {
      const existing = prev.items.find(item => item.bagId === bagId);
      if (!existing) return prev;

      let updatedItems = existing.quantity > 1 
        ? prev.items.map(item => item.bagId === bagId ? { ...item, quantity: item.quantity - 1 } : item)
        : prev.items.filter(item => item.bagId !== bagId);

      return { items: updatedItems, store: updatedItems.length === 0 ? null : prev.store };
    });
  }, []);

  const clearCart = useCallback(() => setCart({ items: [], store: null }), []);
  const getCartItemQuantity = useCallback((bagId) => cart.items.find(i => i.bagId === bagId)?.quantity || 0, [cart.items]);

  // fungsi pesanan
  const createOrder = useCallback((orderData) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}-A`;
    const orderCode = `#SB-${Math.floor(1000 + Math.random() * 9000)}A`;

    const newOrder = {
      id: orderId,
      orderCode,
      ...orderData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      timeline: [
        { step: 'confirmed', label: 'Order Confirmed', description: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - The seller has received your order.`, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), completed: true },
        { step: 'preparing', label: 'Preparing', description: 'Food is being packed to be rescued.', time: null, completed: false, active: true },
        { step: 'ready', label: 'Ready for Pickup', description: 'Show your QR code at the store.', time: null, completed: false },
      ],
      foodSavedKg: (orderData.subtotal / 20000).toFixed(1),
    };

    setActiveOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, []);

  // update status pesanan
  const updateOrderStatus = useCallback((orderId, newStatus) => {
      setActiveOrders(prev => prev.map(o => {
          if (o.id !== orderId) return o;
          
          let updatedTimeline = [...o.timeline];
          if (newStatus === 'ready') {
              updatedTimeline = updatedTimeline.map(t => {
                  if (t.step === 'preparing') return { ...t, completed: true, active: false, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) };
                  if (t.step === 'ready') return { ...t, active: true };
                  return t;
              });
          }
          return { ...o, status: newStatus, timeline: updatedTimeline };
      }));
  }, []);

  const completeOrder = useCallback((orderId) => {
    setActiveOrders(prev => {
        const orderToComplete = prev.find(o => o.id === orderId);
        if (orderToComplete) {
            const completed = { 
                ...orderToComplete, 
                status: 'completed', 
                completedAt: new Date().toISOString(),
                timeline: orderToComplete.timeline.map(t => ({...t, completed: true, active: false, time: t.time || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}))
            };
            setCompletedOrders(oldCompleted => {
                if (oldCompleted.some(o => o.id === orderId)) return oldCompleted;
                return [completed, ...oldCompleted];
            });
        }
        return prev.filter(o => o.id !== orderId);
    });
  }, []);

  const cancelOrder = useCallback((orderId) => {
    setActiveOrders(prev => prev.filter(o => o.id !== orderId));
  }, []);

  const markOrderAsReviewed = useCallback((orderId, rating) => {
    setCompletedOrders(prev => prev.map(o => o.id === orderId ? { ...o, isReviewed: true, rating: rating } : o));
  }, []);

  const getOrderById = useCallback((orderId) => {
    return activeOrders.find(o => o.id === orderId) || completedOrders.find(o => o.id === orderId) || null;
  }, [activeOrders, completedOrders]);

  // kalkulasi harga
  const PLATFORM_FEE = 2000;
  const cartTotalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotal = cartSubtotal > 0 ? cartSubtotal + PLATFORM_FEE : 0;

  return (
    <AppContext.Provider value={{
      cart, cartItems: cart.items, cartStore: cart.store, addItemToCart, removeItemFromCart, clearCart, getCartItemQuantity, cartTotalItems, cartSubtotal, cartTotal, platformFee: PLATFORM_FEE,
      activeOrders, completedOrders, createOrder, updateOrderStatus, completeOrder, cancelOrder, markOrderAsReviewed, getOrderById,
      role, setRole, listings, setListings
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
