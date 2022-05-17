const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const bcrypt = require("bcrypt");

// signup Function
const signupController = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const record = await database.employees.create(req.body);
    res.status(201).send(`You have successfully signed up`);
  } catch (error) {
    res.status(403).send("Error occurred");
  }
};

module.exports = router.post("/signup", signupController);
