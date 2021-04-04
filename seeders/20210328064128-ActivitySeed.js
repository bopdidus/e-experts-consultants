'use strict';
const faker = require('faker');

const acti = [...Array(20)].map(activity=> (
  {
    expertId: faker.datatype.number({min:1, max:30}),
    createdAt: new Date(),
      updatedAt: new Date(),
    domainId: faker.datatype.number({min:1, max:20})
  }
))
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
      await queryInterface.bulkInsert('Activities', acti, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
     await queryInterface.bulkDelete('Activities', null, {});
     
  }
};
