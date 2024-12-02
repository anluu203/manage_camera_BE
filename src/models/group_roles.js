'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  group_roles.init({
    group_id: DataTypes.INTEGER,
    roles_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'group_roles',
  });
  return group_roles;
};