const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");

const getGroupsController = async (req, res) => {
  try {
    let allGroups = await database.products_groups.findAll();
    let responseArray = allGroups.map((ele) => {
      return {
        id: ele["group_id"],
        groupName: ele["group_name"],
      };
    });
    res.status(200).json(responseArray);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get("/get-products", getGroupsController);
