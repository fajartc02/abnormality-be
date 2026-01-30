var express = require("express");
const { login, register, verify } = require("../../controllers/auth");
const { body, validationResult } = require("express-validator");
var router = express.Router();

router.post("/login", body("noreg").trim().isLength({ min: 3 }),
  body("password").isLength({ min: 8 }), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, login);

router.post("/register", register);
router.post("/verify", verify);

module.exports = router;
