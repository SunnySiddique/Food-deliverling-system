import API from "./axiosInstance";

export const createOrderApi = async (deliveryAddress) => {
  const res = await API.post("/orders", { deliveryAddress });
  return res.data;
};

export const getOrderApi = async (orderId) => {
  const res = await API.get(`/orders/${orderId}`);
  return res.data;
};

export const getUserOrdersApi = async () => {
  const res = await API.get("/orders/user/orders");
  return res.data;
};
