var express = require("express");
const { getAllStatuses } = require("../../controllers/statuses");
var router = express.Router();

router.get("/get", getAllStatuses);

module.exports = router;
