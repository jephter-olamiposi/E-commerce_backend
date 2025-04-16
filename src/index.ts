import express from "express";
import { PORT } from "./config/env";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
