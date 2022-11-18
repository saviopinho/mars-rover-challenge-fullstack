const { rover } = require('../models');

function findOneBy(column) {
    return rover.findOne({ where: { column } });
}

function findAll() {
    return rover.findAll();
}

function create(data = {}) {
    return rover.create(data);
}

function clear() {
    return rover.sync({ force: true });
}

module.exports = { findOneBy, findAll, create, clear };
