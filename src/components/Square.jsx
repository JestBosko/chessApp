import React from 'react';

function Square({ color, coordinate, children }) {
    return (
        <div className={`square ${color}`}>
            {children || <span className="empty">&nbsp;</span>}
            <span className="coordinate">{coordinate}</span>
        </div>
    );
}

export default Square;