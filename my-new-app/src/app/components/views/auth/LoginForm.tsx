import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = async(values: any) => {
    try {
      const response = await fetch(`http://localhost:3000/login`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(values),
      });

      if(!response.ok){
        throw new Error('Login Failed');
      }
      const data = await response.json();
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('userData', JSON.stringify(data));
      message.success("Login Successful");
      navigate('/dashboard')
    } catch (error) {
      console.error('Login Error:', error)
      message.error("Login Failed");
    }
  };

  const handleForgotPassword = () =>  {
    navigate('/forgetpassword');
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div style={{ width: '300px' }}>
        <h1 className='text-center font-bold mb-2'>Login</h1>
        <Form
          name="normal_login"
          className="login-form "
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, type:'email', message: 'Please type your Email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please type your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item>
            <div onClick={handleForgotPassword} className="login-form-forgot cursor-pointer" >
              Forgot password
            </div>
          </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;

