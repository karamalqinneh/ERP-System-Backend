const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const getCustomerSalesController = async (req, res) => {
  try {
    const CustomerId = req.params.id;
    const customerSales = await database.sales.findAll({
      where: { customer_id: CustomerId },
      include: [
        database.products_groups,
        database.suppliers,
        database.employees,
      ],
    });
    const response = customerSales.map((ele) => {
      return {
        salesID: ele["sales_id"],
        customerID: ele["customer_id"],
        productGroup: ele["products_group"]["group_name"],
        product: ele["product_name"],
        status: ele["status"],
        supplierName: ele["supplier"]["supplier_name"],
        quantity: ele["quantity"],
        taxExemption: ele["taxExemption"],
        vat: ele["vat"],
        unitPrice: ele["unit_price"],
        paymentMethod: ele["payment_method"],
        orderDate: ele["order_date"],
        fullfillmentDate: ele["fullfillment_date"],
      };
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get("/sales/customer/:id", getCustomerSalesController);
