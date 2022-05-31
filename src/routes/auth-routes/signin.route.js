const express = require("express");
const router = express.Router();
const basicAuth = require("../../middlewares/auth/basic.auth");

// signup Function
function signinController(req, res) {
  res.status(200).json({
    email: req.user.email,
    token: req.user.token,
    actions: req.user.actions,
    jobTitle: req.user.job_title,
    name: `${req.user.first_name} ${req.user.last_name}`,
    id: req.user.employee_id,
  });
}

module.exports = router.post("/signin", basicAuth, signinController);
