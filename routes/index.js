var express = require("express");
var router = express.Router();
const fs = require('fs');
const security = require("../functions/security");

router.use("/auth", require("./auth"));

// using middle ware auth
router.use("/users", security.verifyToken, require("./user"));
router.use("/shops", security.verifyToken, require("./shop"));
router.use("/lines", security.verifyToken, require("./line"));
router.use("/shifts", security.verifyToken, require("./shift"));
router.use("/categories", security.verifyToken, require("./category"));
router.use("/departments", security.verifyToken, require("./department"));
router.use("/statuses", security.verifyToken, require("./status"));
router.use("/problems", security.verifyToken, require("./problem"));


router.get('/file', (req, res) => {
  const path = req.query.path
  if (fs.existsSync(path)) {
    if (path.includes('pdf')) {
      res.contentType("application/pdf");
    }
    fs.createReadStream(path).pipe(res)
  } else {
    res.status(500)
    console.log('File not found')
    res.send('File not found')
  }
})

module.exports = router;
