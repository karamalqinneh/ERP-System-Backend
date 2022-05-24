const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const getCustomerTicketsController = async (req, res) => {
  try {
    const CustomerId = req.params.id;
    const customerTickets = await database.tickets.findAll({
      where: { customer_id: CustomerId },
      include: [database.employees, database.customers],
    });
    const response = customerTickets.map((ele) => {
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

module.exports = router.get(
  "/tickets/customer/:id",
  getCustomerTicketsController
);
