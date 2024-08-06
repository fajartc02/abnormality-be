var express = require("express");
const { getAllShifts } = require("../../controllers/shifts");
var router = express.Router();

router.get("/get", getAllShifts);

module.exports = router;
