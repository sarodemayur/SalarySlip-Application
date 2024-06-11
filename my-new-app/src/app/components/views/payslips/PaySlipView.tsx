import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Space,
  Table,
} from 'antd';
import './Payslipview.css';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export interface PayslipFormData {
  allowance: number;
  basicsalary: number;
  bonus?: number;
  deductions?: number;
  grosssalary: number;
  netpay: number;
  payslipmonth: Moment;
  professionaltax: number;
  providentfund: number;
  securitydeposits: number;
  totaldeductions: number;
  employeeid: number;
}

const PaySlipView = () => {
  const [editMode, setEditMode] = useState(false);
  const [paySlips, setPayslips] = useState<PayslipFormData[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedPayslip, setSelectedPayslip] =
    useState<PayslipFormData | null>(null);
  const [editedPayslip, setEditedPayslip] = useState<PayslipFormData | null>(
    null
  );
  const [userData, setUserData] = useState<any>(
    JSON.parse(localStorage.getItem('userData') || '{}')
  );
  const employeeid = userData.employeeid;
  const Role = userData.role;

  const fetchSalarySlips = async () => {
    try {
      const response = await fetch(`http://localhost:3000/getpayslip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeid }),
      });
      if (!response.ok) {
        const data = await response.json();
        message.error(data.error);
      } else {
        const data = await response.json();
        setPayslips(data);
      }
    } catch (error) {
      console.error('Error Fetching PaySlips', error);
    }
  };

  useEffect(() => {
    fetchSalarySlips();
  }, []);

  const handleEdit = () => {
    // Check if the user role is Admin
    if (Role === 'Admin') {
      setEditMode(true);
      setEditedPayslip(selectedPayslip);
    } else {
      // Show a message or handle the restriction accordingly
      message.error("You Do not have permission to edit payslip.");
    }
  };
  

  const handleSave = () => {
    console.log('Edited data', editedPayslip);
    setSelectedPayslip(editedPayslip);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedPayslip(null);
  };

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'employeeid',
      key: 'employeeid',
    },
    {
      title: 'Payslip Month',
      dataIndex: 'payslipmonth',
      key: 'payslipmonth',
      render: (text: string) => moment(text).format('YYYY-MMMM'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: PayslipFormData) => (
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
            setSelectedPayslip(record);
          }}
        >
          View Payslip
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={paySlips} columns={columns} />
      <Modal
        title="View Payslip"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="edit" type="primary" onClick={handleEdit}>
            Edit
          </Button>,
          <Button key="print" type="primary" onClick={() => window.print()}>
            Print
          </Button>,
        ]}
      >
        <div id="printableArea">
          <div className="pay-slip-paper">
            {' '}
            {/* Use CSS class for styling */}
            <PayslipForm
              payslip={editMode ? editedPayslip : selectedPayslip}
              editMode={editMode}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const PayslipForm = ({
  payslip,
  editMode,
  onCancel,
  onSave,
}: {
  payslip: PayslipFormData | null;
  editMode: boolean;
  onCancel: () => void;
  onSave: () => void;
}) => {
  const [editedPayslipData, setEditedPayslipData] =
    useState<PayslipFormData | null>(null);
  const [userData, setUserData] = useState<any>(
    JSON.parse(localStorage.getItem('userData') || '{}')
  );

  const handleInputChange = (name: string, value: any) => {
    setEditedPayslipData((prevData) => {
      if (!prevData) return null;
      return { ...prevData, [name]: value };
    });
  };

  if (!payslip) return null;

  return (
    <Card bordered style={{ borderRadius: '8px' }}>
      <Form layout="vertical">
        <Typography className="mb-4">
          <Title level={3} className="text-center">
            Techathalon Software
          </Title>
          <Text strong>Name: {userData.firstname} {userData.lastname}</Text><br />
          <Text strong>Contact: {userData.contactno}</Text><br />
          <Text strong>Email ID: {userData.email}</Text>
        </Typography>
        <hr />
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item label="Employee ID">
              <Input name="employeeid" value={payslip.employeeid} disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Month">
              <Input
                name="payslipmonth"
                value={moment(payslip.payslipmonth).format('YYYY-MMMM')}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Basic Salary">
              {editMode ? (
                <InputNumber
                  name="basicsalary"
                  value={payslip.basicsalary}
                  onChange={(value) => handleInputChange('basicsalary', value)}
                />
              ) : (
                <InputNumber
                  name="basicsalary"
                  value={payslip.basicsalary}
                  disabled
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item label="Allowance">
              {editMode ? (
                <InputNumber
                  name="allowance"
                  value={payslip.allowance}
                  onChange={(value) => handleInputChange('allowance', value)}
                />
              ) : (
                <InputNumber
                  name="allowance"
                  value={payslip.allowance}
                  disabled
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Bonus">
              {editMode ? (
                <InputNumber
                  name="bonus"
                  value={payslip.bonus || 0}
                  onChange={(value) => handleInputChange('bonus', value)}
                />
              ) : (
                <InputNumber name="bonus" value={payslip.bonus || 0} disabled />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Deductions">
              <InputNumber
                name="deductions"
                value={payslip.deductions || 0}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item label="Gross Salary">
              <InputNumber
                name="grosssalary"
                value={payslip.grosssalary}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Net Pay">
              <InputNumber name="netpay" value={payslip.netpay} disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Professional Tax">
              <InputNumber
                name="professionaltax"
                value={payslip.professionaltax}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item label="Provident Fund">
              <InputNumber
                name="providentfund"
                value={payslip.providentfund}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Security Deposits">
              <InputNumber
                name="securitydeposits"
                value={payslip.securitydeposits}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Total Deductions">
              <InputNumber
                name="totaldeductions"
                value={payslip.totaldeductions}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        {editMode && (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space>
                <Button key="save" type="primary" onClick={onSave}>
                  Save
                </Button>
                <Button key="cancel" onClick={onCancel}>
                  Cancel
                </Button>
              </Space>
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
};

export default PaySlipView;
