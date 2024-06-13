import { Routes } from 'react-router-dom';
import { PathRouteProps } from 'react-router-dom';
import Login from '../pages/auth/Login';
import AddEmployeePage from '../pages/employees/AddEmployeePage';
import EmployeeListPage from '../pages/employees/EmployeeListPage';
import Dashboard from '../pages/dashboard/Dashboard';
import EmployeeProfilePage from '../pages/employees/EmployeeProfilePage';
import PaySlipPage from '../pages/payslips/PaySlipPage';
import ForgetPassword from '../components/views/auth/ForgetPassword';

export interface Routes {
 Component : () => JSX.Element;
 key:string;
 path: PathRouteProps['path'];
 layout?:string;
 isPrivate:boolean;
}

const routes: Routes[] = [
    {
        Component: Login,
        key:'Login',
        path: '/login',
        isPrivate:false,
    },
    {
        Component:Dashboard,
        key:'Dashboard',
        path:'/dashboard',
        isPrivate:true,
    },
    {
        Component: AddEmployeePage,
        key:'AddEmployeePage',
        path: '/addemployee',
        isPrivate:true,
    },
    {
        Component:EmployeeListPage,
        key:'EmployeeListPage',
        path: '/employeelist',
        isPrivate:true,
    },
    {
        Component:EmployeeProfilePage,
        key:'EmployeeProfilePage',
        path: '/employee/:employeeid',
        isPrivate:true
    },
    {
        Component:PaySlipPage,
        key:'PaySlipPage',
        path:'/payslippage',
        isPrivate:true,
    },
    {
        Component:ForgetPassword,
        key:'ForgetPassword',
        path: '/forgetpassword',
        isPrivate:true,
    }

];
export default routes;
