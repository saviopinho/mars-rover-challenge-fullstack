const { v4 } = require('uuid');
const { BadRequestError, UnauthorizeError } = require('../helper/ApiError');
const DIRECTION = require('../helper/Direction');
const MOVEMENT = require('../helper/Movement');
const Rover = require('../helper/Rover');
const roverRepo = require('../data/repositories/roverRepository');

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
            'Input initialPosition must have this format: X Y Direction'
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

    const finalData = finalPosition.split(' ');
    const final_x = parseInt(finalData[0]);
    const final_y = parseInt(finalData[1]);

    const rovers = await roverRepo.findAll();

    const foundSame = rovers.find((rover) => {
        const roverPosition = rover.final_position.split(' ');
        const rover_x = parseInt(roverPosition[0]);
        const rover_y = parseInt(roverPosition[1]);

        if (final_x === rover_x && final_y === rover_y) {
            return rover;
        }
    });

    if (foundSame) {
        throw new UnauthorizeError(
            'A rover cannot have the same final position of another one'
        );
    }

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

    await roverRepo.create(roverData);

    res.status(201).json({
        finalPosition,
    });
};

exports.fetchAll = async (req, res, next) => {
    let { page, limit } = req.query;

    if (!page) page = 1;
    if (!limit) limit = 10;

    page = parseInt(page);
    limit = parseInt(limit);

    try {
        const rovers = await roverRepo.findAll();
        const roversMap = rovers.map((rover) => {
            return {
                id: rover.id,
                plateau_size: rover.plateau_size,
                initial_position: rover.initial_position,
                instruction: rover.instruction,
                final_position: rover.final_position,
                createdAt: new Date(rover.createdAt).toLocaleString('pt-BR'),
            };
        });

        return res.status(200).send({
            data: roversMap.slice((page - 1) * limit, page * limit),
            total: roversMap.length,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};
