const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const employeeAnnualBalance = require("../../helper-functions/employees-managment/employeeAnnualBalance");

const getLeavesByManagerController = async (req, res) => {
  try {
    let managerId = req.params.id;
    const leaves = await database.leaves.findAll({
      where: { manager_id: managerId, status: "Pending" },
      include: [database.employees],
    });
    let resposne = [];
    for (let i = 0; i <= leaves.length - 1; i++) {
      let ele = leaves[i];
      let responseElement = {
        id: ele["leave_id"],
        employee: `${ele["employee"]["first_name"]} ${ele["employee"]["last_name"]}`,
        startTime: ele["start_time"],
        endTime: ele["end_time"],
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
  "/manager/:id/leave-requests",
  getLeavesByManagerController
);
