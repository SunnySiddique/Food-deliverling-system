import crypto from "crypto";
import envVariables from "../config/envVariables.js";

export const generatePayhereHash = (merchantId, orderId, amount, currency) => {
  const merchantSecret = envVariables.PAYHERE_MERCHANT_SECRET;

  // PayHere hash formula:
  // MD5(merchant_id + order_id + amount + currency + MD5(merchant_secret).toUpperCase())
  const hashedSecret = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

  const hash = crypto
    .createHash("md5")
    .update(merchantId + orderId + amount + currency + hashedSecret)
    .digest("hex")
    .toUpperCase();

  return hash;
};
