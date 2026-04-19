import UserModel from "../models/User.js";

export const assignRole = async (req, res) => {
  let { email, role } = req.body;
  try {
    //input validation
    if (!email || !role) {
      return res.status(400).json({
        success: false,
        message: "Email and role are required",
      });
    }

    //validate role
    if (!["admin", "analyst", "viewer"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    email = email.toLowerCase().trim();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status === "inactive") {
      return res.status(400).json({
        success: false,
        message: "Cannot update role of inactive user",
      });
    }

    if (req.user.id === user.id) {
      return res.status(400).json({
        success: false,
        message: "You can not change your own role",
      });
    }

    if (user.role === role) {
      return res.status(400).json({
        success: false,
        message: `User is already ${role}`,
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await UserModel.findOne({ id }).select("-password");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await UserModel.findOne({ id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🚫 prevent self delete
    if (req.user.id === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    // 🚫 prevent double delete
    if (user.status === "inactive") {
      return res.status(400).json({
        success: false,
        message: "User already deleted",
      });
    }

    // 🚫 prevent deleting last admin
    if (user.role === "admin") {
      const adminCount = await UserModel.countDocuments({
        role: "admin",
        status: "active",
      });

      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete the last admin",
        });
      }
    }

    // 🟢 soft delete
    user.status = "inactive";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
