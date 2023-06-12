const express = require("express");
const router = express.Router();
const teacherAuth = require("../controllers/teacherAuth");

// Registration route
router.get("/register", (req, res) => {
  res.render("teacher/register"); // Assuming you have a "register.ejs" file in your views folder
});

router.post("/register", teacherAuth.registerController);

// Login route
router.get("/button",(req,res)=>{
    res.render("teacher/button")
})
router.get("/login", (req, res) => {
  res.render("teacher/login"); // Assuming you have a "login.ejs" file in your views folder
});

router.post("/login", teacherAuth.loginController);

module.exports = router;

