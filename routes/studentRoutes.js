const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Route for student login
router.get("/login", (req, res) => {
  res.render("student/login");
});

router.post("/login", studentController.login);

module.exports = router;
