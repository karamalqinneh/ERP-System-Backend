const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

// signup Function
const addItemController = async (req, res) => {
  let supplierName = await database.suppliers.findOne({
    where: { supplier_name: req.body.supplierName },
  });
  let groupId = await database.products_groups.findOne({
    where: { group_name: req.body.itemType },
  }).group_id;
  try {
    const addedItem = {
      group_id: groupId,
      product_name: req.body.itemType,
      model_name: req.body.modelName,
      supplier_id: supplierName.supplier_id,
      quantity: req.body.quantity,
      unit_price: req.body.unitPrice,
      length: req.body.unitPrice.split("x")[0],
      width: req.body.unitPrice.split("x")[1],
      height: req.body.unitPrice.split("x")[2],
    };
    const newItem = await database.items.create(addedItem);
    res.status(201).send(`You have successfully added the item`);
  } catch (error) {
    res.status(403).send("Error occurred");
  }
};

module.exports = router.post("/item-add", addItemController);
