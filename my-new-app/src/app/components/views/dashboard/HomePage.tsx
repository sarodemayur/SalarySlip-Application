import { Table } from 'antd';
import moment from 'moment-timezone';
import React, { useState } from 'react'

export interface EmployeeLogs {
  firstname:string;
  lastname:string;
  employeeid:string;
  createdBy:string;
  createdAt:string;
  updatedAt:string;
}

const HomePage:React.FC<{employeelogs: EmployeeLogs[]}> = ({employeelogs}) => {
  const [userData, setUserData] = useState<any>(
    JSON.parse(localStorage.getItem('userData') || '{}')
  );
   const columns = [
    {
      title:'EmployeeId',
      dataIndex: 'employeeid',
      key:'employeeid'
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key:'firstname'
    },
    {
    title:'Last Name',
    dataIndex: 'lastname',
    key:'lastname',
    },
    {
      title: 'CreatedBy',
      dataIndex:'createdby',
      key:'createdby',
      render: (text: string) => text || 'Admin'
    },
    {
      title:'CreatedAt',
      dataIndex:'createdat',
      key:'createdat',
      render: (text: string) => moment.tz(text, 'UTC').tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title:'UpdatedAt',
      dataIndex: 'updatedat',
      key: 'updatedat',
      render: (text: string) => moment.tz(text, 'UTC').tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
    }
   ]

  return (
    <div>
      {userData.role === 'Admin' ? (
        <Table dataSource={employeelogs} columns={columns} />
      ) : (
        <div>Dashboard</div>
      )}
    </div>
  )
}

export default HomePage
