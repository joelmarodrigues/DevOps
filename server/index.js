import express from "express";
import connectDb from "./config/database.js";
import eventRoutes from "./routes/index.js";
import cors from "cors";

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

app.get('/api/server-status', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

app.listen(5000, () => console.log("Server running at port 5000"));