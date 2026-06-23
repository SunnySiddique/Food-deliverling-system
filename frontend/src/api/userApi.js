import API from "./axiosInstance";

export const getCurrentUserApi = async () => {
  const res = await API.get("/user/me");
  return res.data;
};

export const updateCurrentUserApi = async (data) => {
  const res = await API.put("/user/me", data);
  return res.data;
};

// ADMIN
export const getAllUsersApi = async () => {
  const res = await API.get("/user");
  return res.data;
};
