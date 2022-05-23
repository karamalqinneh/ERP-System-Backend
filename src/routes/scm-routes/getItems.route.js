const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

// signup Function
const getItemsController = async (req, res) => {
  try {
    let allItems = await database.items.findAll({
      include: [database.products_groups, database.suppliers, database.sales],
    });
    let responseArray = allItems.map((ele) => {
      return {
        id: ele["item_id"],
        itemType: ele["product_name"],
        productGroup: ele["products_group"]["group_name"],
        modelName: ele["model_name"],
        supplierName: ele.supplier["supplier_name"],
        quantity: ele["quantity"],
        dimensions: { length: ele["length"], height: ele["height"] },
        unitPrice: ele["unit_price"],
        sales: ele["sales"].length, // ele["sale"].length
      };
    });
    console.log(allItems);
    res.status(200).json(responseArray);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get("/get-items", getItemsController);
