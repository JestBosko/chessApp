import express from "express";
import {
	movePiece,
	isSameSquare,
	isSameColorCapture,
} from "../logic/generalMoveLogic.js";
import { isLegalMove } from "../logic/isLegalMove.js";
import { getMoveError } from "../utils/errorHandlers.js";
import {
	isKingInCheck,
	isCheckmate,
	getLegalMovesToEscapeCheck,
} from "../logic/checkLogic.js";

const router = express.Router();

// Single endpoint for validating and making a move
router.post("/move", (req, res) => {
	const { board, fromRow, fromCol, toRow, toCol, currentColor } = req.body;
	const error = getMoveError(
		board,
		fromRow,
		fromCol,
		toRow,
		toCol,
		isSameSquare,
		isSameColorCapture,
		isLegalMove,
		currentColor,
	);
	if (error) {
		return res.status(400).json({ error });
	}
	const updatedBoard = movePiece(board, fromRow, fromCol, toRow, toCol);
	res.json({ board: updatedBoard });
});

router.post("/check-status", (req, res) => {
	const { board, currentColor } = req.body;
	const inCheck = isKingInCheck(board, currentColor);
	const checkmate = isCheckmate(board, currentColor);
	const movesToEscape = getLegalMovesToEscapeCheck(board, currentColor);
	res.json({ inCheck, checkmate, movesToEscape });
});

export default router;
