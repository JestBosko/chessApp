import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import moveRoutes from "../routes/move.js";
app.use("/api", moveRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
