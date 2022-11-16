'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class rover extends Model {
        static associate(models) {}
    }

    rover.init(
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            plateau_size: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            initial_position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            instruction: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            final_position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'rover',
        }
    );

    return rover;
};
