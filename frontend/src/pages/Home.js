import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import RoverForm from '../components/RoverForm';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
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

        if (response.status === 200 || response.status === 201) {
            toast.success('Rover deployed with success!!');

            const finalData = response.data.finalPosition.split(' ');

            setSelectedCell({
                col: parseInt(finalData[0]),
                row: parseInt(finalData[1]),
                direction: finalData[2],
            });
        } else {
            toast.error(`Deploying failed: ${response.data.error.message}`);
        }
    };

    return (
        <RoverForm selectedCell={selectedCell} onAddRover={addRoverHandler} />
    );
};

export default Home;
