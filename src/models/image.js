'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      image.hasMany(models.event);
      image.belongsTo(models.camera);
    }
  }
  image.init({
    timeStamp: DataTypes.DATE,
    resultURL: DataTypes.STRING,
    cameraID: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};