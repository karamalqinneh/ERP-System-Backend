const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const addItemController = async (req, res) => {
  try {
    const addedItem = {
      group_id: req.body.itemType,
      product_name: req.body.productName,
      model_name: req.body.modelName,
      supplier_id: req.body.supplierName,
      quantity: req.body.quantity,
      unit_price: req.body.unitPrice,
      length: parseInt(req.body.dimensions.split("x")[0]),
      width: parseInt(req.body.dimensions.split("x")[1]),
      height: parseInt(req.body.dimensions.split("x")[2]),
    };
    const newItem = await database.items.create(addedItem);
    console.log(newItem);
    res.status(201).send(`You have successfully added the item`);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.post("/item-add", addItemController);
