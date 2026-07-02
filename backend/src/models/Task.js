const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    status: {
      type: DataTypes.ENUM(
        "TODO",
        "IN_PROGRESS",
        "COMPLETED"
      ),
      defaultValue: "TODO",
    },

    createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
},

  },
  {
    timestamps: true,
  }
);

module.exports = Task;