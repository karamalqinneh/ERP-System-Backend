'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employees.init({
    employee_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    hire_date: DataTypes.DATE,
    department: DataTypes.ENUM,
    job_title: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    password: DataTypes.STRING,
    manager_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'employees',
  });
  return employees;
};