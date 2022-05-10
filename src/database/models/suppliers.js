'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  suppliers.init({
    supplier_id: DataTypes.INTEGER,
    products_type: DataTypes.INTEGER,
    location: DataTypes.STRING,
    supplier_name: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'suppliers',
  });
  return suppliers;
};