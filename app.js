const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use(cors());
app.use(express.json());

app.use("/", homeRoutes)
app.use("/api/users", userRoutes);

module.exports = app;