'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tickets.init({
    leave_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    status: DataTypes.ENUM,
    comments: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    leave_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tickets',
  });
  return tickets;
};