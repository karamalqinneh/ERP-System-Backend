const database = require("../../database/models/index");

const calculateMonthlyVacations = async (id, month) => {
  let totalVacations = 0;
  const vacations = await database.vacations.findAll({
    where: {
      employee_id: id,
      status: "Approved",
    },
  });

  vacations.forEach((ele) => {
    if (month) {
      let startDate = new Date(ele.start_date);
      let endDate = new Date(ele.end_date);
      const epochToDays = Math.floor((endDate - startDate) / 8.64e7);
      if (endDate.getMonth() + 1 == month) totalVacations += epochToDays;
    } else {
      let startDate = new Date(ele.start_date);
      let endDate = new Date(ele.end_date);
      const epochToDays = Math.floor((endDate - startDate) / 8.64e7);
      totalVacations += epochToDays;
    }
  });
  return totalVacations;
};

module.exports = calculateMonthlyVacations;
