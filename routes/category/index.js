var express = require("express");
const { getAllCategories } = require("../../controllers/categories");
var router = express.Router();

router.get("/get", getAllCategories);

module.exports = router;
