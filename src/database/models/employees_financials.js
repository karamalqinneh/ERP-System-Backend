"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employees_financials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employees_financials.init(
    {
      employee_id: DataTypes.INTEGER,
      ot_duration: DataTypes.INTEGER,
      ot_date: DataTypes.DATE,
      deduction_amount: DataTypes.INTEGER,
      deduction_date: DataTypes.DATE,
      bonus_amount: DataTypes.INTEGER,
      bonus_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "employees_financials",
    }
  );
  return employees_financials;
};
