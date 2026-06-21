import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { generateOrderId } from "../utils/generateOrderId.js";

const createOrder = async (req, res) => {
  try {
    const { customerId, orderItems, deliveryAddress } = req.body;

    const productIds = orderItems.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const validatedItems = orderItems.map((item) => {
      const realProduct = products.find(
        (p) => p._id.toString() === item.productId,
      );

      if (!realProduct) {
        throw new Error(`Product ${item.productId} not found`);
      }

      return {
        productId: item.productId,
        name: realProduct.name,
        price: realProduct.price,
        quantity: item.quantity,
      };
    });

    const totalAmount = validatedItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const count = await Order.countDocuments();
    const orderId = generateOrderId(count);

    const order = await Order.create({
      orderId,
      customerId,
      orderItems: validatedItems,
      totalAmount,
      deliveryAddress,
    });

    return res.status(201).json({ success: true, data: { order } });
  } catch (error) {
    console.error("Error in [createOrder] controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};

export { createOrder };
