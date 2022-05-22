"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const database = require("../../database/models/index");
const bearerAuth = require("../../middlewares/auth/bearer.auth");
const aclAuth = require("../../middlewares/auth/ACL.auth");
require("dotenv").config();

const updateUserInfoController = async (req, res, next) => {
  let uid = parseInt(req.params.id);
  let fetchedUser = await database.employees.findOne({
    where: { employee_id: uid },
  });
  req.body.password = await bcrypt.hash(
    req.body.password,
    process.env.HASH_INDEX
  );
  if (fetchedUser) {
    let userUpdated = await database.employees.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        department: req.body.department,
        job_title: req.body.job_title,
        salary: req.body.salary,
        manager_id: req.body.manager_id,
        role: req.body.role,
      },
      { where: { employee_id: uid } }
    );

    if (userUpdated) {
      res.status(200).json({ message: "user have been Updeted" });
    } else {
      res.status(500).json(` error: ${error} from update user`);
    }
  } else {
    res.status(500).json(`user: ${uid} doesn't exist`);
  }
};

module.exports = router.put(
  "/user/update/:id",
  bearerAuth,
  aclAuth("employee"),
  updateUserInfoController
);
