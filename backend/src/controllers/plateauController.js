const { v4 } = require('uuid');
const { area } = require('../data/models');
const { BadRequestError, ConflictError } = require('../helper/ApiError');

exports.createOne = async (req, res, next) => {
    const { width, height, user_id } = req.body;

    if (isNaN(width) || isNaN(height)) {
        throw new BadRequestError('Input must be a number type');
    }

    if (!(width && height)) {
        throw new BadRequestError('All input is required');
    }

    const areaData = {
        id: v4(),
        user_id,
        width,
        height,
    };

    const _area = await area.findOne({
        where: { user_id },
    });

    if (_area) {
        throw new ConflictError('Area already created for that user');
    }

    const newArea = await area.create(areaData);

    return res.status(201).json(newArea);
};
