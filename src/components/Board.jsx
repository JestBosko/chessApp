import React, { useState } from "react";
import "./Board.css";
import Square from "./Square";
import Piece from "./Piece";
import {
	verticalAxis,
	horizontalAxis,
	initialBoard,
} from "../files/boardSetup";
import {
	isSameSquare,
	isSameColorCapture,
	movePiece,
} from "../files/movePieces";

function Board() {
	const [board, setBoard] = useState(initialBoard);

	const handleDrop = (e, toRow, toCol) => {
		e.preventDefault();
		const fromRow = parseInt(e.dataTransfer.getData("fromRow"), 10);
		const fromCol = parseInt(e.dataTransfer.getData("fromCol"), 10);

		if (isSameSquare(fromRow, fromCol, toRow, toCol)) return;
		if (isSameColorCapture(board, fromRow, fromCol, toRow, toCol)) return;

		const updatedBoard = movePiece(board, fromRow, fromCol, toRow, toCol);
		setBoard(updatedBoard);
	};

	const handleDragOver = (e) => e.preventDefault();

	return (
		<div id="board">
			{verticalAxis.map((v, i) =>
				horizontalAxis.map((h, j) => {
					const squareColor = (i + j) % 2 === 0 ? "white" : "black";
					return (
						<Square
							key={`${i}-${j}`}
							color={squareColor}
							coordinate={`${h}${v}`}
							onDrop={(e) => handleDrop(e, i, j)}
							onDragOver={handleDragOver}
						>
							<Piece piece={board[i][j]} row={i} col={j} />
						</Square>
					);
				}),
			)}
		</div>
	);
}

export default Board;
