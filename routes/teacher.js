const express = require("express");
const router = express.Router();
const teacherAuth = require("../controllers/teacherAuth");
const bodyParser = require("body-parser");

// Parse request bodies as JSON
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/register", teacherAuth.registerController);
router.post("/register", teacherAuth.registerController);

router.get("/login", teacherAuth.loginController);
router.post("/login", teacherAuth.loginController);

router.get("/dashboard");
router.post("/dashboard");

router.get("/portal", (req, res) => {
  res.render("teacher/portal");
});
router.post("/portal", (req, res) => {
  // Handle the POST request for "/portal" here
});


module.exports = router;
