const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const employeeAnnualBalance = require("../../helper-functions/employees-managment/employeeAnnualBalance");
const calculateTenure = require("../../helper-functions/employees-managment/calculateTenure");

const getEmployeeInfoController = async (req, res) => {
  try {
    let employeeId = req.params.id;
    const info = await database.employees.findOne({
      where: { employee_id: employeeId },
    });
    const vacationBalance = await employeeAnnualBalance(employeeId);
    const tenure = await calculateTenure(employeeId);
    let response = {
      employeeName: `${info["first_name"]} ${info["last_name"]}`,
      department: info.department,
      jobTitle: info.job_title,
      basicSalary: info.salary,
      vacationBalance,
      tenure,
    };
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get("/employee/:id/info", getEmployeeInfoController);
