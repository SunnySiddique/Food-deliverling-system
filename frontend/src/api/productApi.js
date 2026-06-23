import API from "./axiosInstance";

export const getProdcutsApi = async ({ page = 1, limit = 8 } = {}) => {
  const res = await API.get(`/products?page=${page}&limit=${limit}`);
  return res.data;
};
