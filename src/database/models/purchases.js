"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  purchases.init(
    {
      purchase_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      supplier_id: DataTypes.INTEGER,
      account_manager: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unit_price: DataTypes.INTEGER,
      tax_exemption: DataTypes.BOOLEAN,
      vat: DataTypes.DECIMAL,
      selling_price: DataTypes.INTEGER,
      payment_method: {
        type: DataTypes.ENUM("Cash", "Credit", "L/C"),
        defaultValue: "Credit",
      },
      order_date: DataTypes.DATE,
      fullfillment_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "purchases",
    }
  );
  return purchases;
};
