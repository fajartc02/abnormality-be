var express = require("express");
var router = express.Router();
const fs = require('fs')

router.use("/users", require("./user"));
router.use("/shops", require("./shop"));
router.use("/lines", require("./line"));
router.use("/shifts", require("./shift"));
router.use("/categories", require("./category"));
router.use("/departments", require("./department"));
router.use("/statuses", require("./status"));
router.use("/problems", require("./problem"));

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
