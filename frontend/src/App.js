import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import RoverForm from './components/RoverForm';
import 'react-toastify/dist/ReactToastify.css';

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
            .then((response) => response)
            .catch((error) => error.response);

        console.log('response:', response);

        if (response.status === 200 || response.status === 201) {
            toast.success('Rover deployed with success!!');
        } else {
            toast.error(`Deploying failed: ${response.data.error.message}`);
        }

        const finalData = response.data.finalPosition.split(' ');

        setSelectedCell({
            col: parseInt(finalData[0]),
            row: parseInt(finalData[1]),
            direction: finalData[2],
        });
    };

    return (
        <div className="App">
            <ToastContainer />
            <RoverForm
                selectedCell={selectedCell}
                onAddRover={addRoverHandler}
            />
        </div>
    );
};

export default App;
