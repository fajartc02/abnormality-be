const responseStatus = require("../functions/responseStatus");
const Shift = require("../models/shift");

module.exports = {
  getAllShifts: async (req, res) => {
    try {
      const shift = await Shift.getAll();
      responseStatus.common(res, shift);
    } catch (error) {
      console.log(error);
      responseStatus.serverError(res, error);
    }
  },
};
