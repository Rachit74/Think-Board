import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();
const app = express();


connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // ← Use parentheses
});