const responseStatus = require("../functions/responseStatus");
const { v4: uuidv4 } = require("uuid");
const security = require("../functions/security");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const emailValidation = require("../functions/emailValidation");

module.exports = {
  login: async (req, res) => {
    try {
      const { noreg, password } = req.body
      if (!noreg || noreg === '' ||
        !password || password === '' &&
        typeof noreg !== 'string' && typeof password !== 'string') {
        responseStatus.notAllowed(res);
        return;
      }

      if (Object.keys(req.body).length > 2) {
        responseStatus.notAllowed(res);
        return;
      }

      const user = await User.getByNoreg(noreg);
      if (!user) {
        responseStatus.notFound(res);
        return;
      }

      const isMatch = await security.decryptPassword(password, user.password);
      if (!isMatch) {
        responseStatus.notFound(res);
        return;
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d", issuer: "secure-app",
          audience: "users",
        }
      )

      responseStatus.success(res, { token });
      return;
    } catch (error) {
      console.log(error);
      responseStatus.error(res, 'Internal Server Error');
    }
  },
  register: async (req, res) => {
    try {
      const { name, noreg, email, password } = req.body

      if (!name || !email || !password || !noreg ||
        typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || typeof noreg !== 'string' ||
        name === '' || email === '' || password === '' || noreg === ''
      ) {
        responseStatus.notAllowed(res);
        return;
      }

      if (Object.keys(req.body).length > 4) {
        responseStatus.notAllowed(res);
        return;
      }

      if (!emailValidation(email)) {
        responseStatus.notAllowed(res);
        return;
      }

      req.body.uuid = uuidv4();

      const encryptPass = await security.encryptPassword(password)
      req.body.password = encryptPass

      await User.create(req.body);
      responseStatus.success(res, 'Success to create user');
      return;
    } catch (error) {
      console.log(error);
      responseStatus.error(res, 'Internal Server Error');
      return;
    }
  },
  verify: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.getById(decoded.id);
      if (!user) {
        responseStatus.notFound(res);
        return;
      }

      responseStatus.success(res, 'Verified');
      return;
    } catch (error) {
      if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
        responseStatus.unAuthorized(res);
        return;
      }

      responseStatus.error(res, 'Internal Server Error');
      return;
    }
  }
};