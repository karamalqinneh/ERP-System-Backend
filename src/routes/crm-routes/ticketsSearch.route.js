const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const ticketsSearchController = async (req, res) => {
  try {
    let searchConditions = {};
    if (req.body.id) searchConditions["ticket_id"] = parseInt(req.body.id);
    if (req.body.date) searchConditions["date"] = req.body.date;
    if (req.body.reso) searchConditions["resolution"] = req.body.reso;
    if (req.body.name) {
      let value = await database.customers.findOne({
        where: { customer_name: req.body.name },
      });
      searchConditions["customer_id"] = value.customer_id;
    }
    const customerTickets = await database.tickets.findAll({
      where: searchConditions,
      include: [database.employees],
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

module.exports = router.post("/tickets/search", ticketsSearchController);
