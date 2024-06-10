import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Modal,
  InputNumber,
  Typography,
  message,
} from 'antd';
import moment, { Moment } from 'moment';

const { Item } = Form;
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

interface PayslipFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: PayslipFormData) => void;
}

const AddPaySlip: React.FC<PayslipFormProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const [values, setValues] = useState({
    basicsalary: 0,
    allowance: 0,
    bonus: 0,
    deductions: 0,
    providentfund: 0,
    professionaltax: 0,
    securitydeposits: 0,
    grosssalary: 0,
    totaldeductions: 0,
    netpay: 0,
  });

  const handleFinish = async (values: PayslipFormData) => {
    console.log('Form values:', values);
    onSubmit(values);
    try {
      const response = await fetch('http://localhost:3000/addpayslip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to add payslip');
      }

      const data = await response.json();
      console.log('Payslip added successfully:', data);
      message.success('Payslip added successfully')
    } catch (error) {
      console.error('Error adding payslip:', error);
      message.error('Failed to add payslip');
      // Handle error
    }
    form.resetFields(); // Reset form fields after submission
  };

  useEffect(() => {
    const { basicsalary, allowance, bonus, deductions } = values;
    const grosssalary = basicsalary + allowance + bonus;
    const totaldeductions =
      deductions +
      values.providentfund +
      values.professionaltax +
      values.securitydeposits;
    const netpay = grosssalary - totaldeductions;

    form.setFieldsValue({
      grosssalary,
      totaldeductions,
      netpay,
    });
  }, [values]);

  const handleChange = (field: string, value: number) => {
    setValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <Modal
      title="Add Payslip"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        name="payslip_form"
        onFinish={handleFinish}
        initialValues={{
          payslip_month: moment(),
          remember: true,
        }}
      >
        <Typography>
          <Title level={3} className='text-center'>Techathalon Software</Title>
          </Typography><hr/>
        <Row gutter={[16,16]}>
          <Col span={8}>
            <Form.Item name="allowance" label="Allowance">
              <InputNumber
                onChange={(value) =>
                  handleChange(
                    'allowance',
                    typeof value === 'number' ? value : 0
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="basicsalary" label="Basic Salary">
              <InputNumber
                onChange={(value) =>
                  handleChange(
                    'basicsalary',
                    typeof value === 'number' ? value : 0
                  )
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16,16]}>
          <Col span={8}>
            <Form.Item name="bonus" label="Bonus">
              <InputNumber
                onChange={(value) =>
                  handleChange('bonus', typeof value === 'number' ? value : 0)
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="deductions" label="Deductions">
              <InputNumber
                onChange={(value) =>
                  handleChange(
                    'deductions',
                    typeof value === 'number' ? value : 0
                  )
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16,16]}>
          <Col span={8}>
            <Form.Item name="grosssalary" label="Gross Salary">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="netpay" label="Net Pay">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16,16]}>
          <Col span={8}>
            <Form.Item name="payslipmonth" label="Payslip Month">
              <DatePicker format="YYYY-MM" picker="month" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="professionaltax" label="Professional Tax">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16,16]}>
          <Col span={8}>
            <Form.Item name="providentfund" label="Provident Fund">
              <InputNumber
                onChange={(value) =>
                  handleChange(
                    'providentFund',
                    typeof value === 'number' ? value : 0
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="securitydeposits" label="Security Deposit">
              <InputNumber
                onChange={(value) =>
                  handleChange(
                    'securityDeposits',
                    typeof value === 'number' ? value : 0
                  )
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16,16]}>
          <Col span={8}>
            <Form.Item name="totaldeductions" label="Total Deductions">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="employeeid" label="Employee Id">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddPaySlip;
