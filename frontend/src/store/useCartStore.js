import { create } from "zustand";
import {
  addToCartApi,
  decrementItemQuantityApi,
  getCartApi,
  incrementItemQuantityApi,
  removeFromCartApi,
} from "../api/cartApi";

const useCartStore = create((set, get) => ({
  items: [],
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await getCartApi();
      const raw = res.carts?.items || [];
      const items = raw.map((i) => ({
        itemId: i.itemId._id,
        quantity: i.quantity,
        details: {
          name: i.itemId.name,
          price: i.itemId.price,
          image: i.itemId.imageUrl,
        },
      }));
      set({ items });
    } catch {
      set({ items: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (item) => {
    const prev = get().items;

    const exists = prev.find((i) => i.itemId === item.id);
    if (exists) {
      set({
        items: prev.map((i) =>
          i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      });
    } else {
      set({
        items: [...prev, { itemId: item.id, quantity: 1, details: item }],
      });
    }

    try {
      await addToCartApi(item.id, 1);
    } catch (err) {
      set({ items: prev });
      throw err;
    }
  },

  increment: async (itemId) => {
    const prev = get().items;

    set({
      items: prev.map((i) =>
        i.itemId === itemId ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    });
    try {
      await incrementItemQuantityApi(itemId);
    } catch (err) {
      set({ items: prev });
      throw err;
    }
  },

  decrement: async (itemId) => {
    const prev = get().items;
    const item = prev.find((i) => i.itemId === itemId);

    if (!item || item.quantity <= 1) return; // guard — removal is via removeItem only

    set({
      items: prev.map((i) =>
        i.itemId === itemId ? { ...i, quantity: i.quantity - 1 } : i,
      ),
    });

    try {
      await decrementItemQuantityApi(itemId);
    } catch (err) {
      set({ items: prev });
      throw err;
    }
  },

  removeItem: async (itemId) => {
    const prev = get().items;
    set({ items: prev.filter((i) => i.itemId !== itemId) });
    try {
      await removeFromCartApi(itemId);
    } catch (err) {
      set({ items: prev });
      throw err;
    }
  },

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  totalAmount: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));

export default useCartStore;
