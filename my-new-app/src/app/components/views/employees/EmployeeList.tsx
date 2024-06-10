import { Button, Modal, Table } from 'antd';
import React, { useState } from 'react';
import AddPaySlip, { PayslipFormData } from '../payslips/AddPaySlip';
import { render } from 'react-dom';
import PaySlipView from '../payslips/PaySlipView';

export interface Employee {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  contactno: number;
  address: string;
  designation: string;
  employeeid: string;
  role: string;
}

const EmployeeList: React.FC<{ employees?: Employee[] }> = ({ employees }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const [viewPayslipsVisible, setViewPayslipsVisible] = useState(false);

  const handleAddPayslipClick = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleViewPayslipsClick = (employeeId:string) => {
    setSelectedEmployeeId(employeeId);
    setViewPayslipsVisible(true);
  }

  const handleViewPayslipsModalCancel = () => {
    setViewPayslipsVisible(false);
  }

  const handleFormSubmit = (values: PayslipFormData) => {
    console.log('Form Values Submitted', values);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Contact No',
      dataIndex: 'contactno',
      key: 'contactno',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeid',
      key: 'employeeid',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Employee) => (
        <Button
          type="primary"
          onClick={() => handleAddPayslipClick(record.employeeid)}
        >
          Add payslip
        </Button>
      ),
    },
    {
      title: 'Actions',
      key: 'view Payslips',
      render: (text: any, record: Employee) => (
        <Button 
          type='primary'
          onClick={() => handleViewPayslipsClick(record.employeeid)}
        >
          view payslip
        </Button>
      )
    }
  ];

  return (
    <div>
      <Table dataSource={employees} columns={columns} />
      <Modal
        title="Add Payslip"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {selectedEmployeeId && (
          <AddPaySlip
            onCancel={handleModalCancel}
            onSubmit={handleFormSubmit}
            visible={true}
          />
        )}
      </Modal>
      <Modal
      title="View Payslips"
      open={viewPayslipsVisible}
      onCancel={handleViewPayslipsModalCancel}
      footer={null}
      >
       {selectedEmployeeId && (
        <PaySlipView/>
       )}
      </Modal>
    </div>
  );
};

export default EmployeeList;
