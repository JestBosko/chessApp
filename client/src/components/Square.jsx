function Square({ color, coordinate, children, onDrop, onDragOver }) {
	return (
		<div className={`square ${color}`} onDrop={onDrop} onDragOver={onDragOver}>
			{children || <span className="empty">&nbsp;</span>}
			<span className="coordinate">{coordinate}</span>
		</div>
	);
}

export default Square;
