const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use(cors());
app.use(express.json());

app.use("/", homeRoutes)
app.use("/api/otp/verify/", (req, res) => {
    res.json({
        "message": "Message: The route http://localhost:3000/api/otp/verify was hit"
    })
    console.log("Console: The route http://localhost:3000/api/otp/verify was hit");
})
app.use("/api/otp/send/", (req, res)=>{
    res.json({
        "message": "Message: The route http://localhost:3000/otp/send/ was hit"
    })
    console.log("Console: The route http://localhost:3000/otp/send/ was hit")
})
app.use("/api/forms/submit/", (req, res)=>{
    res.json({
        "message": "Message: The route http://localhost:3000/api/forms/submit was hit"
    })
    console.log("Console: The route http://localhost:3000/api/forms/submit was hit")
})
app.use("/api/users", userRoutes);

module.exports = app;