require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./models");

db.sequelize.sync().then(() => {
  console.log("Database synced.");
});

/* // Drop database and sync
db.sequelize.sync({ force: true }).then(() => {
  console.log("Database dropped & synced.");
}); */

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
const todoRoutes = require("./routes/todos");
app.use("/todos", todoRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
