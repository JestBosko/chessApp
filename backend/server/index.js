import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Import or define your chess logic here

import { movePiece, isSameSquare, isSameColorCapture } from "./moveLogic.js";
import { isLegalMove } from "./legalMoves.js";
// Endpoint to validate a move
app.post("/api/validate-move", (req, res) => {
	const { board, fromRow, fromCol, toRow, toCol } = req.body;
	if (
		typeof fromRow !== "number" ||
		typeof fromCol !== "number" ||
		typeof toRow !== "number" ||
		typeof toCol !== "number"
	) {
		return res.status(400).json({ error: "Invalid move coordinates" });
	}
	const legal = isLegalMove(board, fromRow, fromCol, toRow, toCol);
	res.json({ legal });
});

// Example endpoint for moving a piece
app.post("/api/move", (req, res) => {
	const { board, fromRow, fromCol, toRow, toCol } = req.body;
	// Validate and move
	if (isSameSquare(fromRow, fromCol, toRow, toCol)) {
		return res.status(400).json({ error: "Cannot move to the same square" });
	}
	if (isSameColorCapture(board, fromRow, fromCol, toRow, toCol)) {
		return res.status(400).json({ error: "Cannot capture same color" });
	}
	const updatedBoard = movePiece(board, fromRow, fromCol, toRow, toCol);
	res.json({ board: updatedBoard });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
