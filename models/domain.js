'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Domain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Domain.belongsToMany(models.Expert, { through:'Activity'})
    }
  };
  Domain.init({
    name: DataTypes.STRING,
    language: DataTypes.ENUM({values: ['en', 'fr']}),
  }, {
    sequelize,
    modelName: 'Domain',
  });
  return Domain;
};