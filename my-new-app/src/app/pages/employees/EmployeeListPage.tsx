import React, { useEffect, useState } from 'react'
import EmployeeList, { Employee } from '../../components/views/employees/EmployeeList'

const EmployeeListPage = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        const GetEmployees = async () => {
            const response = await fetch(`http://localhost:3000/getallemployees`);
            const data: Employee[] = await response.json();
            setEmployees(data);
        };
        GetEmployees();
    },[])
  return (
    <div>
       <h1>Employee Data</h1>
      <EmployeeList employees={employees} />
    </div>
  )
}

export default EmployeeListPage;
