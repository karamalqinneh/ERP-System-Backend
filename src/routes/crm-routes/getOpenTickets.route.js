const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const getOpenTicketsController = async (req, res) => {
  try {
    const openTickets = await database.tickets.findAll({
      where: { status: "Open" || "Pending" },
      include: [database.employees, database.customers],
    });
    const pendingTickets = await database.tickets.findAll({
      where: { status: "Pending" },
      include: [database.employees, database.customers],
    });
    let allTickets = openTickets.concat(pendingTickets);
    const response = allTickets.map((ele) => {
      return {
        id: ele["ticket_id"],
        resolution: ele["resolution"],
        date: ele["date"],
        details: ele["details"],
        updates: ele["updates"],
        status: ele["status"],
        employee: `${ele["employee"]["first_name"]} ${ele["employee"]["last_name"]}`,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get("/tickets/open-tickets", getOpenTicketsController);
