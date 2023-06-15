// const express = require("express");
// const router = express.Router();
// const marksController = require("../controllers/marksController");

// // GET route to render the add result form
// // router.get("/addresult", marksController.renderAddResultForm);
// // router.post("/addresult", marksController.renderAddResultForm);

// // POST route to handle the form submission and add a new result
// router.get("/addresult", marksController.addResult);
// router.post("/addresult", marksController.addResult);

// module.exports = router;
const express = require("express");
const router = express.Router();
const marksController = require("../controllers/marksController");

// Route to render the add result form
router.get("/addresult", marksController.renderAddResultForm);

// Route to handle adding a result
router.post("/addresult", marksController.addResult);

// Route to view a specific result
router.get("/result/:rollNumber", marksController.viewResult);

// Route to edit a specific result
router.put("/result/:rollNumber", marksController.editResult);

// Route to delete a specific result
router.delete("/result/:rollNumber", marksController.deleteResult);

// Route to render the teacher's dashboard
router.get("/dashboard", marksController.renderDashboard);



// Route to view all the results
router.get("/results", marksController.viewAllResults);

module.exports = router;
