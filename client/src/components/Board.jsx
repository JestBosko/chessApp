import { useState } from "react";
import "../styles/Board.css";
import Square from "./Square";
import Piece from "./Piece";
import {
	verticalAxis,
	horizontalAxis,
	initialBoard,
} from "../files/boardSetup";
import {
	handleMove,
	handleDragStart,
	handleDragOver,
} from "../files/moveHandlers";

function Board() {
	const [board, setBoard] = useState(initialBoard);
	const [feedback, setFeedback] = useState("");
	const [currentColor, setCurrentColor] = useState("w"); // Track current player

	async function checkStatus(board, currentColor) {
		const response = await fetch("http://localhost:3001/api/check-status", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ board, currentColor }),
		});
		return response.json();
	}

	const handleDrop = handleMove(
		board,
		setBoard,
		setFeedback,
		currentColor,
		setCurrentColor,
		checkStatus,
	);

	return (
		<>
			{feedback && (
				<div className={`feedback-message ${feedback.type || ""}`}>
					{feedback.message || feedback}
				</div>
			)}
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
								<Piece
									piece={board[i][j]}
									row={i}
									col={j}
									onDragStart={handleDragStart}
								/>
							</Square>
						);
					}),
				)}
			</div>
			<div className="current-player">
				Current turn: {currentColor === "w" ? "White" : "Black"}
			</div>
		</>
	);
}

export default Board;
