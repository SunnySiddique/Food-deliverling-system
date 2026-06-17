import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import envVariables from "./config/envVariables.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(envVariables.PORT, async () => {
  await connectDB();
  console.log(`Server is running on port: ${envVariables.PORT}`);
});
