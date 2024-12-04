'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      event.belongsTo(models.action);
      event.belongsTo(models.image);
    }
  }
  event.init({
    timeStamp: DataTypes.DATE,
    resultCount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    actionID: DataTypes.INTEGER,
    imageID: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};