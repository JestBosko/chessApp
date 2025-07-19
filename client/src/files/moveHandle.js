export function handleDropFactory(board, setBoard) {
	return async function handleDrop(e, toRow, toCol) {
		e.preventDefault();
		const fromRow = parseInt(e.dataTransfer.getData("fromRow"), 10);
		const fromCol = parseInt(e.dataTransfer.getData("fromCol"), 10);

		// Call backend API
		const response = await fetch("http://localhost:3001/api/move", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ board, fromRow, fromCol, toRow, toCol }),
		});
		const data = await response.json();
		if (response.ok) {
			setBoard(data.board);
		} else {
			alert(data.error);
		}
	};
}

export function handleDragStart(e, row, col) {
	e.dataTransfer.setData("fromRow", row);
	e.dataTransfer.setData("fromCol", col);
}

export function handleDragOver(e) {
	e.preventDefault();
}
