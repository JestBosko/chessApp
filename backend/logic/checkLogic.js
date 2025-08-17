import { isLegalMove } from "./isLegalMove.js";
import { movePiece } from "./generalMoveLogic.js";

// Find the king's position
export function findKing(board, color) {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && piece.type === "K" && piece.color === color) {
				return { row: r, col: c };
			}
		}
	}
	return null;
}

// Is the king in check?
export function isKingInCheck(board, color) {
	const kingPos = findKing(board, color);
	if (!kingPos) return false;
	const opponentColor = color === "w" ? "b" : "w";
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const piece = board[r][c];
			if (piece && piece.color === opponentColor) {
				if (isLegalMove(board, r, c, kingPos.row, kingPos.col)) {
					return true;
				}
			}
		}
	}
	return false;
}

// Get all legal moves for a player
export function getAllLegalMoves(board, color) {
	const moves = [];
	for (let fromRow = 0; fromRow < 8; fromRow++) {
		for (let fromCol = 0; fromCol < 8; fromCol++) {
			const piece = board[fromRow][fromCol];
			if (piece && piece.color === color) {
				for (let toRow = 0; toRow < 8; toRow++) {
					for (let toCol = 0; toCol < 8; toCol++) {
						if (
							(fromRow !== toRow || fromCol !== toCol) &&
							isLegalMove(board, fromRow, fromCol, toRow, toCol)
						) {
							moves.push({ fromRow, fromCol, toRow, toCol });
						}
					}
				}
			}
		}
	}
	return moves;
}

// Get all moves that escape check
export function getLegalMovesToEscapeCheck(board, color) {
	const moves = getAllLegalMoves(board, color);
	const safeMoves = [];
	for (const move of moves) {
		const newBoard = movePiece(
			board,
			move.fromRow,
			move.fromCol,
			move.toRow,
			move.toCol,
		);
		if (!isKingInCheck(newBoard, color)) {
			safeMoves.push(move);
		}
	}
	return safeMoves;
}

// Checkmate detection
export function isCheckmate(board, color) {
	return (
		isKingInCheck(board, color) &&
		getLegalMovesToEscapeCheck(board, color).length === 0
	);
}
