import API from "./axiosInstance";

export const getCartApi = async () => {
  const res = await API.get("/cart");
  console.log("res:", res.data);
  return res.data;
};

export const addToCartApi = async (itemId, quantity) => {
  const res = await API.post("/cart/add", { itemId, quantity });
  return res.data;
};

export const incrementItemQuantityApi = async (itemId) => {
  const res = await API.patch("/cart/increment", { itemId });
  return res.data;
};

export const decrementItemQuantityApi = async (itemId) => {
  const res = await API.patch("/cart/decrement", { itemId });
  return res.data;
};

export const removeFromCartApi = async (itemId) => {
  const res = await API.patch("/cart/remove-cart", { itemId });
  return res.data;
};

export const clearCartApi = async () => {
  const res = await API.delete("/cart/clear-cart");
  return res.data;
};
