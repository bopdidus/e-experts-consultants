'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Experts', {
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
        type: Sequelize.STRING,
        unique: true
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
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
      working_place: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      nic: {
        type: Sequelize.STRING,
      },
      experience: {
        type: Sequelize.INTEGER
      },
      national_order: {
        type: Sequelize.STRING
      },
      international_order: {
        type: Sequelize.STRING
      },
      likes:{
        type:Sequelize.INTEGER
      },
      sexe:{
        type: Sequelize.ENUM({
            values: ['F', 'M']
            })
        },
        avatar: {
          type: Sequelize.STRING
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
    await queryInterface.dropTable('Experts');
  }
};