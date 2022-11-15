// const Direction = require('./src/helpers/Direction');
// const {
//     DirectionError,
//     CoordinateError,
// } = require('./src/helpers/ErrorHandler');

// if (init_data.length !== 3) {
//     throw new DirectionError('Coordenada Inválida: Dados Faltando');
// }

// if (Direction.some((el) => el !== init_data[2])) {
//     throw new Error('Coordenada Inválida: Dados Faltando');
// }

const MarsRover = require('./src/models/Rover');

const start_input = '3 3 E';
const instructions = 'MRRMMRMRRM'.toUpperCase();

const marsRover = new MarsRover(start_input);

console.log('marsRover:', marsRover.getFinalPosition(instructions));
