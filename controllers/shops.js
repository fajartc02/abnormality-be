const responseStatus = require("../functions/responseStatus");
const Shop = require("../models/shop");

module.exports = {
  getAllShop: async (req, res) => {
    try {
      const shopData = await Shop.getAll();
      responseStatus.common(res, shopData);
    } catch (error) {
      console.log(error);

      responseStatus.serverError(res, error);
    }
  },
};
