import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrder,
  getOrders,
} from "../controllers/order.controller.js";
import authProtected from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authProtected, createOrder);

// user
router.get("/user/orders", authProtected, getOrders);

router.get("/:orderId", authProtected, getOrder);
// admin
router.get("/admin/orders", authProtected, getAllOrders);

export default router;
