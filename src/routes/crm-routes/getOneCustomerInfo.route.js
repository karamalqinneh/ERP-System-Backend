const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const getCustomerInfoController = async (req, res) => {
  try {
    const CustomerId = req.params.id;
    const customerInfo = await database.customers.findOne({
      where: { customer_id: CustomerId },
      include: database.employees,
    });
    const response = {
      id: customerInfo["customer_id"],
      customerName: customerInfo["customer_name"],
      customerClass: customerInfo["customer_class"],
      accountManager: `${customerInfo["employee"]["first_name"]} ${customerInfo["employee"]["last_name"]}`,
      email: customerInfo["customer_email"],
      phone: customerInfo["customer_phone"],
      createdBy: `${customerInfo["employee"]["first_name"]} ${customerInfo["employee"]["last_name"]} @ ${customerInfo["createdAt"]}`,
      modifiedBy: `${customerInfo["employee"]["first_name"]} ${customerInfo["employee"]["last_name"]} @ ${customerInfo["updatedAt"]}`,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get("/customer/:id", getCustomerInfoController);
