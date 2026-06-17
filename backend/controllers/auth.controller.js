import jwt from "jsonwebtoken";
import envVariables from "../config/envVariables.js";
import User from "../models/user.model.js";
import setTokenCookie from "../utils/setCookie.js";

const signupUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      phone,
      address,
    });

    const token = jwt.sign({ userId: newUser._id }, envVariables.JWT_SECRET, {
      expiresIn: "3d",
    });

    setTokenCookie(res, token);

    res
      .status(201)
      .json({ success: true, message: "User Created successfully" });
  } catch (error) {
    console.error("Error in [signup] controller", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, envVariables.JWT_SECRET, {
      expiresIn: "3d",
    });

    setTokenCookie(res, token);

    res.status(200).json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    console.error("Error in [login] controller", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("food-jwt");
    res.status(200).json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.error("Error in [logout] controller", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { loginUser, logoutUser, signupUser };
