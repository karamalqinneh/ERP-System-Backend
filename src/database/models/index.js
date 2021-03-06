"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          supportBigNumbers: true,
          bigNumberStrings: true,
        },
      }
    : {
        dialectOptions: {
          supportBigNumbers: true,
          bigNumberStrings: true,
        },
      };
const db = {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// items relations

db.products_groups.hasMany(db.items, { foreignKey: "group_id" });
db.items.belongsTo(db.products_groups, { foreignKey: "group_id" });

db.suppliers.hasMany(db.items, { foreignKey: "supplier_id" });
db.items.belongsTo(db.suppliers, { foreignKey: "supplier_id" });

db.items.hasMany(db.sales, { foreignKey: "item_id" });
db.sales.belongsTo(db.items, { foreignKey: "item_id" });

// suppliers relations

db.suppliers.hasOne(db.products_groups, { foreignKey: "group_id" });
db.products_groups.belongsTo(db.suppliers, { foreignKey: "group_id" });

db.suppliers.hasMany(db.purchases, { foreignKey: "supplier_id" });
db.purchases.belongsTo(db.suppliers, { foreignKey: "supplier_id" });

// purchases relations

db.products_groups.hasMany(db.purchases, { foreignKey: "group_id" });
db.purchases.belongsTo(db.products_groups, { foreignKey: "group_id" });

db.suppliers.hasMany(db.purchases, { foreignKey: "supplier_id" });
db.purchases.belongsTo(db.suppliers, { foreignKey: "supplier_id" });

db.purchases.hasMany(db.sales, { foreignKey: "supplier_id" });
db.sales.belongsTo(db.purchases, { foreignKey: "supplier_id" });

// customers relations

db.employees.hasMany(db.customers, { foreignKey: "account_manager" });
db.customers.belongsTo(db.employees, { foreignKey: "account_manager" });

db.tickets.hasMany(db.customers, { foreignKey: "customer_id" });
db.customers.belongsTo(db.tickets, { foreignKey: "customer_id" });

db.sales.hasMany(db.customers, { foreignKey: "customer_id" });
db.customers.belongsTo(db.sales, { foreignKey: "customer_id" });

// tickets realation

db.employees.hasMany(db.tickets, { foreignKey: "employee_id" });
db.tickets.belongsTo(db.employees, { foreignKey: "employee_id" });

// sales relations

db.suppliers.hasMany(db.sales, { foreignKey: "supplier_id" });
db.sales.belongsTo(db.suppliers, { foreignKey: "supplier_id" });

db.products_groups.hasMany(db.sales, { foreignKey: "group_id" });
db.sales.belongsTo(db.products_groups, { foreignKey: "group_id" });

db.employees.hasMany(db.sales, { foreignKey: "account_manager" });
db.sales.belongsTo(db.employees, { foreignKey: "account_manager" });

// leaves relations

db.employees.hasMany(db.leaves, { foreignKey: "employee_id" });
db.leaves.belongsTo(db.employees, { foreignKey: "employee_id" });

// vacations relations

db.employees.hasMany(db.vacations, { foreignKey: "employee_id" });
db.vacations.belongsTo(db.employees, { foreignKey: "employee_id" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
