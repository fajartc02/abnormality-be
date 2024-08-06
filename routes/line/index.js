var express = require("express");
const { getAllLines } = require("../../controllers/lines");
var router = express.Router();

router.get("/get", getAllLines);

module.exports = router;
