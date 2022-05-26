const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const updateLeaveRequestStatus = async (req, res) => {
  try {
    let managerId = req.params.id;
    let requestId = req.body.id;
    let action =
      req.body.action == "ACC"
        ? "Approved"
        : req.body.action == "DEC"
        ? "Declined"
        : "Pending";
    let leave = await database.leaves.findOne({
      where: { manager_id: managerId, leave_id: requestId },
      include: [database.employees],
    });
    leave.set({
      status: action,
    });
    leave = await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.put(
  "/manager/:id/update-leaves",
  updateLeaveRequestStatus
);
