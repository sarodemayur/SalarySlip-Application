import { DataTypes, Model} from 'sequelize';
import sequelize from '../sequelize';

class Employee extends Model {
    public firstname!:string;
    public lastname!:string;
    public email!:string;
    public gender!:string;
    public contactno!:number;
    public address!:string;
    public designation!: string;
    public employeeid!:number;
    public role!:string;
    public password!:string; 
}

Employee.init(
    {
        firstname:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        lastname: {
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        gender: {
            type:DataTypes.STRING,
            allowNull:false
        },
        contactno: {
            type:DataTypes.INTEGER,
            allowNull:false
        },
        address: {
            type:DataTypes.STRING,
            allowNull:false
        },
        designation: {
            type : DataTypes.STRING,
            allowNull:false
        },
        employeeid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role: {
            type:DataTypes.STRING,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
    },
    {
        sequelize,
        tableName: 'EmployeeData',
    }
);

export default Employee;