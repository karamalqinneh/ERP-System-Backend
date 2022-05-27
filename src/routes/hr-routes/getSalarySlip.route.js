const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const generateSalarySlip = require("../../helper-functions/employees-managment/generateSalarySlip");

const salarySlipController = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const month = req.params.month;
    const salary = await generateSalarySlip(employeeId, month);

    res.status(201).json(salary);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get(
  "/employee/:id/salary-slip/:month",
  salarySlipController
);
