"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sales.init(
    {
      sales_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: DataTypes.INTEGER,
      group_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      supplier_id: DataTypes.INTEGER,
      account_manager: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      tax_exemption: DataTypes.BOOLEAN,
      vat: DataTypes.DECIMAL,
      selling_price: DataTypes.INTEGER,
      payment_method: {
        type: DataTypes.ENUM("Cash", "Credit", "L/C"),
        defaultValue: "Credit",
      },
      // status: {
      //   type: DataTypes.ENUM("Completed", "Pending", "Canceled"),
      //   defaultValue: "Pending",
      // },
      order_date: DataTypes.DATE,
      fullfillment_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "sales",
    }
  );
  return sales;
};
