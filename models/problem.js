// models/User.js
const knex = require("knex");
const db = require("../config/database"); // Import your Knex instance
const tableName = "tb_r_problems";
const moment = require("moment");

class Problem {
    constructor(columns = `${tableName}.*`) {
        this.columns = columns;
    }

    static async getAllWithPagination({
        // page = 1,
        // pageSize = 5,
        yearMonth,
        categoryId = null,
        filter = null,
    }) {
        let query = {};
        const pageSize = filter ? filter.pageSize : pageSize
        const page = filter ? filter.page : page
        if (filter) {
            delete filter.date
            delete filter.pageSize
            delete filter.page
            for (const key in filter) {
                const element = filter[key];
                if (element == 'null' || !element) continue
                query[key] = element
            }
        }

        const startOfMonth = moment(yearMonth)
            .startOf("month")
            .format("YYYY-MM-DD");
        const endOfMonth = moment(yearMonth).endOf("month").format("YYYY-MM-DD");

        categoryId ? (query.category_id = categoryId) : null;
        const [{ total }] = await db(tableName)
            .whereBetween("problem_date", [startOfMonth, endOfMonth])
            .andWhere(query)
            .count(`${tableName}.id as total`);

        const totalItems = parseInt(total, 10);
        const totalPages = Math.ceil(totalItems / pageSize);

        const data = await db(tableName)
            .join("tb_m_lines", `${tableName}.line_id`, "=", "tb_m_lines.id")
            .join("tb_m_shifts", `${tableName}.shift_id`, "=", "tb_m_shifts.id")
            .join("tb_m_departments", `${tableName}.department_id`, "=", "tb_m_departments.id")
            .join("tb_m_statuses", `${tableName}.status_id`, "=", "tb_m_statuses.id")
            .join("tb_m_categories", `${tableName}.category_id`, "=", "tb_m_categories.id")
            .rowNumber("no", function () {
                this.orderBy(`${tableName}.problem_date`);
            })
            .select(
                `${tableName}.*`,
                db.raw(`CASE
        WHEN EXTRACT(DAY FROM problem_date) BETWEEN 1 AND 7 THEN 'W1'
        WHEN EXTRACT(DAY FROM problem_date) BETWEEN 8 AND 14 THEN 'W2'
        WHEN EXTRACT(DAY FROM problem_date) BETWEEN 15 AND 21 THEN 'W3'
        ELSE 'W4'
      END AS week_id`),
                `tb_m_lines.sname as line_nm`,
                `tb_m_shifts.name as shift_nm`,
                `tb_m_departments.sname as department_nm`,
                `tb_m_statuses.name as status_nm`,
                `tb_m_categories.name as category_nm`,
                `tb_m_statuses.img as img`,
            )
            .whereBetween("problem_date", [startOfMonth, endOfMonth])
            .andWhere(query)
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .orderBy("problem_date", "asc");

        return { data, totalPages, totalItems, currentPage: page };
    }

    static async getAll({
        page = null,
        pageSize = null,
        yearMonth,
        categoryId = null,
        filter = null
    }) {
        let query = {};
        if (filter) {
            delete filter.date
            for (const key in filter) {
                const element = filter[key];
                if (element == 'null' || !element) continue
                query[key] = element
            }
        }

        const startOfMonth = moment(yearMonth)
            .startOf("month")
            .format("YYYY-MM-DD");
        const endOfMonth = moment(yearMonth).endOf("month").format("YYYY-MM-DD");

        categoryId ? (query.category_id = categoryId) : null;
        return db(tableName)
            // .count(`${tableName}.id as total`)
            .join("tb_m_lines", `${tableName}.line_id`, "=", "tb_m_lines.id")
            .join("tb_m_shifts", `${tableName}.shift_id`, "=", "tb_m_shifts.id")
            .join(
                "tb_m_departments",
                `${tableName}.department_id`,
                "=",
                "tb_m_departments.id"
            )
            .join("tb_m_statuses", `${tableName}.status_id`, "=", "tb_m_statuses.id")
            .join(
                "tb_m_categories",
                `${tableName}.category_id`,
                "=",
                "tb_m_categories.id"
            )
            .rowNumber("no", function () {
                this.orderBy(`${tableName}.problem_date`);
            })
            .select(
                `${tableName}.*`,
                db.raw(`CASE
          WHEN EXTRACT(DAY FROM problem_date) BETWEEN 1 AND 7 THEN 'W1'
          WHEN EXTRACT(DAY FROM problem_date) BETWEEN 8 AND 14 THEN 'W2'
          WHEN EXTRACT(DAY FROM problem_date) BETWEEN 15 AND 21 THEN 'W3'
          ELSE 'W4'
        END AS week_id`),
                `tb_m_lines.sname as line_nm`,
                `tb_m_shifts.name as shift_nm`,
                `tb_m_departments.sname as department_nm`,
                `tb_m_statuses.name as status_nm`,
                `tb_m_categories.name as category_nm`,
                `tb_m_statuses.img as img`,
            )
            .whereBetween("problem_date", [`${startOfMonth}`, `${endOfMonth}`])
            .where(query)
            .limit(pageSize || 1000)
            .offset(((page || 1) - 1) * (pageSize || 10))
            .orderBy("problem_date", "asc");
    }

