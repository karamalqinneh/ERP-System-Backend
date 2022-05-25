const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const addCustomerController = async (req, res) => {
  try {
    let accountManager = await database.employees.findOne({
      where: { email: req.body.accountManager },
    });
    const addedCustomer = {
      customer_name: req.body.name,
      customer_class: req.body.class,
      customer_phone: req.body.phone,
      customer_email: req.body.email,
      account_manager: accountManager.employee_id,
    };
    const newCustomer = await database.customers.create(addedCustomer);
    res.status(201).send(`You have successfully added a new customer`);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.post("/add-customer", addCustomerController);
