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
	console.log(fromRow, fromCol, toRow, toCol);
	boardCopy[fromRow][fromCol] = null;
	return boardCopy;
}
