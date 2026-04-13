import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB is connected");
  } catch (error) {
    console.log("❌ Error in connecting DB", error.message);
    process.exit(1);
  }
};

export default dbConnect;
