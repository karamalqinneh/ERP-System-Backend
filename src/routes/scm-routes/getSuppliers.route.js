const express = require("express");
const router = express.Router();

const database = require("../../database/models/index");

// signup Function
const getSuppliersController = async (req, res) => {
  try {
    let SupplierProducts = await database.suppliers.findAll({
      include: [database.products_groups, database.purchases],
    });
    let responseArray = SupplierProducts.map((ele) => {
      return {
        id: ele["supplier_id"],
        name: ele["supplier_name"],
        productsGenre: ele["products_group"]["group_name"],
        location: ele["location"],
        noOfPreviousInteractions: ele["purchases"].length,
        accountSize: ele["purchases"].reduce((acc, ele) => {
          let price = ele["unit_price"] * ele["quantity"];
          return acc + price;
        }, 0),
      };
    });
    res.status(200).json(responseArray);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get("/get-suppliers", getSuppliersController);
