"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customer_name: {
        type: Sequelize.STRING,
      },
      customer_class: {
        type: Sequelize.ENUM,
      },
      customer_email: {
        type: Sequelize.STRING,
      },
      customer_phone: {
        type: Sequelize.INTEGER,
      },
      account_manager: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("suppliers", {
      supplier_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      products_type: {
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.STRING,
      },
      supplier_name: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("items", {
      item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_id: {
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.INTEGER,
      },
      model_name: {
        type: Sequelize.STRING,
      },
      supplier_id: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      unit_price: {
        type: Sequelize.INTEGER,
      },
      length: {
        type: Sequelize.INTEGER,
      },
      width: {
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("products_groups", {
      group_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("sales", {
      sales_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customer_id: {
        type: Sequelize.INTEGER,
      },
      group_id: {
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      supplier_id: {
        type: Sequelize.INTEGER,
      },
      account_manager: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      tax_exemption: {
        type: Sequelize.BOOLEAN,
      },
      vat: {
        type: Sequelize.DECIMAL,
      },
      selling_price: {
        type: Sequelize.INTEGER,
      },
      payment_method: {
        type: Sequelize.ENUM,
      },
      order_date: {
        type: Sequelize.DATE,
      },
      fullfillment_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("purchases", {
      purchase_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_id: {
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      supplier_id: {
        type: Sequelize.INTEGER,
      },
      account_manager: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      tax_exemption: {
        type: Sequelize.BOOLEAN,
      },
      vat: {
        type: Sequelize.DECIMAL,
      },
      selling_price: {
        type: Sequelize.INTEGER,
      },
      payment_method: {
        type: Sequelize.ENUM,
      },
      order_date: {
        type: Sequelize.DATE,
      },
      fullfillment_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("leaves", {
      leave_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM,
      },
      comments: {
        type: Sequelize.STRING,
      },
      start_time: {
        type: Sequelize.DATE,
      },
      end_time: {
        type: Sequelize.DATE,
      },
      leave_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("vacations", {
      vacation_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM,
      },
      comments: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("tickets", {
      ticket_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      resolution: {
        type: Sequelize.ENUM,
      },
      status: {
        type: Sequelize.ENUM,
      },
      updates: {
        type: Sequelize.STRING,
      },
      details: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("employees", {
      employee_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.INTEGER,
      },
      hire_date: {
        type: Sequelize.DATE,
      },
      department: {
        type: Sequelize.ENUM,
      },
      job_title: {
        type: Sequelize.STRING,
      },
      salary: {
        type: Sequelize.INTEGER,
      },
      password: {
        type: Sequelize.STRING,
      },
      manager_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("managers", {
      manager_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("customers");
    await queryInterface.dropTable("employees");
    await queryInterface.dropTable("items");
    await queryInterface.dropTable("leaves");
    await queryInterface.dropTable("managers");
    await queryInterface.dropTable("products_groups");
    await queryInterface.dropTable("purchases");
    await queryInterface.dropTable("sales");
    await queryInterface.dropTable("suppliers");
    await queryInterface.dropTable("tickets");
    await queryInterface.dropTable("vacations");
  },
};
