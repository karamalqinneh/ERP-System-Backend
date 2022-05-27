const database = require("../../database/models/index");
const calculateLeaves = require("./calculateLeaves");
const calculateVacations = require("./calculateVacations");

const employeeAnnualBalance = async (id) => {
  const user = await database.employees.findOne({
    where: { employee_id: id },
  });
  const hiringDate = new Date(user.hire_date);
  const today = new Date();
  const epochToDays = Math.floor((today - hiringDate) / 8.64e7);
  const employeeBalance = (epochToDays / 30) * 1.2;
  const totalBalance =
    employeeBalance - calculateLeaves(id) / 8 - calculateVacations(id);
  return employeeBalance;
};

module.exports = employeeAnnualBalance;
