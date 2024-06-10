import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined, FileOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [userData, setUserData] = useState<any>({});
  const isLoggedin = localStorage.getItem('isLoggedin');

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem('userData') || '{}');
    setUserData(userDataFromStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('userData');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e8e8e8', backgroundColor: '#001529', padding: '10px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ margin: 0, marginRight: '20px', color: '#fff' }}>Techathalon-App</h2>
        {isLoggedin && userData && userData.firstname && (
          <NavLink to={`/employee/${userData.employeeid}`} end>
            <div style={{ marginRight: '20px', color: '#000', backgroundColor: '#fff', padding: '5px 10px', borderRadius: '5px' }}>
              {userData.firstname}
            </div>
          </NavLink>
        )}
      </div>
      <Menu theme="dark" mode="horizontal" style={{ display: 'flex', justifyContent: 'center', flex: '2' }}>
        <Menu.Item key="home" icon={<HomeOutlined />} style={{ margin: '0 10px' }}>
          <NavLink to='/dashboard' end>
            Home
          </NavLink>
        </Menu.Item>
        {isLoggedin && userData.role === 'Admin' && (
          <>
            <Menu.Item key="addemployee" icon={<UserOutlined />} style={{ margin: '0 10px' }}>
              <NavLink to={'/addemployee'} end>
                Add-Employee
              </NavLink>
            </Menu.Item>
            <Menu.Item key="employeelist" icon={<ShoppingCartOutlined />} style={{ margin: '0 10px' }}>
              <NavLink to={'/employeelist'} end>
                EmployeeList
              </NavLink>
            </Menu.Item>
          </>
        )}
        <Menu.Item key='payslip' icon={<FileOutlined />} style={{ margin: '0 10px' }}>
          <NavLink to={'/payslippage'} end>
            SalarySlips
          </NavLink>
        </Menu.Item>
        {!isLoggedin && (
          <Menu.Item key="login" icon={<UserOutlined  />} style={{ margin: '0 10px' }}>
            <NavLink to={'/login'} end>
              Login
            </NavLink>
          </Menu.Item>
        )}
        {isLoggedin && (
          <Menu.Item key="logout" style={{ margin: '0 10px', color: '#fff' }} onClick={handleLogout}>
            Logout
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default Navbar;
