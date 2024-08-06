var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
const schemas = require("./schemas/schemas");

schemas.loadSchema();

var app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/abnormality", indexRouter);

module.exports = app;
