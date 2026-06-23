import User from "../models/auth.model.js";

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error in [getCurrentUser] controller", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error in [getUsers] controller", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { getCurrentUser, getUsers };
