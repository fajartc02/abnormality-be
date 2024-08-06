const responseStatus = require("../functions/responseStatus");
const Category = require("../models/category");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const category = await Category.getAll();
      responseStatus.common(res, category);
    } catch (error) {
      console.log(error);
      responseStatus.serverError(res, error);
    }
  },
};
