import React from 'react';
import './Board.css';

const verticalAxis = [8,7,6,5,4,3,2,1]; // reversed for chess notation
const horizontalAxis = ['a','b','c','d','e','f','g','h'];

function Board() {
    let squares = [];
    for (let i = 0; i < verticalAxis.length; i++) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            let squareColor = (i + j) % 2 === 0 ? 'white' : 'black';
            squares.push(
                <div key={`${i}-${j}`} className={`square ${squareColor}`}>
                    <span className="coordinate">{horizontalAxis[j]}{verticalAxis[i]}</span>
                </div>
            );
        }
    }
    return <div id='board'>{squares}</div>
}

export default Board;