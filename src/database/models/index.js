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
        },
      }
    : {};
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

db.products_groups.hasMany(db.items, { foreignKey: "group_id" });
db.items.belongsTo(db.products_groups, { foreignKey: "group_id" });

db.suppliers.hasMany(db.items, { foreignKey: "supplier_id" });
db.items.belongsTo(db.suppliers, { foreignKey: "supplier_id" });

db.sales.hasMany(db.items, { foreignKey: "item_id" });
db.items.belongsTo(db.sales, { foreignKey: "item_id" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
