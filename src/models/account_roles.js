'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account_roles.init({
    account_roles: DataTypes.INTEGER,
    roles_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'account_roles',
  });
  return account_roles;
};