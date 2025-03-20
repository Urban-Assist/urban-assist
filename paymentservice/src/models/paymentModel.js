const { DataTypes } = require('sequelize');
const { db } = require('../config/db'); // Corrected the import path

 
const StripePayment = db.define('StripePayment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stripePaymentId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  providerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = {  StripePayment };