'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/data';

type CartItem = Product & { quantity: number };
type Order = { id: string; status: string; createdAt: string; eta: string; total: number; items: CartItem[]; customer: { name: string; phone: string; address: string } };

type AppContextValue = {
  cart: CartItem[]; favorites: string[]; orders: Order[]; cartCount: number; subtotal: number;
  addToCart: (product: Product) => void; removeFromCart: (id: string) => void; setQuantity: (id: string, q: number) => void;
  toggleFavorite: (id: string) => void; clearCart: () => void; saveOrder: (order: Order) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem('yy-cart') || '[]'));
      setFavorites(JSON.parse(localStorage.getItem('yy-favorites') || '[]'));
      setOrders(JSON.parse(localStorage.getItem('yy-orders') || '[]'));
    } catch {}
  }, []);

  useEffect(() => localStorage.setItem('yy-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('yy-favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('yy-orders', JSON.stringify(orders)), [orders]);

  const value = useMemo<AppContextValue>(() => ({
    cart,
    favorites,
    orders,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addToCart: (product) => setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    }),
    removeFromCart: (id) => setCart((current) => current.filter((item) => item.id !== id)),
    setQuantity: (id, q) => setCart((current) => q <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity: q } : item)),
    toggleFavorite: (id) => setFavorites((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]),
    clearCart: () => setCart([]),
    saveOrder: (order) => setOrders((current) => [order, ...current]),
  }), [cart, favorites, orders]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}
