import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, WishlistItem, Order, User } from '@/types';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'trackingId' | 'createdAt'>) => string;
  getOrderByTracking: (trackingId: string, mobile: string) => Order | undefined;

  // User
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const generateTrackingId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'GJF-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product, size, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id && item.size === size
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id && item.size === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, size, quantity }] };
        });
      },
      removeFromCart: (productId, size) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        }));
      },
      updateCartQuantity: (productId, size, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const state = get();
        return state.cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      getCartCount: () => {
        const state = get();
        return state.cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      addToWishlist: (product) => {
        set((state) => {
          if (state.wishlist.some((item) => item.product.id === product.id)) {
            return state;
          }
          return { wishlist: [...state.wishlist, { product }] };
        });
      },
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.product.id !== productId),
        }));
      },
      isInWishlist: (productId) => {
        const state = get();
        return state.wishlist.some((item) => item.product.id === productId);
      },

      // Orders
      orders: [],
      addOrder: (orderData) => {
        const trackingId = generateTrackingId();
        const order: Order = {
          ...orderData,
          id: crypto.randomUUID(),
          trackingId,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [...state.orders, order] }));
        return trackingId;
      },
      getOrderByTracking: (trackingId, mobile) => {
        const state = get();
        return state.orders.find(
          (order) =>
            order.trackingId.toUpperCase() === trackingId.toUpperCase() &&
            order.mobile === mobile
        );
      },

  // User
  user: null,
  login: (name, email) => {
    // Store registered user for auto-fill
    const registeredUsers = JSON.parse(localStorage.getItem('gj-registered-users') || '[]');
    const existingUser = registeredUsers.find((u: { email: string }) => u.email === email);
    if (!existingUser) {
      registeredUsers.push({ name, email });
      localStorage.setItem('gj-registered-users', JSON.stringify(registeredUsers));
    }
    set({ user: { name, email, isLoggedIn: true } });
  },
  logout: () => {
    set({ user: null });
    window.location.href = '/';
  },
    }),
    {
      name: 'gj-fashion-store',
    }
  )
);
