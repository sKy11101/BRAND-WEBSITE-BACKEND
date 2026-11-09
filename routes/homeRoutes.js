const express = require("express");
const router = express.Router();
const { getHomeUsers } = require("../controllers/homeController");

router.get("/", getHomeUsers);
router.get("/about", (req, res)=>{
    res.send("Welcome to the about page of the website")
});
router.get("/contactus", (___, res)=>{
    res.send("welcome to the contact us page of the website")
});

module.exports = router;