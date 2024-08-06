// models/User.js
const db = require("../config/database"); // Import your Knex instance
const tableName = "tb_m_shifts";

class Shift {
  constructor(columns = "*") {
    this.columns = columns;
  }

  static async getAll() {
    return db(tableName).select(this.columns);
  }

  static async getById(id) {
    return db(tableName).where({ id }).first();
  }

  static async create(payload) {
    return db(tableName).insert(payload).returning(this.columns);
  }

  static async update(id, updatedData) {
    return db(tableName)
      .where({ id })
      .update(updatedData)
      .returning(this.columns);
  }

  static async delete(id) {
    return db(tableName).where({ id }).del();
  }
}

module.exports = Shift;
