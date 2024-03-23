'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('setTimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('setTimes');
  }
};