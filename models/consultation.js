'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Consultation.hasMany(models.Message, {as: 'messages'})
      

    }
  };
  Consultation.init({
    theme: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Consultation',
  });
  return Consultation;
};