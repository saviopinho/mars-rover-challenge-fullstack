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
                backgroundColor:
                    'linear-gradient(to bottom right, #0066ff 0%, #66ffff 100%)',
            }}
            id={id}
            className={`${row},${col} tile`}
        >
            {id}
        </div>
    );
}

export default Tile;
