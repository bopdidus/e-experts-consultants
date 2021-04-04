'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expertId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Experts',
          key:'id'
        }
      },
      domainId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Domains',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Activities');
  }
};