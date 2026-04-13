import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/authRoutes.js";

app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/", authRoutes);

export default app;
