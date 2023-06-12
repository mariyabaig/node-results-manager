const express = require("express");
const router = express.Router();
const marksController = require("../controllers/marksController");

// GET route to render the add result form
router.get("/addresult", marksController.renderAddResultForm);

// POST route to handle the form submission and add a new result
router.post("/addresult", marksController.addResult);

module.exports = router;
