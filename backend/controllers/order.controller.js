import Order from "../models/order.model.js";
import { generateOrderId } from "../utils/generateOrderId.js";

// user
const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ customerId: userId }).sort({
      createdAt: -1,
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    return res.status(200).json({ success: true, data: { orders } });
  } catch (error) {
    console.error("Error in [getOrders] controller:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch orders" });
  }
};

// admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("customerId", "name email")
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    return res
      .status(200)
      .json({ success: true, data: { orders, total: orders.length } });
  } catch (error) {
    console.error("Error in [getAllOrders] controller:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch orders" });
  }
};

// create order
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = req.user;

    // 1. Get the user's cart with populated product data
    const cart = await Cart.findOne({ userId }).populate(
      "items.itemId",
      "name price imageUrl",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // 2. Build order items from cart
    const orderItems = cart.items.map((item) => ({
      productId: item.itemId._id,
      name: item.itemId.name,
      price: item.itemId.price,
      imageUrl: item.itemId.imageUrl,
      quantity: item.quantity,
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const orderId = generateOrderId();
    const orderCount = await Order.countDocuments();
    const displayOrderId = generateDisplayOrderId(orderCount);

    const deliveryAddress = (
      req.body.deliveryAddress ||
      user.address ||
      ""
    ).trim();

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    const order = await Order.create({
      orderId,
      displayOrderId,
      customerId: userId,
      orderItems,
      totalAmount,
      deliveryAddress,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    // 6. Generate PayHere hash using real order data
    const merchantId = envVariables.PAYHERE_MERCHANT_ID;
    const currency = "LKR";
    const amountStr = totalAmount.toFixed(2);
    const hash = generatePayhereHash(merchantId, orderId, amountStr, currency);

    // 7. Build PayHere payment object with real customer data
    const nameParts = (user.name || "Customer").split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || " ";

    const payment = {
      sandbox: true,
      merchant_id: merchantId,
      return_url: "http://localhost:5173/confirmation",
      cancel_url: "http://localhost:5173/cart",
      notify_url: "http://localhost:4000/api/v1/payment/webhook",
      order_id: orderId,
      items: orderItems.map((i) => i.name).join(", "),
      currency,
      amount: amountStr,
      first_name: firstName,
      last_name: lastName,
      email: user.email,
      phone: user.phone || "",
      address: deliveryAddress,
      city: req.body.city || "Colombo",
      country: "Sri Lanka",
      hash,
    };

    // 8. Delete the cart — order is placed
    await Cart.findOneAndDelete({ userId });

    return res.status(201).json({
      success: true,
      data: { order, payment },
    });
  } catch (error) {
    console.error("Error in [initiatePayment]:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to initiate payment" });
  }
};

export { createOrder, getAllOrders, getOrders };
