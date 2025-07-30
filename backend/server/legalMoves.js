// Piece-specific move validation for chess pieces

export function isLegalMove(board, fromRow, fromCol, toRow, toCol) {
	const piece = board[fromRow][fromCol];
	if (!piece) return false;
	switch (piece.type) {
		case "P":
			return isLegalPawnMove(
				board,
				piece.color,
				fromRow,
				fromCol,
				toRow,
				toCol,
			);
		case "R":
			return isLegalRookMove(
				board,
				piece.color,
				fromRow,
				fromCol,
				toRow,
				toCol,
			);
		case "N":
			return isLegalKnightMove(fromRow, fromCol, toRow, toCol);
		case "B":
			return isLegalBishopMove(board, fromRow, fromCol, toRow, toCol);
		case "Q":
			return isLegalQueenMove(board, fromRow, fromCol, toRow, toCol);
		case "K":
			return isLegalKingMove(fromRow, fromCol, toRow, toCol);
		default:
			return false;
	}
}

function isLegalPawnMove(board, color, fromRow, fromCol, toRow, toCol) {
	const direction = color === "w" ? -1 : 1;
	const startRow = color === "w" ? 6 : 1;
	// Move forward
	if (fromCol === toCol) {
		if (toRow === fromRow + direction && !board[toRow][toCol]) {
			return true;
		}
		// Double move from starting position
		if (
			fromRow === startRow &&
			toRow === fromRow + 2 * direction &&
			!board[fromRow + direction][toCol] &&
			!board[toRow][toCol]
		) {
			return true;
		}
	}
	// Capture
	if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction) {
		const target = board[toRow][toCol];
		if (target && target.color !== color) {
			return true;
		}
	}
	return false;
}

function isLegalRookMove(board, color, fromRow, fromCol, toRow, toCol) {
	if (fromRow !== toRow && fromCol !== toCol) return false;
	const rowStep = fromRow === toRow ? 0 : toRow > fromRow ? 1 : -1;
	const colStep = fromCol === toCol ? 0 : toCol > fromCol ? 1 : -1;
	let r = fromRow + rowStep,
		c = fromCol + colStep;
	while (r !== toRow || c !== toCol) {
		if (board[r][c]) return false;
		r += rowStep;
		c += colStep;
	}
	const target = board[toRow][toCol];
	return !target || target.color !== color;
}

function isLegalKnightMove(fromRow, fromCol, toRow, toCol) {
	const dr = Math.abs(fromRow - toRow);
	const dc = Math.abs(fromCol - toCol);
	return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
}

function isLegalBishopMove(board, fromRow, fromCol, toRow, toCol) {
	if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;
	const rowStep = toRow > fromRow ? 1 : -1;
	const colStep = toCol > fromCol ? 1 : -1;
	let r = fromRow + rowStep,
		c = fromCol + colStep;
	while (r !== toRow && c !== toCol) {
		if (board[r][c]) return false;
		r += rowStep;
		c += colStep;
	}
	const target = board[toRow][toCol];
	return !target || target.color !== board[fromRow][fromCol].color;
}

function isLegalQueenMove(board, fromRow, fromCol, toRow, toCol) {
	// Queen moves like rook or bishop
	return (
		isLegalRookMove(
			board,
			board[fromRow][fromCol].color,
			fromRow,
			fromCol,
			toRow,
			toCol,
		) || isLegalBishopMove(board, fromRow, fromCol, toRow, toCol)
	);
}

function isLegalKingMove(fromRow, fromCol, toRow, toCol) {
	const dr = Math.abs(fromRow - toRow);
	const dc = Math.abs(fromCol - toCol);
	return dr <= 1 && dc <= 1;
}
