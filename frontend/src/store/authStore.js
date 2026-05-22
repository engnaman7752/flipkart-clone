import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/api';
import useCartStore from './cartStore';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        set({
          user: res.data.user,
          token: res.data.token,
          isAuthenticated: true,
        });
        return res.data;
      },

      register: async (name, email, password) => {
        const res = await api.post('/auth/register', { name, email, password });
        set({
          user: res.data.user,
          token: res.data.token,
          isAuthenticated: true,
        });
        return res.data;
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        useCartStore.getState().clearCartLocal();
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
