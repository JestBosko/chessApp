export function isSameSquare(fromRow, fromCol, toRow, toCol) {
	return fromRow === toRow && fromCol === toCol;
}

export function isSameColorCapture(board, fromRow, fromCol, toRow, toCol) {
	const movingPiece = board[fromRow][fromCol];
	const targetPiece = board[toRow][toCol];
	return targetPiece && targetPiece.color === movingPiece.color;
}

export function movePiece(board, fromRow, fromCol, toRow, toCol) {
	const boardCopy = board.map((row) => [...row]);
	boardCopy[toRow][toCol] = boardCopy[fromRow][fromCol];
	boardCopy[fromRow][fromCol] = null;
	return boardCopy;
}


// Import piece-specific move validation from legalMoves.js
import { isLegalMove } from './legalMoves.js';
