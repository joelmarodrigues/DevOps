const { Sequelize } = require('sequelize');
 
const server = {
  database: "devops_calendar",
  username: "root",
  password: "1234mudar",
  host: "35.193.37.252",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
};
 
const db = new Sequelize(server.database, server.username, server.password, {
  host: server.host,
  dialect: server.dialect,
  define: server.define
});
 
const connectDb = async () => {
  try {
    await db.authenticate();
    console.log("Connected to database successfully");
    await db.sync({ force: false });
    return db;
  } catch (error) {
    console.error("Unable to connect to database:", error.message);
    return null;
  }
};
 
module.exports = connectDb;
