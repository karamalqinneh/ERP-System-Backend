const express = require("express");
const router = express.Router();
const basicAuth = require("../../middlewares/auth/basic.auth");

// signup Function
function signinController(req, res) {
  res.status(200).json({ email: req.user.email, token: req.user.token });
}

module.exports = router.post("/signin", basicAuth, signinController);
