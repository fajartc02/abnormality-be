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
const upload = require("../../functions/uploads");

router.get("/get", getAllProblems);
router.get("/get/:id", getProblemById);
router.get("/graph", getGraphProblem);

router.post("/add", upload.single("image"), addProblem);
router.put("/edit/:id", upload.single("image"), updateProblem);
router.delete("/delete/:id", removeProblem);

module.exports = router;
