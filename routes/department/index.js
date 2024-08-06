var express = require("express");
const { getAllDepartments } = require("../../controllers/departments");
var router = express.Router();

router.get("/get", getAllDepartments);

module.exports = router;
