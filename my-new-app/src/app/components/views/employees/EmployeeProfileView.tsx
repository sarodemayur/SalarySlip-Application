import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Input,
  DatePicker,
  Modal,
  Form,
  Divider,
  Typography,
  Row,
  Col,
  InputNumber,
} from 'antd';
import moment from 'moment';
import '../payslips/Payslipview.css';

interface EmployeeDetails {
  firstname: string;
  lastname: string;
  email: string;
  contactno: string;
  role: string;
}

const EmployeeProfileView: React.FC = () => {
  const [userData, setUserData] = useState<EmployeeDetails>({
    firstname: '',
    lastname: '',
    email: '',
    contactno: '',
    role: '',
  });

  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem('userData') || '{}')
  );
  const employeeid = user.employeeid;
  const [editable, setEditable] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [payslips, setPayslips] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');

  useEffect(() => {
    // Retrieve userData from localStorage
    const userDataFromStorage = JSON.parse(
      localStorage.getItem('userData') || '{}'
    );
    setUserData(userDataFromStorage);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    setEditable(false);
    // Here you can update the userData in localStorage or send it to backend
    try {
      const response = await fetch('http://localhost:3000/updateemployeedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeid, userData }),
      });
      if (response.ok) {
        console.log('Employee data updated successfully');
      } else {
        console.error('Failed to update employee data');
      }
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
    console.log('Updated userData:', userData);
  };

  const GetEmployees = async () => {
    try {
      const response = await fetch(`http://localhost:3000/employeebyid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeid }),
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error in Getting Employee:', error);
    }
  };

  useEffect(() => {
    GetEmployees();
  }, []);

  const handleMonthChange = (date: any, dateString: string | string[]) => {
    if (typeof dateString === 'string') {
      setSelectedMonth(dateString);
    }
  };

  const handleViewPayslip = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/payslips/${user.employeeid}?month=${selectedMonth}`
      );
      if (!response) {
        setModalContent('No payslips found for the selected month');
        setModalVisible(true);
      }
      const data = await response.json();
      setPayslips(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching payslips:', error);
      setModalContent('No payslips found for the selected month');
      setModalVisible(true);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Card
        title="Employee Details"
        style={{ width: '100%', textAlign: 'left' }}
      >
        <p>
          <strong>First Name:</strong>
          {editable ? (
            <Input
              name="firstname"
              value={userData.firstname}
              onChange={handleInputChange}
              style={{ width: '50%' }}
            />
          ) : (
            <span>{userData.firstname}</span>
          )}
        </p>
        <p>
          <strong>Last Name:</strong>
          {editable ? (
            <Input
              name="lastname"
              value={userData.lastname}
              onChange={handleInputChange}
              style={{ width: '50%' }}
            />
          ) : (
            <span>{userData.lastname}</span>
          )}
        </p>
        <p>
          <strong>Email:</strong>
          {editable ? (
            <Input
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              style={{ width: '50%' }}
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </p>
        <p>
          <strong>Contact Number:</strong>
          {editable ? (
            <Input
              name="contactno"
              value={userData.contactno}
              onChange={handleInputChange}
              style={{ width: '50%' }}
            />
          ) : (
            <span>{userData.contactno}</span>
          )}
        </p>
        <p>
          <strong>Role:</strong>
          {editable ? (
            <Input
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              style={{ width: '50%' }}
            />
          ) : (
            <span>{userData.role}</span>
          )}
        </p>
      </Card>
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {editable ? (
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button type="primary" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </div>
        <div>
          <span style={{ marginRight: '10px' }} onClick={handleViewPayslip}>
            View Payslips :{' '}
          </span>
          <DatePicker
            format="YYYY-MM"
            picker="month"
            onChange={handleMonthChange}
          />
        </div>
      </div>
      <Modal
        title="Payslips"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {payslips.length > 0 ? (
          <Form layout="vertical">
            <hr />
            {payslips.map((payslip, index) => (
              <div key={index}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Form.Item label="Employee ID">
                      <Input value={payslip.employeeid} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Month">
                      <Input
                        value={moment(payslip.payslipmonth).format('YYYY-MM')}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Basic Salary">
                      <InputNumber value={payslip.basicsalary} disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Form.Item label="Allowance">
                      <InputNumber value={payslip.allowance} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Bonus">
                      <InputNumber value={payslip.bonus || 0} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Deductions">
                      <InputNumber value={payslip.deductions || 0} disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Form.Item label="Gross Salary">
                      <InputNumber value={payslip.grosssalary} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Net Pay">
                      <InputNumber value={payslip.netpay} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Professional Tax">
                      <InputNumber value={payslip.professionaltax} disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Form.Item label="Provident Fund">
                      <InputNumber value={payslip.providentfund} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Security Deposits">
                      <InputNumber value={payslip.securitydeposits} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Total Deductions">
                      <InputNumber value={payslip.totaldeductions} disabled />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}
          </Form>
        ) : (
          <p>{modalContent}</p>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeProfileView;
