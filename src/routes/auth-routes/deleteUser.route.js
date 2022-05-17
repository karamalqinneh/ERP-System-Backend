"use strict";

const database = require("../../database/models/index");
const bearerAuth = require("../../middlewares/auth/bearer.auth");
const aclAuth = require("../../middlewares/auth/ACL.auth");
require("dotenv").config();

const deleteUserController = async (req, res, next) => {
  let uid = parseInt(req.params.id);
  try {
    let fetchedUser = await database.employees.findOne({
      where: { employee_id: uid },
    });
    if (fetchedUser) {
      await database.employees.destroy({ where: { employee_id: uid } });

      res.status(201).json({ message: "deleted successfully" });
    } else {
      res.status(500).json(`user id: ${uid} doesn't exist`);
    }
  } catch (error) {
    res.status(500).json(`error: ${error} from delete user end point`);
  }
};

module.exports = router.delete(
  "/user/delete/:id",
  bearerAuth,
  aclAuth("admin"),
  deleteUserController
);
