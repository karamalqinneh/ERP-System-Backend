"use strict";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const API_SECRET = process.env.API_SECRET;
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    static associate(models) {}
  }
  employees.init(
    {
      employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      hire_date: DataTypes.DATE,
      department: {
        type: DataTypes.ENUM(
          "HR",
          "Sales",
          "Marketing",
          "Accounting",
          "Commercial",
          "Reporting",
          "IT"
        ),
        defaultValue: "Marketing",
      },
      job_title: DataTypes.STRING,
      salary: DataTypes.INTEGER,
      password: DataTypes.STRING,
      manager_id: DataTypes.INTEGER,
      role: {
        type: DataTypes.ENUM("admin", "manager", "employee"),
        defaultValue: "employee",
      },
      token: {
        type: DataTypes.VIRTUAL,
      },
      actions: {
        type: DataTypes.VIRTUAL,
        get() {
          const acl = {
            employee: ["read", "create"],
            manager: ["read", "create", "update", "delete"],
            admin: [
              "read",
              "create",
              "update",
              "delete",
              "delete all",
              "edit all",
            ],
          };
          return acl[this.role];
        },
      },
    },
    {
      sequelize,
      modelName: "employees",
    }
  );
  employees.authenticateBasic = async function (email, password) {
    const user = await this.findOne({ where: { email } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      let newToken = jwt.sign({ email: user.email }, API_SECRET);
      user.token = newToken;
      return user;
    } else {
      throw new Error("Invalid User");
    }
  };

  employees.authenticateBearer = async function (token) {
    const parsedToken = jwt.verify(token, API_SECRET);
    const user = await this.findOne({
      where: { email: parsedToken.email },
    });
    if (user) {
      return user;
    } else {
      throw new Error("Invalid Token");
    }
  };
  return employees;
};
