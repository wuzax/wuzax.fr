import cors from "cors";
import express from "express";
import { connectDB } from "./db/connect.js";
import { createDefaultUser } from "./db/seed.js";
import authRoutes from "./routes/auth.js";
import { projectRoutes } from "./routes/projects.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

// Connect to database and start server
connectDB().then(async () => {
  await createDefaultUser();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
