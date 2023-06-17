
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

router.get("/portal", (req, res) => {
  res.render("teacher/portal");
});
router.post("/portal", (req, res) => {
  // Handle the POST request for "/portal" here
});

// Route to render the add result form
router.get("/addresult", teacherAuth.addResult);

// Route to handle adding a result
router.post("/addresult", teacherAuth.addResult);

// Route to view a specific result
router.get("/result/:rollNumber", teacherAuth.viewResult);

// Route to edit a specific result
// router.get("/edit/:rollNumber", teacherAuth.editResult, (req,res)=>{
//   res.render("teacher/edit")
// })
router.get("/edit/:rollNumber", teacherAuth.editResult);
router.put("/edit/:rollNumber", teacherAuth.editResult);

// Route to delete a specific result
router.delete("/delete/:rollNumber", teacherAuth.deleteResult);

// Route to render the teacher's dashboard
router.get("/dashboard", teacherAuth.renderDashboard);

// Route to view all the results
router.get("/results", teacherAuth.viewAllResults);

module.exports = router;
