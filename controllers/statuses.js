const responseStatus = require("../functions/responseStatus");
const Status = require("../models/status");

module.exports = {
  getAllStatuses: async (req, res) => {
    try {
      const status = await Status.getAll();
      responseStatus.common(res, status);
    } catch (error) {
      console.log(error);
      responseStatus.serverError(res, error);
    }
  },
};
