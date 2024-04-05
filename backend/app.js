import express from "express";
import cors from "cors";
import dotenv from "./config/dotenv.js";
import connectToDatabase from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import logRequest from "./middleware/logRequest.js";

connectToDatabase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the custom logRequest middleware
app.use(logRequest);

dotenv.config();

// Defining Routes to App
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
