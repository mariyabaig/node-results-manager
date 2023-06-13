const express = require("express");
const router = express.Router();
const teacherAuth = require("../controllers/teacherAuth");

router.get("/register", teacherAuth.registerController);
router.post("/register", teacherAuth.registerController);

// <<<<<<< HEAD
// // Login route
// router.get("/button",(req,res)=>{
//     res.render("teacher/button")
// })
// router.get("/login", (req, res) => {
//   res.render("teacher/login"); // Assuming you have a "login.ejs" file in your views folder
// });

// router.get("/dashboard", (req, res) => {
//   res.render("teacher/dashboard"); // Assuming you have a "login.ejs" file in your views folder
// });

// router.post("/login", teacherAuth.loginController);
// router.post("/dashboard", teacherAuth.dashboardController);
// =======
router.get("/login", teacherAuth.loginController);
router.post("/login", teacherAuth.loginController);

router.get("/dashboard", teacherAuth.dashboardController);
router.post("/dashboard", teacherAuth.dashboardController);

router.get("/portal");
router.post("/portal");

// // router.get("/addmarks", teacherAuth.addMarksController);
// // router.post("/addmarks", teacherAuth.addMarksController);
// >>>>>>> 41a6c35 (teacher authentication routes corrected)

module.exports = router;
