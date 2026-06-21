import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import authProtected from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authProtected, createOrder);

export default router;
