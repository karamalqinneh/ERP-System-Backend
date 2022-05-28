const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const employeeAnnualBalance = require("../../helper-functions/employees-managment/employeeAnnualBalance");

const getVacationsByManagerController = async (req, res) => {
  try {
    let managerId = req.params.id;
    const vacations = await database.vacations.findAll({
      where: { manager_id: managerId, status: "Pending" },
      include: [database.employees],
    });
    let resposne = [];
    for (let i = 0; i <= vacations.length - 1; i++) {
      let ele = vacations[i];
      let responseElement = {
        type: "Vacation",
        id: ele["vacation_id"],
        employee: `${ele["employee"]["first_name"]} ${ele["employee"]["last_name"]}`,
        startDate: `${ele["start_date"].getDate()}-${ele[
          "start_date"
        ].getMonth()}-${ele["start_date"].getFullYear()}`,
        endDate: `${ele["end_date"].getDate()}-${ele[
          "end_date"
        ].getMonth()}-${ele["end_date"].getFullYear()}`,
        comments: ele["comments"],
        employeeBalance: await employeeAnnualBalance(ele["employee_id"]),
      };
      resposne.push(responseElement);
    }
    res.status(201).json(resposne);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get(
  "/manager/:id/vacation-requests",
  getVacationsByManagerController
);
