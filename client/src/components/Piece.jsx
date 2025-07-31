import { handleDragStart } from "../files/moveHandlers";

function Piece({ piece, row, col }) {
	if (!piece) return null;

	const { color, type } = piece;

	return (
		<img
			src={`/chessPieces/${color}${type}.png`}
			alt={`${color}${type}`}
			className="piece"
			draggable
			onDragStart={(e) => handleDragStart(e, row, col)}
		/>
	);
}

export default Piece;
