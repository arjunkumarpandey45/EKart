import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/usermodel.js";
import { Session } from "../model/sessionModel.js";
import { emailVerify } from "../emailVerify/emailVerify.js";
import { sentOtpMail } from "../emailVerify/otpVerify.js";
import cloudnairy from "../utils/cloudnairy.js";

/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    console.log("REQ BODY 👉", req.body);

    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    await emailVerify(token, email);

    newUser.token = token;
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      userName: newUser.firstName,
      useremail: newUser.email,
      token: newUser.token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Register error: " + error.message,
    });
  }
};

/* =========================
   VERIFY EMAIL
   TOKEN FROM AUTH HEADER
========================= */
export const Verification = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Token missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Token expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.token !== token) {
      return res.status(400).json({
        success: false,
        message: "Invalid or old token",
      });
    }

    user.isVerified = true;
    user.token = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   RE-VERIFICATION
========================= */
export const reVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    await emailVerify(token, email);

    user.token = token;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Verification email sent",
      token: user.token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "11d",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "40d",
    });

    user.isLoggedIn = true;
    await user.save();

    const session = await Session.findOne({
      userId: user._id,
      email: user.email,
    });
    if (session) {
      return res.status(401).json({
        success: false,
        message: "Already Looged In !!",
      });
    }
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    await Session.deleteOne({ userId: user._id, email: user.email });
    await Session.create({ userId: user._id, email: user.email });
    console.log("LOGIN RESPONSE USER 👉", {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    return res.status(200).json({
      success: true,
      message: `Welcome back Mr ${user.firstName}`,
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login error: " + error.message,
    });
  }
};
/* =========================
   LOGOUT
========================= */
export const logout = async (req, res) => {
  try {
    const userId = req.user._id;
    const session = await Session.findOne({ userId: userId });
    if (!session) {
      return res
        .status(401)
        .json({ success: false, message: "Already Logged Out !" });
    }

    await Session.deleteMany({ userId: userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Logout error: " + error.message });
  }
};
/* =========================
   FORGOT PASSWORD
========================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("EMAIL RECEIVED:", email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpire = otpExpire;
    await user.save();
    await sentOtpMail(email, otp);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
/* =========================
   VERIFY OTP
========================= */
export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const { email } = req.params;
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Otp requires",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not found !!",
      });
    }
    if (!user.otp || !user.otpExpire) {
      return res.status(400).json({
        success: false,
        message: "otp expired or already used !!",
      });
    }
    if (user.otpExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Otp Expired , Please Try Again...",
      });
    }
    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "Otp is Incorrect,Try again..",
      });
    }
    user.otp = null;
    user.otpExpire = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Otp Verified ,Yeah...",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Oh " + error.message });
  }
};
/* =========================
CHANGE PASSWORD
========================= */
export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    if (!newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password didn't matched" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: false, message: "Password Changed Sucessfully.." });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
/* =========================
  All USER
========================= */
export const allUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
/* =========================
  Get User By Id
========================= */
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById({ userId }).select(
      "-password -otp -otpExpire -token",
    );
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    return res.status(200).json({ success: true, message: "user founded" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const updateUserById = req.params.id;
    const loggedUser = req.user;
    console.log("1. URL Params ID:", req.params.id);
    console.log("2. Token User ID:", req.user._id.toString());
    console.log("3. Role:", req.user.role);
    const {
      firstName,
      lastName,
      email,
      zipcode,
      phoneNumber,
      address,
      role,
      city,
    } = req.body;
    if (
      loggedUser._id.toString() !== updateUserById &&
      loggedUser.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You'r not allowed to update this profile",
      });
    }
    let user = await User.findById(updateUserById);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    let profilePicURL = user.profilePic;
    let profilePicPublicId = user.profilePicPublicId;
    if (req.file) {
      if (profilePicPublicId) {
        await cloudnairy.uploader.destroy(profilePicPublicId);
      }
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudnairy.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(req.file.buffer);
      });
      profilePicURL = uploadResult.secure_url;
      profilePicPublicId = uploadResult.public_id;
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.city = city || user.city;
    user.address = address || user.address;
    user.zipcode = zipcode || user.zipcode;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.role = role;
    user.profilePic = profilePicURL;
    user.profilePicPublicId = profilePicPublicId;
    const updatedUser = await user.save();
    return res.status(200).json({
      success: true,
      message: "User Updated SucessFulyy",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
