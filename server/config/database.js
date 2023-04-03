import { Sequelize } from "sequelize";

/* Server */
const server = {
  database: "DevOps_Calendar",
  username: "root",
  password: "#QN-*E$dT+@^i,YH",
  host: "35.193.37.252",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
};


/* Localhost */
const localhost = {
  database: "DevOps_Calendar", 
  username: "root", // Change this to your username
  password: "gds437", // Change this to your password
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
};

const db1 = new Sequelize(server);
const db2 = new Sequelize(localhost);

const connectDb = async () => {
  try {
    await db1.authenticate();
    console.log("Connected to server successfully");
    await db1.sync({ force: false });
    return db1;
  } catch (error) {
    console.error("Unable to connect to server:", error.message);

    try {
      await db2.authenticate();
      console.log("Connected to localhost successfully");
      await db2.sync({ force: false });
      return db2;
    } catch (error) {
      console.error("Unable to connect to localhost:", error.message);
      return null;
    }
  }
};

export default connectDb;
