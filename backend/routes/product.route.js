import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import authProtected from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", authProtected, getProduct);
router.post("/create", authProtected, upload.single("image"), createProduct);

router.put(
  "/update/:productId",
  authProtected,
  upload.single("image"),
  updateProduct,
);
router.delete("/:productId", authProtected, deleteProduct);

export default router;
