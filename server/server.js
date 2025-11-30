import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";





dotenv.config();
const app = express();

// CORS configuration - allow frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "https://thrift-store-alpha.vercel.app",
  "https://thrift-store.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? allowedOrigins.length > 0 ? allowedOrigins : "*"
    : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());



app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("Thrift Store API is running...");
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
