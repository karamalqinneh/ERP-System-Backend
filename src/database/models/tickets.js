'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tickets.init({
    ticket_id: DataTypes.INTEGER,
    resolution: DataTypes.ENUM,
    status: DataTypes.ENUM,
    updates: DataTypes.STRING,
    details: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tickets',
  });
  return tickets;
};