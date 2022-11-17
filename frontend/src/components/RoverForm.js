import './RoverForm.css';
import Grid from './Grid';
import { useState } from 'react';

function RoverForm(props) {
    const { onAddRover, selectedCell } = props;

    const [plateauSize, setPlateauSize] = useState('12 12');
    const [instruction, setInstruction] = useState('');
    const [initialPosition, setInitialPosition] = useState('');

    const roverData = {
        plateauSize,
        initialPosition: initialPosition.toUpperCase(),
        instruction: instruction.toUpperCase(),
    };

    return (
        <div className="deployment">
            <h2
                className="input-title"
                style={{ border: '2px solid black', borderRadius: '12px' }}
            >
                WELCOME TO MARS
            </h2>
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
                            fontSize: '12px',
                            fontWeight: 'bold',
                        }}
                    >
                        Plateau Size:
                    </label>
                    <input
                        value={plateauSize}
                        type="text"
                        className="plateau-input"
                        onChange={(event) => {
                            setPlateauSize(event.target.value);
                            setInitialPosition('');
                            setInstruction('');
                        }}
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
                            fontSize: '12px',
                            fontWeight: 'bold',
                        }}
                    >
                        Landing Position:
                    </label>
                    <input
                        type="text"
                        className="position-input"
                        onChange={(event) => {
                            setInitialPosition(event.target.value);
                        }}
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
                            fontSize: '12px',
                            fontWeight: 'bold',
                        }}
                    >
                        Instructions:
                    </label>
                    <input
                        type="text"
                        className="instruction-input"
                        onChange={(event) => {
                            setInstruction(event.target.value);
                        }}
                        value={instruction}
                    />
                </div>

                <div className="container">
                    <button
                        onClick={() => {
                            onAddRover(roverData);
                        }}
                        className="btn deploy"
                    >
                        Deploy
                    </button>
                </div>
            </div>

            <Grid selectedCell={selectedCell} size={plateauSize}></Grid>
        </div>
    );
}

export default RoverForm;
