import crypto from "crypto";
import envVariables from "../config/envVariables.js";
import Order from "../models/order.model.js";

const payhereWebhook = async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
    } = req.body;

    // ✅ Step 1 — Verify hash (CRITICAL — prevents fake webhooks!)
    const hashedSecret = crypto
      .createHash("md5")
      .update(envVariables.PAYHERE_MERCHANT_SECRET)
      .digest("hex")
      .toUpperCase();

    const localHash = crypto
      .createHash("md5")
      .update(
        merchant_id +
          order_id +
          payhere_amount +
          payhere_currency +
          status_code +
          hashedSecret,
      )
      .digest("hex")
      .toUpperCase();

    // ✅ Step 2 — If hashes don't match → fake request!
    if (localHash !== md5sig) {
      console.error("PayHere webhook hash mismatch — possible fraud!");
      return res.status(400).json({ success: false, message: "Invalid hash" });
    }

    // ✅ Step 3 — Update order based on status_code
    // PayHere status codes:
    // 2  = Success
    // 0  = Pending
    // -1 = Cancelled
    // -2 = Failed
    // -3 = Chargedback

    const statusMap = {
      2: { paymentStatus: "paid", orderStatus: "confirmed" },
      0: { paymentStatus: "pending", orderStatus: "pending" },
      "-1": { paymentStatus: "failed", orderStatus: "cancelled" },
      "-2": { paymentStatus: "failed", orderStatus: "cancelled" },
    };

    const update = statusMap[status_code];

    if (!update) {
      return res
        .status(400)
        .json({ success: false, message: "Unknown status code" });
    }

    await Order.findOneAndUpdate({ orderId: order_id }, update, { new: true });

    console.log(`Order ${order_id} updated → ${update.paymentStatus}`);

    // ✅ PayHere expects 200 OK — otherwise it retries!
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in [payhereWebhook] controller:", error.message);
    return res.status(500).send("Error");
  }
};

export { payhereWebhook };
