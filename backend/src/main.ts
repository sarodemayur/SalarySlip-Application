import express from 'express';
import cors from 'cors';
import { login } from './controllers/userController';
import sequelize from './sequelize';
import { Add_Employee, Get_EmployeeById, Update_EmployeeData } from './controllers/AddEmployeeController';
import { Get_Employee } from './controllers/AddEmployeeController';
import { Add_Payslip, Get_Payslips, Get_Payslips_By_Month } from './controllers/AddPayslipController';
import Payslip from './modals/PayslipModal';
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.post('/login', login);
app.post('/addemployee',Add_Employee);
app.get('/getallemployees',Get_Employee);
app.post('/addpayslip', Add_Payslip);
app.post('/employeebyid', Get_EmployeeById);
app.post('/getpayslip', Get_Payslips);
app.get('/payslips/:employeeid', Get_Payslips_By_Month);
app.post('/updateemployeedata', Update_EmployeeData);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await Payslip.sync({force:true});
    await sequelize.sync(); // Sync models with the database (creates tables if they don't exist)
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
