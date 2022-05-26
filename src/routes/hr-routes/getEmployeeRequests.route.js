const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const getEmployeeRequestsController = async (req, res) => {
  try {
    let employeeId = req.params.id;
    const leaves = await database.leaves.findAll({
      where: { employee_id: employeeId },
    });
    let modifiedLeaves = leaves.map((ele) => {
      return {
        id: ele["leave_id"],
        date: `${ele["leave_date"].getDate()}-${ele[
          "leave_date"
        ].getMonth()}-${ele["leave_date"].getFullYear()}`,
        reason: ele["reason"],
        type: "Leave",
        state: ele["status"],
      };
    });
    const vacations = await database.vacations.findAll({
      where: { employee_id: employeeId },
    });
    const modifiedVacations = vacations.map((ele) => {
      return {
        id: parseInt(ele["vacation_id"]) * 444,
        date: `${ele["start_date"].getDate()}-${ele[
          "start_date"
        ].getMonth()}-${ele["start_date"].getFullYear()}`,
        reason: ele["reason"],
        type: "Vacation",
        state: ele["status"],
      };
    });

    let resposne = modifiedLeaves.concat(modifiedVacations);
    res.status(201).json(resposne);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get(
  "/employee/:id/requests",
  getEmployeeRequestsController
);
