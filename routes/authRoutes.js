import express from "express";
import { login, logout, register } from "../controllers/authController.js";

const router = express.Router();

import { authLimiter } from "../middleware/rateLimiter.js";

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", authLimiter, logout);

export default router;
