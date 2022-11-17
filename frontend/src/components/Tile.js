import React from 'react';

function Tile(props) {
    const { id, row, col, color } = props;

    return (
        <div
            style={{
                background: color,
            }}
            id={id}
            className={`${row},${col} tile`}
        >
            {id}
        </div>
    );
}

export default Tile;
