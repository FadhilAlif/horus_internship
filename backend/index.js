const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const router = require("./routes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

// Sinkronisasi database
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synchronized!");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
