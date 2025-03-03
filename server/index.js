import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import boardRoutes from "./routes/boardRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(boardRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});