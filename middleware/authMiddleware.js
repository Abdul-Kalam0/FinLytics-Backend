import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import UserModel from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login.",
      });
    }

    //verify token
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findOne({ id: decode.id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exists",
      });
    }

    if (user.status !== "active") {
      res.status(403).json({
        success: false,
        message: "User is inactive",
      });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
