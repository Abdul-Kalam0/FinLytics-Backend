import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: " Name, email and password are required",
      });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invaid email",
      });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and special character and length should be more than 6",
      });
    }

    //check for duplicacy
    email = email.toLowerCase().trim();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist",
      });
    }

    

    const newUser = await UserModel.create({
      name: name,
      email: email,
      password: passwordHash,
    });
  } catch (error) {}
};

export const login = async (req, res) => {};

export const logout = async (req, res) => {};
