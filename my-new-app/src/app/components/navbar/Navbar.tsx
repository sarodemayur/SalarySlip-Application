import React, { useContext } from 'react';
import { Menu, Switch } from 'antd';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined, FileOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css'; // Import the CSS file

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLoggedin = localStorage.getItem('isLoggedin');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('userData');
  };

  return (
    <div className="navbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 className="navbar-title">Techathalon-App</h2>
        {isLoggedin && userData && userData.firstname && (
          <NavLink to={`/employee/${userData.employeeid}`} end>
            <div className="user-box">
              {userData.firstname}
            </div>
          </NavLink>
        )}
      </div>
      <Menu theme={theme} mode="horizontal" style={{ display: 'flex', justifyContent: 'center', flex: '2' }}>
        <Menu.Item key="home" icon={<HomeOutlined />} className="menu-item">
          <NavLink to='/dashboard' end>
            Home
          </NavLink>
        </Menu.Item>
        {isLoggedin && userData.role === 'Admin' && (
          <>
            <Menu.Item key="addemployee" icon={<UserOutlined />} className="menu-item">
              <NavLink to={'/addemployee'} end>
                Add-Employee
              </NavLink>
            </Menu.Item>
            <Menu.Item key="employeelist" icon={<ShoppingCartOutlined />} className="menu-item">
              <NavLink to={'/employeelist'} end>
                EmployeeList
              </NavLink>
            </Menu.Item>
          </>
        )}
        <Menu.Item key='payslip' icon={<FileOutlined />} className="menu-item">
          <NavLink to={'/payslippage'} end>
            SalarySlips
          </NavLink>
        </Menu.Item>
        {!isLoggedin && (
          <Menu.Item key="login" icon={<UserOutlined />} className="menu-item">
            <NavLink to={'/login'} end>
              Login
            </NavLink>
          </Menu.Item>
        )}
        {isLoggedin && (
          <Menu.Item key="logout" className="menu-item" onClick={handleLogout}>
            Logout
          </Menu.Item>
        )}
      </Menu>
      <Switch
        checkedChildren="Dark"
        unCheckedChildren="Light"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        style={{ alignSelf: 'center' }}
      />
    </div>
  );
};

export default Navbar;
