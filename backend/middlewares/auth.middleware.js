import jwt from "jsonwebtoken";
import envVariables from "../config/envVariables.js";
import User from "../models/user.model.js";

const authProtected = async (req, res, next) => {
  try {
    const token = req.cookies["food-jwt"];

    if (!token)
      return res
        .status(401)
        .json({ success: true, message: "Unauthorized - No token provided" });

    const decoded = await jwt.verify(token, envVariables.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: true, message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in [authProtected] middleware", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default authProtected;
