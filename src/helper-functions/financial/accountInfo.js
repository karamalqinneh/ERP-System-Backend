const database = require("../../database/models/index");

const getAccountInfo = async (supplierId) => {
  const allPurchases = await database.purchases.findAll({
    where: { supplier_id: supplierId },
  });
  const accountSize = allPurchases.reduce((acc, ele) => {
    let price = ele["unit_price"] * ele["quantity"];
    return acc + price;
  }, 0);
  return { accountSize, previousInteractions: allPurchases.length };
};

module.exports = getAccountInfo;
