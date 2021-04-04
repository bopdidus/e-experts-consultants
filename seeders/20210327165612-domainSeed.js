'use strict';
const faker = require('faker');
const models = require('../models');

const Domain = models.Domain;
const doms = [...Array(20)].map(Domain=> (
  {
    name: faker.commerce.department(),
    createdAt: new Date(),
      updatedAt: new Date(),
    language: faker.random.arrayElement(['en','fr'])
  }
))
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
     await queryInterface.bulkInsert('Domains',
     doms
     , {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
      await queryInterface.bulkDelete('Domains', null, {});
     
  }
};
