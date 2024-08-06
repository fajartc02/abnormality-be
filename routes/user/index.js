var express = require("express");
const { getAllUsers } = require("../../controllers/users");
var router = express.Router();

/* GET users listing. */
router.get("/get", getAllUsers);

module.exports = router;
