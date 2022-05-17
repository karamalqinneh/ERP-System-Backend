"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class leaves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  leaves.init(
    {
      leave_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM("Approved", "Declined", "Pending"),
        defaultValue: "Pending",
      },
      comments: DataTypes.STRING,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      leave_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "leaves",
    }
  );
  return leaves;
};
