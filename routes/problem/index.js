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

router.post("/add", upload.fields([{ name: "image", maxCount: 1 }, { name: "image_cm", maxCount: 1 }]), addProblem);
router.put("/edit/:id", upload.fields([{ name: "image", maxCount: 1 }, { name: "image_cm", maxCount: 1 }]), updateProblem);
router.delete("/delete/:id", removeProblem);

module.exports = router;
