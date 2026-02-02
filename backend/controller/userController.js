import bcrypt from "bcryptjs";

import { User } from "../model/usermodel.js";
import jwt from "jsonwebtoken";
import { emailVerify } from "../emailVerify/emailVerify.js";
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
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1min' })
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
                token: newUser.token,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register controller error: " + error.message,
        });
    }
};
export const Verification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ success: false, message: "Invalid token or missing token" })
        }

        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)

        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(400).json({ success: false, message: "Token expired" })
            }
            return res.status(400).json({ success: false, message: "Verification failed" })
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        user.token = user.token;
        user.isVerified = true;
        await user.save();
        return res.status(200).json({ success: true, message: "Email verified successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
export const reVerification = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5min' })
        await emailVerify(token, email)
        user.token = token
        await user.save()
        return res.status(200).json({ success: true, message: "Verification email sent successfully", token: user.token })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}