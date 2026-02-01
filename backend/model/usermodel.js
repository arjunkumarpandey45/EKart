import mongoose, { Schema } from "mongoose"
const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    profilePic: { type: String, default: "" },
    profilePicPublicId: { type: String, default: "" },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpire: { type: Date, default: null },
    phoneNumber: { type: Number },
    address: { type: String },
    city: { type: String },
    zipcode: { type: Number },
},{timestamps:true})
export const User=mongoose.model("user",userSchema)