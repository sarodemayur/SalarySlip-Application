import Employee from "../modals/EmployeeModal";

export const login = async (req, res) => {
    const {email,password} = req.body;
    try {
        const userExists = await Employee.findOne({where:{email}});
        if(!userExists){
            return res.status(400).json({message:"User Not Found"})
        }
        if(password !== userExists.password){
            return res.status(401).json({msg:"Incorrect Password"})
        }
        return res.status(200).json(userExists)
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({error:"Somthing went wrong"});
    }
}

