var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const { default: helmet } = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const { default: rateLimit } = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");

var indexRouter = require("./routes/index");
const schemas = require("./schemas/schemas");

schemas.loadSchema();

var app = express();

/* ---------------- SECURITY HEADERS ---------------- */
app.use(
  helmet({
    contentSecurityPolicy: false, // enable if no inline scripts
  })
);

/* ---------------- BODY PARSING ---------------- */
app.use(express.json({ limit: "20mb" }));

/* ---------------- SANITIZATION ---------------- */
app.use(mongoSanitize()); // NoSQL injection
app.use(xss());           // XSS
app.use(hpp());           // HTTP Parameter Pollution

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, slow down",
});
app.use(limiter);

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

module.exports = app;
