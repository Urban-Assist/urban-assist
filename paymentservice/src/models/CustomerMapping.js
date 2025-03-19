const { DataTypes } = require('sequelize');
const { db } = require('../config/db'); // Corrected the import path

const CustomerMapping = db.define("CustomerMapping", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerStripeID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = { CustomerMapping };