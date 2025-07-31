// Utility for move validation errors
function getMoveError(
	board,
	fromRow,
	fromCol,
	toRow,
	toCol,
	isSameSquare,
	isSameColorCapture,
	isLegalMove, // pass isLegalMove as a dependency
) {
	if (
		typeof fromRow !== "number" ||
		typeof fromCol !== "number" ||
		typeof toRow !== "number" ||
		typeof toCol !== "number"
	) {
		return "Invalid move coordinates";
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
	return null;
}

export { getMoveError };
