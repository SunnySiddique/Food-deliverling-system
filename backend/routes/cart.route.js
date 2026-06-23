import express from "express";
import {
  addToCart,
  clearCart,
  decrementItemQuantity,
  getCartItems,
  incrementItemQuantity,
  removeItem,
} from "../controllers/cart.controller.js";
import authProtected from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authProtected, getCartItems);
router.post("/add", authProtected, addToCart);
router.patch("/increment", authProtected, incrementItemQuantity);
router.patch("/decrement", authProtected, decrementItemQuantity);
router.patch("/remove-cart", authProtected, removeItem);
router.delete("/clear-cart", authProtected, clearCart);

export default router;
