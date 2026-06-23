import express from "express";
import {
  getCurrentUser,
  getUsers,
  updateProfile,
} from "../controllers/user.controller.js";
import authProtected from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authProtected, getUsers);
router.get("/me", authProtected, getCurrentUser);
router.put("/me", authProtected, updateProfile);

export default router;
