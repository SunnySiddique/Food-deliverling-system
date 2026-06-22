import { nanoid } from "nanoid";

export const generateOrderId = () => {
  return `ORD_${nanoid(16)}`;
};

export const generateDisplayOrderId = (count) => {
  return `#${String(count + 1).padStart(4, "0")}`;
};
