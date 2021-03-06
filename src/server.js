"use strict";

// Server Setup
const express = require("express");
const app = express();
const cors = require("cors");

// Routes & Dependencies
const authRoutes = require("./routes/auth-routes/index");
const scmRoutes = require("./routes/scm-routes/index");
const crmRoutes = require("./routes/crm-routes/index");
const hrRoutes = require("./routes/hr-routes/index");
const errorHandler = require("./middlewares/error-handlers/500");
const notFoundHandler = require("./middlewares/error-handlers/404");

// Middlewares
app.use(cors());
app.use(express.json());

// Routers

app.get("/", (req, res) => {
  res.status(200).send("server is up and running");
});
app.use(authRoutes);
app.use(scmRoutes);
app.use(crmRoutes);
app.use(hrRoutes);

// Error Handlers

app.use("*", notFoundHandler);
app.use(errorHandler);

// connect to sequelize & listen for requests
const start = (port) => {
  app.listen(port, () => console.log(`Running on Port ${port}`));
};

module.exports = {
  app: app,
  start: start,
};
