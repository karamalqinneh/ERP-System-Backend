const database = require("../../database/models/index");

const calculateTenure = async (id) => {
  const user = await database.employees.findOne({
    where: { employee_id: id },
  });

  const hiringDate = new Date(user.hire_date);
  const today = new Date();
  const epochToDays = Math.floor((today - hiringDate) / 8.64e7) / 30;
  return epochToDays;
};

module.exports = calculateTenure;
