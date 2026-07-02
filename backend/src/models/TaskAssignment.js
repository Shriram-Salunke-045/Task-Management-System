const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TaskAssignment = sequelize.define(
  "TaskAssignment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    assignedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = TaskAssignment;