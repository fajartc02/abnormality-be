const responseStatus = require("../functions/responseStatus");
const Line = require("../models/line");

module.exports = {
  getAllLines: async (req, res) => {
    try {
      const line = await Line.getAll();
      responseStatus.common(res, line);
    } catch (error) {
      console.log(error);
      responseStatus.serverError(res, error);
    }
  },
};
