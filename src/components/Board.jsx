import React, { useState } from 'react';
import './Board.css';
import Square from './Square';
import Piece from './Piece';
import { verticalAxis, horizontalAxis, initialBoard } from '../files/chessSetup';

  
function Board() {
    const [board] = useState(initialBoard);
    return (
        <div id="board">
            {verticalAxis.map((v, i) =>
                horizontalAxis.map((h, j) => {
                    const squareColor = (i + j) % 2 === 0 ? 'white' : 'black';
                    return (
                        <Square key={`${i}-${j}`} color={squareColor} coordinate={`${h}${v}`}>
                            <Piece piece={board[i][j]} />
                        </Square>
                    );
                })
            )}
        </div>
    );
}

export default Board;