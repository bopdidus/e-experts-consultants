'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  };
  Subscriber.init({
    company_name: DataTypes.STRING,
    trade_id: DataTypes.STRING,
    niu: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    lastConnection: DataTypes.DATE,
    isActivated: DataTypes.BOOLEAN,
    isCompany: DataTypes.BOOLEAN,
    social_reason: DataTypes.STRING,
    website: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nic: DataTypes.STRING,
    avatar: DataTypes.STRING,
    sexe: DataTypes.ENUM({values: ['F', 'M']})
  }, {
    sequelize,
    modelName: 'Subscriber',
  });
  return Subscriber;
};