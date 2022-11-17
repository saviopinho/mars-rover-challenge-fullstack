import React from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import NewRover from './components/NewRover';

const App = () => {
    const [selectedCell, setSelectedCell] = useState('');

    const addRoverHandler = async (roverData) => {
        const { plateauSize, initialPosition, instruction } = roverData;

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

        const finalData = response.finalPosition.split(' ');

        setSelectedCell({
            col: parseInt(finalData[0]),
            row: parseInt(finalData[1]),
            direction: finalData[2],
        });
    };

    return (
        <div className="App">
            <ToastContainer />
            <NewRover
                selectedCell={selectedCell}
                onAddRover={addRoverHandler}
            />
        </div>
    );
};

export default App;
