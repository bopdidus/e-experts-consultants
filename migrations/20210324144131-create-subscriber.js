'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subscribers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING
      },
      trade_id: {
        type: Sequelize.STRING
      },
      niu: {
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      },
      phoneNumber: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      lastConnection: {
        type: Sequelize.DATE
      },
      isActivated: {
        type: Sequelize.BOOLEAN
      },
      isCompany: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      social_reason: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      nic: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      sexe:{
        type: Sequelize.ENUM({
            values: ['F', 'M']
            })
        },
        accept_conditions:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
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
    await queryInterface.dropTable('Subscribers');
  }
};