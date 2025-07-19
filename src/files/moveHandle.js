import { isSameSquare, isSameColorCapture, movePiece } from "./movePieces";

export function handleDropFactory(board, setBoard) {
	return function handleDrop(e, toRow, toCol) {
		e.preventDefault();
		const fromRow = parseInt(e.dataTransfer.getData("fromRow"), 10);
		const fromCol = parseInt(e.dataTransfer.getData("fromCol"), 10);

		if (isSameSquare(fromRow, fromCol, toRow, toCol)) return;
		if (isSameColorCapture(board, fromRow, fromCol, toRow, toCol)) return;

		const updatedBoard = movePiece(board, fromRow, fromCol, toRow, toCol);
		setBoard(updatedBoard);
	};
}

export function handleDragStart(e, row, col) {
	e.dataTransfer.setData("fromRow", row);
	e.dataTransfer.setData("fromCol", col);
}

export function handleDragOver(e) {
	e.preventDefault();
}
