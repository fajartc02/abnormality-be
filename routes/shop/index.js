var express = require("express");
const { getAllShop } = require("../../controllers/shops");
var router = express.Router();

router.get("/get", getAllShop);

module.exports = router;
