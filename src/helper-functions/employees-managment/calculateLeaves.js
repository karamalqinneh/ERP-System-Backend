const database = require("../../database/models/index");

const calculateMonthlyLeaves = async (id, month) => {
  let totalLeaves = 0;
  const leaves = await database.leaves.findAll({
    where: { employee_id: id, status: "Approved" },
  });

  leaves.forEach((ele) => {
    if (month) {
      let leaveMonth = new Date(ele.leave_date).getMonth();
      let startTime = new Date("01/01/2007 " + ele.start_time).getHours();
      let endTime = new Date("01/01/2007 " + ele.end_time).getHours();
      if (leaveMonth + 1 == month)
        totalLeaves = totalLeaves + (endTime - startTime);
    } else {
      let startTime = new Date("01/01/2007 " + ele.start_time).getHours();
      let endTime = new Date("01/01/2007 " + ele.end_time).getHours();
      totalLeaves = totalLeaves + (endTime - startTime);
    }
  });

  return totalLeaves;
};

module.exports = calculateMonthlyLeaves;
