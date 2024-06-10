import Payslip from '../modals/PayslipModal';
import { Op } from 'sequelize';

export const Add_Payslip = async (req, res) => {
  const {
    allowance,
    basicsalary,
    bonus,
    deductions,
    employeeid,
    grosssalary,
    netpay,
    payslipmonth,
    professionaltax,
    providentfund,
    securitydeposits,
    totaldeductions,
  } = req.body;

  try {
    const existingPayslip = await Payslip.findOne({
      where: {
        employeeid: employeeid,
        payslipmonth: {
          [Op.gte]: new Date(payslipmonth), // Greater than or equal to the selected month
          [Op.lt]: new Date(new Date(payslipmonth).setMonth(new Date(payslipmonth).getMonth() + 1)), // Less than the next month
        },
      },
    });

    if (existingPayslip) {
      return res
        .status(400)
        .json({ msg: 'Payslip Already Exists for this month' });
    }

    const newPayslip = await Payslip.create({
      allowance,
      basicsalary,
      bonus,
      deductions,
      employeeid,
      grosssalary,
      netpay,
      payslipmonth,
      professionaltax,
      providentfund,
      securitydeposits,
      totaldeductions,
    });
    return res.status(201).json(newPayslip);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: 'Somthing went wrong' });
  }
};

export const Get_Payslips = async(req,res) => {
  const {employeeid} = req.body;
  try {
    const payslip = await Payslip.findAll({where:{employeeid}})
    
    if(!payslip){
      return res.status(404).json({msg:"Payslip Not Found"});
    }
    return res.status(200).json(payslip);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: 'Somthing went wrong' });
  }
}

// Import necessary modules and models

export const Get_Payslips_By_Month = async (req, res) => {
  const { employeeid } = req.params;
  const { month } = req.query;

  try {
    // Parse the month parameter to get the start and end date of the month
    const [year, monthValue] = month.split('-');
    const startDate = new Date(parseInt(year), parseInt(monthValue) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(monthValue), 0);

    // Find payslips for the specified employee and within the selected month
    const payslips = await Payslip.findAll({
      where: {
        employeeid: employeeid,
        payslipmonth: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    if (!payslips || payslips.length === 0) {
      return res.status(404).json({ msg: 'Payslips not found for the specified month' });
    }

    return res.status(200).json(payslips);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};


