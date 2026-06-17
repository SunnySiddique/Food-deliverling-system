import { mongoose } from "mongoose";
import envVariables from "./envVariables.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envVariables.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
