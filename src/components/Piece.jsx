import React from 'react';

function Piece({ piece }) {
    if (!piece) return null;
    const { color, type } = piece;
    return (
        <img
            src={`/chessPieces/${color}${type}.png`}
            alt={`${color}${type}`}
            className="piece"
            draggable
        />
    );
}

export default Piece;