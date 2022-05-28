const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const newLeaveRequestController = async (req, res) => {
  try {
    const user = await database.employees.findOne({
      where: { employee_id: req.body.user },
    });
    const leaveRequest = {
      leave_id: req.body.id,
      start_time: req.body.start,
      end_time: req.body.end,
      leave_date: req.body.date,
      comments: req.body.comments,
      employee_id: req.body.user,
      manager_id: user.manager_id,
    };
    const newRequest = await database.leaves.create(leaveRequest);
    res.status(201).send(`You have successfully submitted the request`);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.post("/new-leave-request", newLeaveRequestController);
