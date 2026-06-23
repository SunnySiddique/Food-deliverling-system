import { create } from "zustand";
import { logoutApi } from "../api/authApi";
import { getCurrentUserApi } from "../api/userApi";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const res = await getCurrentUserApi();
      set({ user: res.user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await logoutApi();
    set({ user: null, isAuthenticated: false });
  },
}));
