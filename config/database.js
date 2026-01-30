require("dotenv").config();
const config = {
    DB_HOST: process.env.DB_HOST || "mt-system.id",
    DB_PORT: process.env.DB_PORT || 5311,
    DB_USER: process.env.DB_USER || "postgres",
    DB_NAME: process.env.DB_NAME || "abnormality_db",
    DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
    DB_SSL: process.env.DB_SSL || false,
    DB_URL: process.env.DB_URL ||
        "postgres://postgres:postgres@mt-system.id:5311/abnormality_db",
};

const knex = require("knex")({
    client: "pg",
    connection: {
        connectionString: config.DB_URL,
        host: config["DB_HOST"],
        port: config["DB_PORT"],
        user: config["DB_USER"],
        database: config["DB_NAME"],
        password: config["DB_PASSWORD"],
        timezone: "UTC",
    },
});

module.exports = knex;