import { create } from "zustand";
import {
  addToCartApi,
  clearCartApi,
  decrementItemQuantityApi,
  getCartApi,
  incrementItemQuantityApi,
  removeFromCartApi,
} from "../api/cartApi";
import { showToast } from "../utils/toast";

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
      // showToast.error("Failed to load cart", "Please try again later");
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
      showToast.success("Quantity increased", `${item.name} +1`);
    } else {
      set({
        items: [...prev, { itemId: item.id, quantity: 1, details: item }],
      });
      showToast.success("Added to cart 🛒", `${item.name} added.`);
    }

    try {
      await addToCartApi(item.id, 1);
    } catch (err) {
      set({ items: prev });
      showToast.error(
        "Failed to add item",
        err?.message || "Something went wrong",
      );
      throw err;
    }
  },

  increment: async (itemId) => {
    const prev = get().items;
    const item = prev.find((i) => i.itemId === itemId);

    set({
      items: prev.map((i) =>
        i.itemId === itemId ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    });

    showToast.success(
      "Quantity increased",
      `${item?.details?.name || "Item"} +1`,
    );

    try {
      await incrementItemQuantityApi(itemId);
    } catch (err) {
      set({ items: prev });
      showToast.error(
        "Failed to increase quantity",
        err?.message || "Something went wrong",
      );
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

    showToast.info("Quantity decreased", `${item?.details?.name || "Item"} -1`);

    try {
      await decrementItemQuantityApi(itemId);
    } catch (err) {
      set({ items: prev });
      showToast.error(
        "Failed to decrease quantity",
        err?.message || "Something went wrong",
      );
      throw err;
    }
  },

  removeItem: async (itemId) => {
    const prev = get().items;
    const item = prev.find((i) => i.itemId === itemId);

    set({ items: prev.filter((i) => i.itemId !== itemId) });

    showToast.success(
      "Removed from cart",
      `${item?.details?.name || "Item"} removed.`,
    );

    try {
      await removeFromCartApi(itemId);
    } catch (err) {
      set({ items: prev });
      showToast.error(
        "Failed to remove item",
        err?.message || "Something went wrong",
      );
      throw err;
    }
  },

  resetCart: () => set({ items: [] }),

  clearCart: async () => {
    const prev = get().items;
    set({ items: [] });

    showToast.success("Cart cleared", "All items have been removed.");

    try {
      await clearCartApi();
    } catch (err) {
      set({ items: prev });
      showToast.error(
        "Failed to remove item",
        err?.message || "Something went wrong",
      );
      throw err;
    }
  },

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  totalAmount: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));

export default useCartStore;
