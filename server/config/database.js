import { Sequelize } from "sequelize";

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

const db = new Sequelize(server);

const connectDb = async () => {
  try {
    await db.authenticate();
    console.log("Connected to server successfully");
    await db.sync({ force: false });
    return db;
  } catch (error) {
    console.error("Unable to connect to server:", error.message);
    return null;
  }
};

export default connectDb;
