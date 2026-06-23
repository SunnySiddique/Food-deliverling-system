import express from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validateRequest.js";
import {
  loginValidator,
  signupValidator,
} from "../validators/userValidator.js";

const router = express.Router();

router.post("/register", signupValidator, validate, signupUser);
router.post("/login", loginValidator, validate, loginUser);
router.post("/logout", logoutUser);

export default router;