    static async getAllYearly({
        page = null,
        pageSize = null,
        yearMonth,
        categoryId = null,
    }) {
        let query = {};
        const startOfMonth = moment(yearMonth).startOf("year").format("YYYY-MM-DD");
        const endOfMonth = moment(yearMonth).endOf("year").format("YYYY-MM-DD");
        console.log(startOfMonth, endOfMonth);

        categoryId ? (query.category_id = categoryId) : null;
        return db(tableName)
            .join("tb_m_lines", `${tableName}.line_id`, "=", "tb_m_lines.id")
            .join("tb_m_shifts", `${tableName}.shift_id`, "=", "tb_m_shifts.id")
            .join(
                "tb_m_departments",
                `${tableName}.department_id`,
                "=",
                "tb_m_departments.id"
            )
            .join("tb_m_statuses", `${tableName}.status_id`, "=", "tb_m_statuses.id")
            .join(
                "tb_m_categories",
                `${tableName}.category_id`,
                "=",
                "tb_m_categories.id"
            )
            .rowNumber("no", function () {
                this.orderBy(`${tableName}.id`);
            })
            .select(
                `${tableName}.*`,
                `tb_m_lines.sname as line_nm`,
                `tb_m_shifts.name as shift_nm`,
                `tb_m_departments.sname as department_nm`,
                `tb_m_statuses.name as status_nm`,
                `tb_m_categories.name as category_nm`,
                `tb_m_statuses.img as img`
            )
            .whereBetween("problem_date", [`${startOfMonth}`, `${endOfMonth}`])
            .where(query)
            .limit(pageSize || 1000)
            .offset(((page || 1) - 1) * (pageSize || 10))
            .orderBy("problem_date", "asc");
    }

    static async getGraph({ yearMonth }) {
        const result = await db(tableName)
            .join("tb_m_lines", `${tableName}.line_id`, "=", "tb_m_lines.id")
            .join("tb_m_shops", `${"tb_m_lines"}.shop_id`, "=", "tb_m_shops.id")
            .select(
                db.raw(`CASE
          WHEN EXTRACT(DAY FROM problem_date) BETWEEN 1 AND 7 THEN 'W1'
          WHEN EXTRACT(DAY FROM problem_date) BETWEEN 8 AND 14 THEN 'W2'
          WHEN EXTRACT(DAY FROM problem_date) BETWEEN 15 AND 21 THEN 'W3'
          ELSE 'W4'
        END AS week`),
                db.raw(`COUNT(${tableName}.id) AS total_problems`),
                `${"tb_m_shops"}.id AS shop_id`
            )
            .whereRaw("EXTRACT(MONTH FROM problem_date) = 8") // Filter for August (month 8)
            .groupBy("week", `${"tb_m_shops"}.id `)
            .orderBy(["week", "shop_id"]);
        // console.log(result);

        // const dataCte = db(tableName)
        //   .join("tb_m_lines", `${tableName}.line_id`, "=", "tb_m_lines.id")
        //   .join("tb_m_shifts", `${tableName}.shift_id`, "=", "tb_m_shifts.id")
        //   .join(
        //     "tb_m_departments",
        //     `${tableName}.department_id`,
        //     "=",
        //     "tb_m_departments.id"
        //   )
        //   .join("tb_m_statuses", `${tableName}.status_id`, "=", "tb_m_statuses.id")
        //   .join(
        //     "tb_m_categories",
        //     `${tableName}.category_id`,
        //     "=",
        //     "tb_m_categories.id"
        //   )
        //   .join("tb_m_shops", `tb_m_lines.shop_id`, "=", "tb_m_shops.id")

        //   .select(
        //     `tb_m_shops.sname as shop_nm`
        //     // `tb_m_departments.sname as deptartment_nm`
        //   )
        //   .count(`${tableName}.id as total`)
        //   .groupBy(
        //     "tb_m_shops.sname"
        //     // "tb_m_departments.sname"
        //   )
        //   .whereBetween("problem_date", [`${yearMonth}-01`, `${yearMonth}-31`]);
        // const data = db(tableName)
        // .with("countProblem", dataCte)
        // .select("*")

        //   // return dataCte;
        // // const problem = db(tableName).with;
    }

    static async getById(id) {
        return db(tableName).where({ id }).first();
    }

    static async create(payload) {
        const generateId = await db(tableName).max("id").first().then((res) => {
            return res.max + 1;
        });
        payload.id = generateId;
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

module.exports = Problem;