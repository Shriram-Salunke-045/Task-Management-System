const User = require("./User");
const Task = require("./Task");
const TaskAssignment = require("./TaskAssignment");
const ActivityLog = require("./ActivityLog");

// Many-to-Many
User.belongsToMany(Task, {
  through: TaskAssignment,
});

Task.belongsToMany(User, {
  through: TaskAssignment,
});

// Creator
User.hasMany(Task, {
  foreignKey: "createdBy",
});

Task.belongsTo(User, {
  foreignKey: "createdBy",
});

// Activity Logs
User.hasMany(ActivityLog);

ActivityLog.belongsTo(User);

Task.hasMany(ActivityLog);

ActivityLog.belongsTo(Task);

module.exports = {
  User,
  Task,
  TaskAssignment,
  ActivityLog,
};