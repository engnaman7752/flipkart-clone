import { create } from 'zustand';
import api from '../api/api';
import useAuthStore from './authStore';

const useCartStore = create((set, get) => ({
  cartItems: [],
  cartCount: 0,
  wishlist: [],
  toast: null,
  searchQuery: '',
  categoryFilter: '',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),

  // Fetch cart from backend
  fetchCart: async () => {
    try {
      const res = await api.get('/cart');
      const items = res.data;
      set({
        cartItems: items,
        cartCount: items.reduce((acc, i) => acc + i.quantity, 0)
      });
    } catch (err) { console.error('Failed to fetch cart', err); }
  },

  // Add to cart
  addToCart: async (productId) => {
    try {
      const isAuthenticated = useAuthStore.getState().isAuthenticated;
      if (!isAuthenticated) {
        get().showToast('Please login to add items to cart', 'error');
        return;
      }
      await api.post('/cart', { productId, quantity: 1 });
      get().fetchCart();
      set({ toast: { message: 'Added to cart!', type: 'success' } });
      setTimeout(() => set({ toast: null }), 2500);
    } catch (err) { console.error(err); }
  },

  // Update quantity
  updateQty: async (productId, quantity) => {
    try {
      await api.patch(`/cart/${productId}`, { quantity });
      get().fetchCart();
    } catch (err) { console.error(err); }
  },

  // Remove from cart
  removeFromCart: async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      get().fetchCart();
    } catch (err) { console.error(err); }
  },

  clearCartLocal: () => set({ cartItems: [], cartCount: 0 }),

  // Wishlist
  fetchWishlist: async () => {
    try {
      const res = await api.get('/wishlist');
      set({ wishlist: res.data });
    } catch (err) { console.error(err); }
  },

  toggleWishlist: async (productId) => {
    const { wishlist } = get();
    const inList = wishlist.find(w => w.product_id === productId);
    try {
      if (inList) {
        await api.delete(`/wishlist/${productId}`);
        set({ toast: { message: 'Removed from wishlist', type: 'info' } });
      } else {
        await api.post('/wishlist', { productId });
        set({ toast: { message: 'Added to wishlist!', type: 'success' } });
      }
      setTimeout(() => set({ toast: null }), 2500);
      get().fetchWishlist();
    } catch (err) { console.error(err); }
  },

  isInWishlist: (productId) => {
    return get().wishlist.some(w => w.product_id === productId);
  },

  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3000);
  },
}));

export default useCartStore;
