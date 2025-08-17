import { isKingInCheck } from "../logic/checkLogic.js";
import { movePiece } from "../logic/generalMoveLogic.js";

// Utility for move validation errors
function getMoveError(
	board,
	fromRow,
	fromCol,
	toRow,
	toCol,
	isSameSquare,
	isSameColorCapture,
	isLegalMove,
	currentColor,
) {
	if (
		typeof fromRow !== "number" ||
		typeof fromCol !== "number" ||
		typeof toRow !== "number" ||
		typeof toCol !== "number"
	) {
		return "Invalid move coordinates";
	}
	const piece = board[fromRow][fromCol];
	if (!piece) {
		return "No piece on selected square.";
	}
	if (piece.color !== currentColor) {
		return "It's not your turn!";
	}
	if (isSameSquare(fromRow, fromCol, toRow, toCol)) {
		return "Cannot move to the same square";
	}
	if (isSameColorCapture(board, fromRow, fromCol, toRow, toCol)) {
		return "Cannot capture same color";
	}
	if (isLegalMove && !isLegalMove(board, fromRow, fromCol, toRow, toCol)) {
		return "Invalid piece move";
	}

	// Block moves that leave own king in check
	const newBoard = movePiece(board, fromRow, fromCol, toRow, toCol);
	if (isKingInCheck(newBoard, currentColor)) {
		return "Move would leave king in check";
	}

	return null;
}

export { getMoveError };
