const bcrypt = require('bcryptjs');
const User = require('../models/user');
const responseStatus = require('./responseStatus');
const jwt = require("jsonwebtoken");

module.exports = {
  encryptPassword: async (password) => {
    var salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(password, salt);
    return hash
  },
  decryptPassword: async (password, hash) => {
    let is_correct = await bcrypt.compareSync(password, hash);
    if (is_correct) {
      return true
    }

    return false
  },

  verifyToken: async (req, res, next) => {
    try {
      let authorization = req.headers["authorization"];

      if (!authorization) {
        return responseStatus.notAllowed(res, "No token provide");
      }

      let token = authorization.split(" ")[1];
      if (!token) responseStatus.notAllowed(res, "No token provide");

      let userDataVerify = await jwt.verify(token, process.env.JWT_SECRET);
      let userData = await User.getById(userDataVerify.id);

      if (!userData) {
        return responseStatus.notAllowed(res, "Unauthorized");
      }

      req.user = userData;
      next();
    } catch (error) {
      console.log(error);
      responseStatus.notAllowed(res, "Token Is Invalid");
    }
  },
}