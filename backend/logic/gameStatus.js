import { isLegalMove } from "./isLegalMove.js";
import { movePiece } from "./generalMoveLogic.js";

// Check if the king of the given color is in check
export function isKingInCheck(board, color) {
	let kingRow = -1,
		kingCol = -1;
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && piece.type === "K" && piece.color === color) {
				kingRow = r;
				kingCol = c;
			}
		}
	}
	if (kingRow === -1) return false; // King not found

	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && piece.color !== color) {
				if (isLegalMove(board, r, c, kingRow, kingCol)) {
					return true;
				}
			}
		}
	}
	return false;
}

// Get all legal moves for a color (excluding moves that leave king in check)
export function getAllLegalMoves(board, color) {
	const moves = [];
	for (let fromRow = 0; fromRow < 8; fromRow++) {
		for (let fromCol = 0; fromCol < 8; fromCol++) {
			const piece = board[fromRow][fromCol];
			if (piece && piece.color === color) {
				for (let toRow = 0; toRow < 8; toRow++) {
					for (let toCol = 0; toCol < 8; toCol++) {
						if (isLegalMove(board, fromRow, fromCol, toRow, toCol)) {
							// Simulate move
							const newBoard = movePiece(board, fromRow, fromCol, toRow, toCol);
							if (!isKingInCheck(newBoard, color)) {
								moves.push({ fromRow, fromCol, toRow, toCol });
							}
						}
					}
				}
			}
		}
	}
	return moves;
}

// Get game status: "ok", "check", "checkmate", "stalemate"
export function getGameStatus(board, color) {
	const inCheck = isKingInCheck(board, color);
	const legalMoves = getAllLegalMoves(board, color);

	if (inCheck && legalMoves.length === 0) {
		return "checkmate";
	}
	if (!inCheck && legalMoves.length === 0) {
		return "stalemate";
	}
	if (inCheck) {
		return "check";
	}
	return "ok";
}
