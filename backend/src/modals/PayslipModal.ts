import { DataTypes, Model} from 'sequelize';
import sequelize from '../sequelize';

class Payslip extends Model {
    public allowance!: number;
    public basicsalary!:number;
    public bonus!:number;
    public deductions!:number;
    public grosssalary!:number;
    public netpay!:number;
    public payslipmonth!:Date;
    public professionaltax!:number;
    public providentfund!:number;
    public securitydeposits!:number;
    public totaldeductions!:number;
    public employeeId!:number;
}

Payslip.init(
    {
        allowance:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        basicsalary: {
            type:DataTypes.INTEGER,
            allowNull:false
        },
        bonus: {
            type:DataTypes.INTEGER,
            allowNull:true
        },
        deductions: {
            type:DataTypes.INTEGER,
            allowNull:true
        },
        grosssalary: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        netpay: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        payslipmonth: {
            type:DataTypes.DATE,
            allowNull:false
        },
        professionaltax: {
            type:DataTypes.INTEGER,
            allowNull:false
        },
        providentfund: {
            type: DataTypes.BIGINT,
            allowNull:false
        },
        securitydeposits: {
            type:DataTypes.BIGINT,
            allowNull:false
        },
        totaldeductions: {
            type:DataTypes.BIGINT,
            allowNull:true
        },
        employeeid : {
           type:DataTypes.INTEGER,
           allowNull:false,
           references: {
            model:'EmployeeData',
            key:'employeeid'
           }
        },
    },
    {
        sequelize,
        tableName:'Payslips'
    }
)

export default Payslip;