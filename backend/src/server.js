require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");
const User = require("./models/User");
const Task = require("./models/Task");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL Database");

    require("./models");

    await sequelize.sync({ alter: true });

    console.log("✅ Database Synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();