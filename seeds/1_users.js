const User = require("../models/user");

exports.seed = function () {
  const bcrypt = require("bcryptjs");
  const password = "admin";
  const hash = bcrypt.hashSync(password, 10);
  const { v4: uuidv4 } = require("uuid");

  return User.create({
    uuid: uuidv4(),
    name: "admin",
    email: "admin",
    password: hash,
    noreg: "admin",
  });
};
