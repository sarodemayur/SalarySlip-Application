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
        isPrivate:false,
    },
    {
        Component: AddEmployeePage,
        key:'AddEmployeePage',
        path: '/addemployee',
        isPrivate:false
    },
    {
        Component:EmployeeListPage,
        key:'EmployeeListPage',
        path: '/employeelist',
        isPrivate:false
    },
    {
        Component:EmployeeProfilePage,
        key:'EmployeeProfilePage',
        path: '/employee/:employeeid',
        isPrivate:false
    },
    {
        Component:PaySlipPage,
        key:'PaySlipPage',
        path:'/payslippage',
        isPrivate:false
    },
    {
        Component:ForgetPassword,
        key:'ForgetPassword',
        path: '/forgetpassword',
        isPrivate:false
    }

];
export default routes;
