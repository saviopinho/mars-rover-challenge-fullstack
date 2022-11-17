import './RoverForm.css';
import Grid from './Grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function RoverForm(props) {
    const { selectedCell, onAddRover } = props;

    const [plateauSize, setPlateauSize] = useState('12 12');
    const [instruction, setInstruction] = useState('');
    const [initialPosition, setInitialPosition] = useState('');

    const roverData = {
        plateauSize,
        initialPosition: initialPosition.toUpperCase(),
        instruction: instruction.toUpperCase(),
    };

    const changePlateauHandler = (event) => {
        setPlateauSize(event.target.value);
        setInitialPosition('');
        setInstruction('');
    };

    const changePositionHandler = (event) => {
        setInitialPosition(event.target.value);
    };

    const changeInstructionHandler = (event) => {
        setInstruction(event.target.value);
    };

    const deployRoverHandler = () => {
        onAddRover(roverData);
    };

    return (
        <div className="deployment">
            <h2 className="input-title">MARS ROVER CHALLENGE</h2>
            <div className="initial-input">
                <div
                    style={{
                        marginBottom: '20px',
                        margin: 'auto',
                        width: '80%',
                    }}
                >
                    <label
                        style={{
                            fontFamily: 'Lucida Console',
                            fontSize: '13px',
                            fontWeight: 'bold',
                        }}
                    >
                        Plateau Size:
                    </label>
                    <input
                        value={plateauSize}
                        type="text"
                        className="plateau-input"
                        onChange={changePlateauHandler}
                    />
                </div>
                <div
                    style={{
                        marginBottom: '20px',
                        margin: 'auto',
                        width: '80%',
                    }}
                >
                    <label
                        style={{
                            fontFamily: 'Lucida Console',
                            fontSize: '13px',
                            fontWeight: 'bold',
                        }}
                    >
                        Landing Position:
                    </label>
                    <input
                        type="text"
                        className="position-input"
                        onChange={changePositionHandler}
                        value={initialPosition}
                    />
                </div>
                <div
                    style={{
                        marginBottom: '20px',
                        margin: 'auto',
                        width: '80%',
                    }}
                >
                    <label
                        style={{
                            fontFamily: 'Lucida Console',
                            fontSize: '13px',
                            fontWeight: 'bold',
                        }}
                    >
                        Instructions:
                    </label>
                    <input
                        type="text"
                        className="instruction-input"
                        onChange={changeInstructionHandler}
                        value={instruction}
                    />
                </div>

                <div className="container">
                    <button onClick={deployRoverHandler} className="btn deploy">
                        Deploy
                    </button>

                    <Link to="/report">
                        <button className="btn report">Report</button>
                    </Link>
                </div>
            </div>

            <Grid selectedCell={selectedCell} size={plateauSize}></Grid>
        </div>
    );
}

export default RoverForm;
