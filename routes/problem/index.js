var express = require("express");
var router = express.Router();

const {
  getAllProblems,
  getGraphProblem,
  addProblem,
  getProblemById,
  updateProblem,
  removeProblem,
} = require("../../controllers/problems");

router.get("/get", getAllProblems);
router.get("/get/:id", getProblemById);
router.get("/graph", getGraphProblem);

router.post("/add", addProblem);
router.put("/edit/:id", updateProblem);
router.delete("/delete/:id", removeProblem);

module.exports = router;
