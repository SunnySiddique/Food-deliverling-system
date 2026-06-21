import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import envVariables from "./config/envVariables.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.listen(envVariables.PORT, async () => {
  await connectDB();
  console.log(`Server is running on port: ${envVariables.PORT}`);
});
