import React from 'react';
import './Board.css';

const verticalAxis = [8, 7, 6, 5, 4, 3, 2, 1];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function Board() {
    return (
        <div id="board">
            {verticalAxis.map((v, i) =>
                horizontalAxis.map((h, j) => {
                    const squareColor = (i + j) % 2 === 0 ? 'white' : 'black';
                    return (
                        <div key={`${i}-${j}`} className={`square ${squareColor}`}>
                            <span className="coordinate">{h}{v}</span>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default Board;