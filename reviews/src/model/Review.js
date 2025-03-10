import { DataTypes } from "sequelize";
import { db } from "../db/db.js";

const Review = db.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  providerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  consumerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export { Review };