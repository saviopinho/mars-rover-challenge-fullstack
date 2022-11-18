import React from 'react';

function Tile(props) {
    const { id, row, col, color } = props;

    return (
        <div
            style={{
                background: color,
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: '42px',
                borderRadius: '8px',
            }}
            id={id}
            className={`${row},${col} tile`}
        >
            {id}
        </div>
    );
}

export default Tile;
