// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/api/health", (_req, res) => {
//   res.json({ status: "ok", message: "Study Planner API is running" });
// });

// app.use("/api/auth", authRoutes);

// export default app;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Study Planner API is running" });
});

app.use("/api/auth", authRoutes);

// All /api/tasks routes require auth
app.use("/api/tasks", authMiddleware, taskRoutes);

export default app;
