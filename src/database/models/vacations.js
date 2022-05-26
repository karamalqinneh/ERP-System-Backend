"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class vacations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vacations.init(
    {
      vacation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: DataTypes.INTEGER,
      manager_id: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM("Approved", "Declined", "Pending"),
        defaultValue: "Pending",
      },
      comments: DataTypes.STRING,
      reason: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "vacations",
    }
  );
  return vacations;
};
