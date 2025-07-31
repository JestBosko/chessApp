import { useState } from "react";
import "../styles/Board.css";
import Square from "./Square";
import Piece from "./Piece";
import {
	verticalAxis,
	horizontalAxis,
	initialBoard,
} from "../files/boardSetup";
import { handleDropFactory, handleDragOver } from "../files/moveHandlers";

function Board() {
	const [board, setBoard] = useState(initialBoard);
	const [feedback, setFeedback] = useState("");
	const handleDrop = handleDropFactory(board, setBoard, setFeedback);

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
								<Piece piece={board[i][j]} row={i} col={j} />
							</Square>
						);
					}),
				)}
			</div>
		</>
	);
}

export default Board;
