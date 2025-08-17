export function handleMove(
	board,
	setBoard,
	setFeedback,
	currentColor,
	setCurrentColor,
	checkStatus,
) {
	return async (e, toRow, toCol) => {
		e.preventDefault();
		const fromRow = Number(e.dataTransfer.getData("fromRow"));
		const fromCol = Number(e.dataTransfer.getData("fromCol"));
		try {
			const response = await fetch("http://localhost:3001/api/move", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					board,
					fromRow,
					fromCol,
					toRow,
					toCol,
					currentColor,
				}),
			});
			const data = await response.json();
			if (!response.ok) {
				setFeedback({ type: "error", message: data.error || "Move error" });
				return;
			}
			setBoard(data.board);
			setFeedback("");
			const nextColor = currentColor === "w" ? "b" : "w";
			setCurrentColor(nextColor);

			// Check for check/checkmate and show possible moves
			const status = await checkStatus(data.board, nextColor);
			if (status.checkmate) {
				setFeedback({ type: "info", message: "Checkmate!" });
			} else if (status.inCheck) {
				setFeedback({
					type: "info",
					message:
						"Check! Possible moves to escape: " + status.movesToEscape.length,
				});
			}
		} catch (err) {
			setFeedback({ type: "error", message: "Network or server error" });
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
