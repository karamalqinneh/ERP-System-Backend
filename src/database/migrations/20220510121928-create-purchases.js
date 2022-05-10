'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      purchase_id: {
        type: Sequelize.INTEGER
      },
      group_id: {
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      supplier_id: {
        type: Sequelize.INTEGER
      },
      account_manager: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      taxExemptio: {
        type: Sequelize.BOOLEAN
      },
      vat: {
        type: Sequelize.DECIMAL
      },
      selling_price: {
        type: Sequelize.INTEGER
      },
      payment_method: {
        type: Sequelize.ENUM
      },
      order_date: {
        type: Sequelize.DATE
      },
      fullfillment_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purchases');
  }
};