import { User } from "../model/usermodel.js";
export const register = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body
        console.log("BODY:", req.body);
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: "All Fields Are Required"
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({
                success: false,
                message: "User Already Exist."
            })
        } else {
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password
            })
             return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: newUser
        })
        }





    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Register Controller " + error.message
        })
    }
}