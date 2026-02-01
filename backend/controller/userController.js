import bcrypt from "bcryptjs";
import { User } from "../model/usermodel.js";
import jwt from "jsonwebtoken";
import {emailVerify} from "../emailVerify/emailVerify.js";
export const register = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { email, firstName, lastName, password } = req.body;

        //  Validation
        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //  Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '5min' })
        emailVerify(token, email)
        newUser.token = token;
        //  Success response (never send password)
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register controller error: " + error.message,
        });
    }
};
