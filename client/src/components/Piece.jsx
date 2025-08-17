function Piece({ piece, row, col, onDragStart }) {
	if (!piece) return null;

	const { color, type } = piece;

	return (
		<img
			src={`/chessPieces/${color}${type}.png`}
			alt={`${color}${type}`}
			className="piece"
			draggable
			onDragStart={onDragStart ? (e) => onDragStart(e, row, col) : undefined}
		/>
	);
}

export default Piece;
