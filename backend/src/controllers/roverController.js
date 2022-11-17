const { v4 } = require('uuid');
const { rover } = require('../data/models');
const { BadRequestError, UnauthorizeError } = require('../helper/ApiError');
const DIRECTION = require('../helper/Direction');
const MOVEMENT = require('../helper/Movement');
const Rover = require('../helper/Rover');

exports.createOne = async (req, res, next) => {
    const { plateauSize, initialPosition, instruction } = req.body;

    if (!(initialPosition && instruction && plateauSize)) {
        throw new BadRequestError('All input is required');
    }

    const initialData = initialPosition.split(' ');
    const plateauData = plateauSize.split(' ');

    if (plateauData && plateauData.length !== 2) {
        throw new BadRequestError(
            'Input plateauSize must have this format: X Y'
        );
    }

    if (initialData && initialData.length !== 3) {
        throw new BadRequestError(
            'Input initialPosition must have this format: X Y Diretion'
        );
    }

    const width = parseInt(plateauData[0]);
    const height = parseInt(plateauData[1]);

    const start_x = parseInt(initialData[0]);
    const start_y = parseInt(initialData[1]);
    const start_direction = initialData[2].toUpperCase();

    if (isNaN(start_x) || isNaN(start_y)) {
        throw new BadRequestError(
            'Input initialPosition X Y only accepts number type'
        );
    }

    if (isNaN(width) || isNaN(height)) {
        throw new BadRequestError('Input plateauSize only accepts number type');
    }

    if (!DIRECTION[start_direction]) {
        throw new BadRequestError('Input Direction only accepts (N, S, E, W)');
    }

    for (const command of instruction.split('')) {
        if (!MOVEMENT[command.toUpperCase()]) {
            throw new BadRequestError(
                'Input instruction only accepts (R, L, M)'
            );
        }
    }

    const newRover = new Rover(start_x, start_y, start_direction);
    const finalPosition = newRover.getFinalPosition(instruction.toUpperCase());

    const rovers = await rover.findAll();

    const foundSame = rovers.find(
        (rover) => finalPosition == rover.final_position
    );

    if (foundSame) {
        throw new UnauthorizeError(
            'A rover cannot have the same final position of another one'
        );
    }

    const finalData = finalPosition.split(' ');
    const final_x = parseInt(finalData[0]);
    const final_y = parseInt(finalData[1]);

    if (
        final_x < 0 ||
        final_y < 0 ||
        final_x > width - 1 ||
        final_y > height - 1
    ) {
        throw new UnauthorizeError(
            `Rover cannot reach out beyond Plateau size: ${width} ${height}`
        );
    }

    const roverData = {
        id: v4(),
        plateau_size: plateauSize,
        initial_position: initialPosition,
        instruction: instruction.toUpperCase(),
        final_position: finalPosition,
    };

    await rover.create(roverData);

    res.status(201).json({
        finalPosition,
    });
};

exports.fetchAll = async (req, res, next) => {
    try {
        const foundRover = await rover.findAll();
        // console.log(new Date(foundRover[1].createdAt).toLocaleString('pt-BR'));

        return res.status(200).send(foundRover);
    } catch (error) {
        return res.status(500).json(error);
    }
};
