const responseStatus = require("../functions/responseStatus");
const Department = require("../models/department");

module.exports = {
  getAllDepartments: async (req, res) => {
    try {
      const department = await Department.getAll();
      responseStatus.common(res, department);
    } catch (error) {
      console.log(error);
      responseStatus.serverError(res, error);
    }
  },
};
