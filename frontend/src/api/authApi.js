import API from "./axiosInstance";

export const registerApi = async (formData) => {
  const res = await API.post("/auth/register", formData);
  return res.data;
};

export const loginApi = async (formData) => {
  const res = await API.post("/auth/login", formData);

  return res.data;
};

export const logoutApi = async () => {
  const res = await API.post("/auth/logout");

  return res.data;
};
