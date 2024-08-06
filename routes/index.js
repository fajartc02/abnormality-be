var express = require("express");
var router = express.Router();

router.use("/users", require("./user"));
router.use("/shops", require("./shop"));
router.use("/lines", require("./line"));
router.use("/shifts", require("./shift"));
router.use("/categories", require("./category"));
router.use("/departments", require("./department"));
router.use("/statuses", require("./status"));
router.use("/problems", require("./problem"));

module.exports = router;
