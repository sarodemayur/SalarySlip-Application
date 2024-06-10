import React, { useEffect, useState } from 'react'
import HomePage, { EmployeeLogs } from '../../components/views/dashboard/HomePage'

const Dashboard = () => {
  const [employeelogs, setEmployeeslogs] = useState<EmployeeLogs[]>([]);
    useEffect(() => {
        const GetEmployees = async () => {
            const response = await fetch(`http://localhost:3000/getallemployees`);
            const data: EmployeeLogs[] = await response.json();
            setEmployeeslogs(data);
        };
        GetEmployees();
    },[])
  return (
    <div>
      <h1 className='text-center'>Logs</h1>
      <HomePage employeelogs={employeelogs}  />
    </div>
  )
}

export default Dashboard;
