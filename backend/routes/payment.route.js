import express from "express";
import { payhereWebhook } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/webhook", payhereWebhook);

export default router;
