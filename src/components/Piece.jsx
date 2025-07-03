import React from "react";

function Piece({ piece, row, col }) {
	if (!piece) return null;

	const { color, type } = piece;

	const handleDragStart = (e) => {
		e.dataTransfer.setData("fromRow", row);
		e.dataTransfer.setData("fromCol", col);
	};

	return (
		<img
			src={`/chessPieces/${color}${type}.png`}
			alt={`${color}${type}`}
			className="piece"
			draggable
			onDragStart={handleDragStart}
		/>
	);
}

export default Piece;
