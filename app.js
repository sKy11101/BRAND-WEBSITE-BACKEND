const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.use("/", (req, res)=> {
    res.json({
        message: "Hello from Node.js!",
        users: ["Samarth", "John", "David"]
    });
})

app.use("/api/users", userRoutes);

module.exports = app;