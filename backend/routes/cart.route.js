import express from "express";
import {
  addToCart,
  decrementItemQuantity,
  getCartItems,
  incrementItemQuantity,
} from "../controllers/cart.controller.js";
import authProtected from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authProtected, getCartItems);
router.post("/add", authProtected, addToCart);
router.patch("/increment", authProtected, incrementItemQuantity);
router.patch("/decrement", authProtected, decrementItemQuantity);

export default router;
