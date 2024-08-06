const responseStatus = require("../functions/responseStatus");
const User = require("../models/user");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAll();
      responseStatus.common(res, users);
    } catch (error) {
      responseStatus.serverError(res, error);
    }
  },
};
