import express from "express";
import { getCurrentUser, getUsers } from "../controllers/user.controller.js";
import authProtected from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authProtected, getUsers);
router.get("/me", authProtected, getCurrentUser);

export default router;
