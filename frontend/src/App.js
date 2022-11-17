import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

export default function App() {
    const [plateauSize, setPlateauSize] = useState('12 12');
    const [instruction, setInstruction] = useState('');
    const [initialPosition, setInitialPosition] = useState('');
    const [roversPosition, setRoversPosition] = useState([]);

    const fetchRoverPosition = async () => {
        return await axios
            .get('http://localhost:3001/rover')
            .then((response) => response.data)
            .catch((error) => error.response);
    };

    useEffect(() => {
        fetchRoverPosition()
            .then((res) => {
                setRoversPosition(
                    res.map((rover) => {
                        return {
                            col: rover.final_position.split(' ')[0],
                            row: rover.final_position.split(' ')[1],
                            direction: rover.final_position.split(' ')[2],
                        };
                    })
                );
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    console.log('roversPosition:', roversPosition);

    const Tile = (props) => {
        const { id, row, col, color } = props;

        return (
            <div
                value="23"
                style={{ background: color }}
                id={id}
                className={`${row},${col} tile`}
            >
                {id}
            </div>
        );
    };

    const createBoard = () => {
        let board = [];

        const sizeData = plateauSize.split(' ');

        if (sizeData.length === 2) {
            const n = plateauSize.split(' ')[1] - 1;
            const m = plateauSize.split(' ')[0] - 1;

            for (let row = 0; row <= n; row++) {
                let boardRow = [];

                for (let col = 0; col <= m; col++) {
                    const foundRover = roversPosition.find(
                        (rover) =>
                            parseInt(rover.col) === col &&
                            parseInt(rover.row) === row
                    );

                    console.log('foundRover:', foundRover);
                    const id = foundRover
                        ? `${col},${row} \n ${foundRover.direction}`
                        : `${col},${row}`;

                    const color = foundRover ? '#DE3163' : 'white';

                    boardRow.push(
                        <Tile
                            key={`${col}${row}`}
                            id={id}
                            row={row}
                            col={col}
                            color={color}
                        />
                    );
                }

                board.push(
                    <div key={`${row}`} className="row">
                        {boardRow}
                    </div>
                );
            }

            return board.reverse();
        }
    };

    const inputPositionHandler = (event) => {
        setInitialPosition(event.target.value);
    };

    const roversHandler = async (event) => {
        const response = await axios
            .post('http://localhost:3001/rover', {
                plateauSize,
                initialPosition,
                instruction,
            })
            .then((response) => response.data)
            .catch((error) => error.response);

        if (response.data?.error) {
            console.log('finalPosition:', response.data.error.message);
            return;
        }

        setInitialPosition('');
        setInstruction('');
    };

    return (
        <div className="App">
            <form onSubmit={roversHandler} className="deployment">
                <div className="initial-input">
                    <label>Plateau Size: </label>
                    <input
                        value={plateauSize}
                        className="plateau-size"
                        onChange={async (event) => {
                            setPlateauSize(event.target.value);
                            setInitialPosition('');
                            setInstruction('');
                        }}
                    />
                    <label>Position: </label>
                    <input
                        value={initialPosition}
                        className="initial-position"
                        onChange={inputPositionHandler}
                    />
                    <button type="submit" className="btn deploy-rove">
                        Deploy
                    </button>
                </div>
                <label>Instruction: </label>
                <input
                    value={instruction}
                    onChange={(event) => {
                        setInstruction(event.target.value);
                    }}
                    className="initial-instruction"
                />
                <div className="plateau">{createBoard()}</div>
            </form>
        </div>
    );
}
