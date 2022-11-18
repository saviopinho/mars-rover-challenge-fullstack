import React from 'react';
import Tile from './Tile';
import './Grid.css';

function Grid(props) {
    const { size, rovers } = props;

    const buildGrid = (size) => {
        let grid = [];

        const sizeData = size.split(' ');

        if (sizeData.length === 2) {
            const n = size.split(' ')[1] - 1;
            const m = size.split(' ')[0] - 1;

            for (let row = 0; row <= n; row++) {
                let gridRow = [];

                for (let col = 0; col <= m; col++) {
                    const foundRover = rovers.find((rover) => {
                        const roverFinalData = rover.final_position.split(' ');
                        const rover_col = parseInt(roverFinalData[1]);
                        const rover_row = parseInt(roverFinalData[0]);

                        if (rover_col === row && rover_row === col) {
                            return rover;
                        }
                    });

                    let direction = '';

                    if (foundRover) {
                        direction = foundRover.final_position.split(' ')[2];
                    }

                    const id = foundRover
                        ? `${col} ${row} ${direction}`
                        : `${col}, ${row}`;

                    const color = foundRover
                        ? 'linear-gradient(to right bottom, #173fb4, #007eea, #00add1, #00d381, #a8eb12)'
                        : 'white';

                    gridRow.push(
                        <Tile
                            key={`${col}${row}`}
                            row={row}
                            col={col}
                            id={id}
                            color={color}
                        />
                    );
                }

                grid.push(
                    <div key={`${row}`} className="row">
                        {gridRow}
                    </div>
                );
            }

            return grid.reverse();
        }
    };

    return <div className="grid">{buildGrid(size)}</div>;
}

export default Grid;
