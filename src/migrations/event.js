'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timeStamp: {
        type: Sequelize.DATE
      },
      resultCount: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      actionID: {
        type: Sequelize.INTEGER
      },
      imageID: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('event');
  }
};