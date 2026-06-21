import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const getCartItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartItems = await Cart.findOne({ userId }).populate(
      "items.itemId",
      "name price imageUrl",
    );

    if (!cartItems) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    return res.status(200).json({ success: true, data: { cartItems } });
  } catch (error) {
    console.error("Error in [getCartItems] controller:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch cart" });
  }
};
const addToCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(itemId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const cart =
      (await Cart.findOneAndUpdate(
        { userId, "items.itemId": itemId },
        { $inc: { "items.$.quantity": quantity } },
        { new: true },
      )) ??
      (await Cart.findOneAndUpdate(
        { userId },
        { $push: { items: { itemId, quantity } } },
        { new: true, upsert: true },
      ));

    return res.status(201).json({ success: true, data: { cart } });
  } catch (error) {
    console.error("Error in [addToCart] controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};

const incrementItemQuantity = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(itemId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId, "items.itemId": itemId },
      { $inc: { "items.$.quantity": 1 } },
      { new: true },
    );

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    return res.status(201).json({ success: true, data: { cart } });
  } catch (error) {
    console.error(
      "Error in [incrementItemQuantity] controller:",
      error.message,
    );
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};

const decrementItemQuantity = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId, "items.itemId": itemId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    const item = cart.items.find((i) => i.itemId.toString() === itemId);

    if (item.quantity === 1) {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { itemId } } },
        { new: true },
      );
      return res
        .status(200)
        .json({ success: true, data: { cart: updatedCart } });
    }
    const updatedCart = await Cart.findOneAndUpdate(
      { userId, "items.itemId": itemId },
      { $inc: { "items.$.quantity": -1 } },
      { new: true },
    );

    return res.status(200).json({ success: true, data: { cart: updatedCart } });
  } catch (error) {
    console.error("Error in [addToCart] controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};

export {
  addToCart,
  decrementItemQuantity,
  getCartItems,
  incrementItemQuantity,
};
