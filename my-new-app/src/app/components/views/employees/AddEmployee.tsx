import React from 'react';
import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import './AddEmployee.css';

const { Option } = Select;

const AddEmployee: React.FC = () => {
    const onFinish = async(values:any) => {
        console.log('Recieved Values: ', values);
        try {
          const response = await fetch(`http://localhost:3000/addemployee`, {
            method:'POST',
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(values),
          });
          if(!response.ok){
            throw new Error('Operation failed')
          }
          const data = await response.json();
          message.success('Employee Added Successfully');
          console.log(data);
        } catch (error) {
          console.error('Error:', error)
          message.error('Failed to Add Employee');
        }
    }
    return(
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <div style={{ width: '300px' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>AddEmployee</h2>
      <Form 
      name='add_employee'
      labelCol={{span:8}}
      wrapperCol={{span:16}}
      onFinish={onFinish}
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="ContactNo"
          name="contactno"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Designation"
          name="designation"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Employee Id"
          name="employeeid"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select role!' }]}
        >
          <Select>
            <Option value="Admin">Admin</Option>
            <Option value="Hr">HR</Option>
            <Option value="Developer">Developer</Option>
            <Option value="Tester">Tester</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please Enter Your Password' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
);
};
export default AddEmployee;
