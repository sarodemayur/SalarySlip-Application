import Employee from '../modals/EmployeeModal';

export const Add_Employee = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    gender,
    contactno,
    address,
    designation,
    employeeid,
    role,
    password,
  } = req.body;
  try {
    const employee = await Employee.findOne({ where: { email: email } });
    if (employee === null) {
      await Employee.create({
        firstname,
        lastname,
        email,
        gender,
        contactno,
        address,
        designation,
        employeeid,
        role,
        password,
      });
      return res.status(201).json({ message: 'Added new Employee' });
    }
    return res.status(200).json({ message: 'Employee Already Exists' });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: 'Somthing went wrong' });
  }
};

export const Get_Employee = async (req, res) => {
  try {
    const employee = await Employee.findAll();
    if (employee.length === 0) {
      return res.status(404).json({ msg: 'Employee Not Found' });
    }
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: 'Somthing went wrong' });
  }
};

export const Get_EmployeeById = async (req, res) => {
  const { employeeid } = req.body;
  try {
    const employee = await Employee.findOne({
      where: { employeeid: employeeid },
    });
    if (employee) {
      return res.status(200).json(employee);
    } else {
      return res.status(404).json({ msg: 'Employee Not Found' });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: 'Somthing went wrong' });
  }
};

export const Update_EmployeeData = async(req,res) => {
    const { employeeid, userData } = req.body;
    try {
        const employee = await Employee.findOne({ where: { employeeid: employeeid } });
        if (!employee) {
            return res.status(400).json({ message: 'Employee not found' });
        }
        employee.firstname = userData.firstname;
        employee.lastname = userData.lastname;
        employee.email = userData.email;
        employee.contactno = userData.contactno;
        employee.role = userData.role;
        await employee.save();
        return res.status(200).json({ message: 'Employee data updated successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

