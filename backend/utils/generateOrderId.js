export const generateOrderId = (count) => {
  return `#${String(count + 1).padStart(4, "0")}`;
};
