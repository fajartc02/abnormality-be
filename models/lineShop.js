// models/User.js
const db = require("../config/database"); // Import your Knex instance
const tableName = "tb_m_lines";

class ShopLine {
  constructor(columns = "*") {
    this.columns = columns;
  }

  static async getAll(columns = "*") {
    return db(tableName)
      .join("tb_m_shops", "tb_m_lines.shop_id", "=", "tb_m_shops.id")
      .select(columns);
  }

  static async getById(id) {
    return db(tableName)
      .join("tb_m_shops", "tb_m_lines.shop_id", "=", "tb_m_shops.id")
      .select(this.columns)
      .where({ id })
      .first();
  }
}

module.exports = ShopLine;
