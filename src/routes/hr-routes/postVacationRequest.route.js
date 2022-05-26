const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const newVacationRequestController = async (req, res) => {
  try {
    const user = await database.employees.findOne({
      where: { employee_id: req.body.user },
    });
    const vacationRequest = {
      start_date: req.body.start,
      end_date: req.body.end,
      comments: req.body.comments,
      employee_id: user.employee_id,
      manager_id: user.manager_id,
    };
    const newRequest = await database.vacations.create(vacationRequest);
    res.status(201).send(`You have successfully submitted the request`);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.post(
  "/new-vacation-request",
  newVacationRequestController
);
