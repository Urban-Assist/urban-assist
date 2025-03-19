const { DataTypes } = require('sequelize');
const { db } = require('../config/db'); // Corrected the import path

const ProviderMapping = db.define("ProviderMapping", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  providerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  providerStripeID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  providerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  providerID: {
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

module.exports = { ProviderMapping };