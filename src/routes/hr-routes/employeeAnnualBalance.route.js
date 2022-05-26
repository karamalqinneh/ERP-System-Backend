const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const employeeAnnualBalance = require("../../helper-functions/employees-managment/employeeAnnualBalance");

const annualBalanceController = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const balance = await employeeAnnualBalance(employeeId);

    res.status(201).json(balance.toFixed(2));
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get(
  "/employee/:id/annual-balance",
  annualBalanceController
);
