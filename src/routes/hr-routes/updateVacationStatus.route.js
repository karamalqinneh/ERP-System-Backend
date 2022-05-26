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
    let vacation = await database.vacations.findOne({
      where: { manager_id: managerId, vacation_id: requestId },
      include: [database.employees],
    });
    vacation.set({
      status: action,
    });
    vacation = await vacation.save();
    res.status(201).json(vacation);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.put(
  "/manager/:id/update-vacations",
  updateLeaveRequestStatus
);
