"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_name: DataTypes.STRING,
      customer_class: {
        type: DataTypes.ENUM("Gold", "Silver", "Bronze"),
        defaultValue: "Bronze",
      },
      customer_email: DataTypes.STRING,
      customer_phone: DataTypes.INTEGER,
      account_manager: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "customers",
    }
  );
  return customers;
};
