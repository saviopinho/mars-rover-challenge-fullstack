'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('rovers', {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            plateau_size: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            initial_position: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            instruction: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            final_position: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('rovers');
    },
};
