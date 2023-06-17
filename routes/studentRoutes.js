const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const bodyParser = require("body-parser");


// Parse request bodies as JSON
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// Route for student login
router.get("/login", (req, res) => {
  res.render("student/login");
});

router.post("/login", studentController.login);
router.get("/result", (req, res) => {
  res.render("student/result");
});


module.exports = router;
