const express = require("express");
const router = express.Router();

const database = require("../../database/models/index");

// signup Function
const getSupplierProductsController = async (req, res) => {
  try {
    let supplierId = req.params.id;
    let SupplierProducts = await database.purchases.findAll({
      where: { supplier_id: supplierId },
      include: [database.products_groups, database.suppliers, database.sales],
    });
    let responseArray = SupplierProducts.map((ele) => {
      return {
        id: ele["purchase_id"],
        modelName: ele["product_name"],
        productGroup: ele["products_group"]["group_name"],
        supplierName: ele["supplier"]["supplier_name"],
        quantity: ele["quantity"],
        unitPrice: ele["unitPrice"],
        sales: ele["sales"]
          .filter((sale) => sale["item_id"] == ele["item_id"])
          .reduce((acc, item) => acc + item.quantity, 0),
      };
    });
    res.status(200).json(responseArray);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get(
  "/supplier/:id/get-products",
  getSupplierProductsController
);
