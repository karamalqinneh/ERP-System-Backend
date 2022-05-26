const database = require("../../database/models/index");

const generateSalarySlip = async (id, month) => {
  const employee = await database.employees.findOne({
    where: { employee_id: id },
  });
  const employeeFinancials = await database.employees_financials.findAll({
    where: { employee_id: id },
  });
  //   console.log(employeeFinancials);
  const basicSalary = employee.salary;
  const hourlyRate = basicSalary / 180;
  const otDuration = employeeFinancials.reduce((acc, rec) => {
    if (rec.ot_duration == null) {
      return acc;
    } else {
      let otMonth = new Date(rec.ot_date).getMonth() + 1;
      if (otMonth == month) {
        return acc + parseInt(rec.ot_duration);
      } else {
        return acc;
      }
    }
  }, 0);
  const otPayment = parseInt((hourlyRate * otDuration * 1.5).toFixed(2));
  const totalpayemnt = otPayment + basicSalary;
  const socialSecurity = basicSalary * 0.0725;
  const otherDeductions = employeeFinancials.reduce((acc, rec) => {
    if (rec.deduction_amount == null) {
      return acc;
    } else {
      let otMonth = new Date(rec.deduction_date).getMonth() + 1;
      if (otMonth == month) {
        return acc + parseInt(rec.deduction_amount);
      } else {
        return acc;
      }
    }
  }, 0);
  const totalBonuses = employeeFinancials.reduce((acc, rec) => {
    if (rec.bonus_amount == null) {
      return acc;
    } else {
      let otMonth = new Date(rec.bonus_date).getMonth() + 1;
      if (otMonth == month) {
        return acc + parseInt(rec.bonus_amount);
      } else {
        return acc;
      }
    }
  }, 0);
};

module.exports = generateSalarySlip;
