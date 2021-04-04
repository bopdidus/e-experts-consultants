'use strict';
const faker = require('faker');
const models = require('../models');

const Expert = models.Expert;

const exps = [...Array(30)].map(Expert=> (
  {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    niu: faker.datatype.uuid(),
    phoneNumber: faker.phone.phoneNumber(),
    country: faker.address.country(),
    working_place:faker.name.jobArea(),
    sexe:faker.random.arrayElement(['F','M']),
    nic:faker.random.alphaNumeric(),
    experience: faker.datatype.number(),
    national_order: faker.name.jobType(),
    international_order:faker.name.jobType(),
    createdAt: new Date(),
    updatedAt: new Date(),
    accept_conditions: faker.random.arrayElement([true,false])
  }
))
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
      await queryInterface.bulkInsert('Experts', exps, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
      await queryInterface.bulkDelete('Experts', null, {});
     
  }
};
