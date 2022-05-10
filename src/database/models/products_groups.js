'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products_groups.init({
    group_id: DataTypes.INTEGER,
    group_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products_groups',
  });
  return products_groups;
};