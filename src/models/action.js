'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      action.hasMany(models.event);
    }
  }
  action.init({
    name: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'action',
  });
  return action;
};