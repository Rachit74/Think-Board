import express from "express";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

app.use("/api/notes", notesRoutes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})