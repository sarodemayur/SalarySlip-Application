import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm } from 'react-hook-form';

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => void;
}

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const { handleSubmit, register } = useForm<SignUpFormData>();

  const handleFormSubmit = (data: SignUpFormData) => {
    onSubmit(data);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '300px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold'}}></h2>
    <Form onFinish={handleSubmit(handleFormSubmit)}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please enter your username' }]}
      >
        <Input {...register('username')} />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email' }]}
      >
        <Input type="email" {...register('email')} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password {...register('password')} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};

export default SignUpForm;
