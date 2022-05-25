const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const getCustomersController = async (req, res) => {
  try {
    let allCustomers = await database.customers.findAll({
      include: database.employees,
    });
    let responseArray = allCustomers.map((ele) => {
      return {
        id: ele["customer_id"],
        customerName: ele["customer_name"],
        customerClass: ele["customer_class"],
        accountManager: `${ele["employee"]["first_name"]} ${ele["employee"]["last_name"]}`,
        email: ele["customer_email"],
        phone: ele["customer_phone"],
        createdBy: `${ele["employee"]["first_name"]} ${ele["employee"]["last_name"]} @ ${ele["createdAt"]}`,
        modifiedBy: `${ele["employee"]["first_name"]} ${ele["employee"]["last_name"]} @ ${ele["updatedAt"]}`,
      };
    });
    res.status(200).json(responseArray);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get("/get-customers", getCustomersController);
