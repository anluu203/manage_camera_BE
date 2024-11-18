'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class camera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      camera.hasMany(models.image);
      camera.belongsTo(models.room);
    }
  }
  camera.init({
    name: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
    spec: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    roomID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'camera',
  });
  return camera;
};