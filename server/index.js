const express = require("express");
const connectDb = require("./config/database.js");
const eventRoutes = require("./routes/index.js");
const cors = require("cors");

const app = express();

(async () => {
  const db = await connectDb();

  if (db) {
    console.log("Database connected...");
  } else {
    console.error("Unable to connect to any database.");
  }
})();

app.use(cors());
app.use(express.json());
app.use(eventRoutes);

app.listen(5000, () => console.log("Server running at port 5000"));
