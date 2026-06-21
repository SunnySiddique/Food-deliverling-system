import Cart from "../models/cart.model.js";
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

const createOrder = async (req, res) => {
  try {
    const { deliveryAddress } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate(
      "items.itemId",
      "name price imageUrl",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Build orderItems from cart — no frontend data needed
    const orderItems = cart.items.map((item) => ({
      productId: item.itemId._id,
      name: item.itemId.name,
      price: item.itemId.price,
      imageUrl: item.itemId.imageUrl,
      quantity: item.quantity,
    }));

    const totalAmount = orderItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const count = await Order.countDocuments();
    const orderId = generateOrderId(count);

    const order = await Order.create({
      orderId,
      customerId: userId,
      orderItems,
      totalAmount,
      deliveryAddress,
    });

    await Cart.findOneAndDelete({ userId });

    return res.status(201).json({ success: true, data: { order } });
  } catch (error) {
    console.error("Error in [createOrder] controller:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create order" });
  }
};

export { createOrder, getAllOrders };
