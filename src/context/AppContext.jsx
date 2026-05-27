import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

// --------------- localStorage helpers ---------------
const STORAGE_KEYS = {
  CART: 'sisabaik_cart',
  ACTIVE_ORDERS: 'sisabaik_active_orders',
  COMPLETED_ORDERS: 'sisabaik_completed_orders',
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
    // silently ignore quota errors
  }
}

// --------------- Provider ---------------
export function AppProvider({ children }) {
  // ── Cart state (the current item(s) being purchased) ──
  const [cart, setCart] = useState(() => loadFromStorage(STORAGE_KEYS.CART, { items: [], store: null }));

  // ── Orders state ──
  const [activeOrders, setActiveOrders] = useState(() => loadFromStorage(STORAGE_KEYS.ACTIVE_ORDERS, []));
  const [completedOrders, setCompletedOrders] = useState(() => loadFromStorage(STORAGE_KEYS.COMPLETED_ORDERS, []));

  // ── Seller state ──
  const [role, setRole] = useState(() => loadFromStorage('sisabaik_role', 'buyer'));
  const [listings, setListings] = useState(() => loadFromStorage('sisabaik_listings', []));

  // Persist on every change
  useEffect(() => { saveToStorage(STORAGE_KEYS.CART, cart); }, [cart]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.ACTIVE_ORDERS, activeOrders); }, [activeOrders]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.COMPLETED_ORDERS, completedOrders); }, [completedOrders]);
  useEffect(() => { saveToStorage('sisabaik_role', role); }, [role]);
  useEffect(() => { saveToStorage('sisabaik_listings', listings); }, [listings]);

  // ────────────────────── Cart helpers ──────────────────────

  const addItemToCart = useCallback((bag, storeData) => {
    setCart(prev => {
      // If adding from a different store, clear the cart first
      let currentItems = prev.items;
      if (prev.store && prev.store.id !== storeData.id) {
        currentItems = [];
      }

      const existing = currentItems.find(item => item.bagId === bag.id);
      let updatedItems;

      if (existing) {
        if (existing.quantity >= bag.maxPerOrder) return { ...prev, store: storeData };
        updatedItems = currentItems.map(item =>
          item.bagId === bag.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...currentItems,
          {
            bagId: bag.id,
            name: bag.name,
            image: bag.image,
            price: bag.discountedPrice,
            originalPrice: bag.originalPrice,
            quantity: 1,
            maxPerOrder: bag.maxPerOrder,
          },
        ];
      }

      return { items: updatedItems, store: storeData };
    });
  }, []);

  const removeItemFromCart = useCallback((bagId) => {
    setCart(prev => {
      const existing = prev.items.find(item => item.bagId === bagId);
      if (!existing) return prev;

      let updatedItems;
      if (existing.quantity > 1) {
        updatedItems = prev.items.map(item =>
          item.bagId === bagId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        updatedItems = prev.items.filter(item => item.bagId !== bagId);
      }

      return {
        items: updatedItems,
        store: updatedItems.length === 0 ? null : prev.store,
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], store: null });
  }, []);

  const getCartItemQuantity = useCallback((bagId) => {
    const item = cart.items.find(i => i.bagId === bagId);
    return item ? item.quantity : 0;
  }, [cart.items]);

  // ────────────────────── Order helpers ──────────────────────

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

    setActiveOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const completeOrder = useCallback((orderId) => {
    setActiveOrders(prev => {
      const order = prev.find(o => o.id === orderId);
      if (order) {
        const completed = { ...order, status: 'completed', completedAt: new Date().toISOString() };
        setCompletedOrders(cPrev => [completed, ...cPrev]);
      }
      return prev.filter(o => o.id !== orderId);
    });
  }, []);

  const cancelOrder = useCallback((orderId) => {
    setActiveOrders(prev => prev.filter(o => o.id !== orderId));
  }, []);

  const getOrderById = useCallback((orderId) => {
    return (
      activeOrders.find(o => o.id === orderId) ||
      completedOrders.find(o => o.id === orderId) ||
      null
    );
  }, [activeOrders, completedOrders]);

  // ────────────────────── Derived values ──────────────────────

  const PLATFORM_FEE = 2000;
  const cartTotalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotal = cartSubtotal > 0 ? cartSubtotal + PLATFORM_FEE : 0;

  // ────────────────────── Context value ──────────────────────

  const value = {
    // Cart
    cart,
    cartItems: cart.items,
    cartStore: cart.store,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    getCartItemQuantity,
    cartTotalItems,
    cartSubtotal,
    cartTotal,
    platformFee: PLATFORM_FEE,

    // Orders
    activeOrders,
    completedOrders,
    createOrder,
    completeOrder,
    cancelOrder,
    getOrderById,
    // Seller State
    role,
    setRole,
    listings,
    setListings,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// --------------- Hook ---------------
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
