import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/usermodel.js";
import { Session } from "../model/sessionModel.js";
import { emailVerify } from "../emailVerify/emailVerify.js";

/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

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

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    await emailVerify(token, email);

    newUser.token = token;
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      userName: newUser.firstName,
      useremail: newUser.email,
      token: newUser.token
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

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    await emailVerify(token, email);

    user.token = token;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Verification email sent",
      token: user.token
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

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "11d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "40d" }
    );

    user.isLoggedIn = true;
    await user.save();

    const session = await Session.findOne({ userId: user._id, email: user.email });
    if (session) {
      return res.status(401).json({
        success: false,
        message: "Already Looged In !!"
      });
    }
    await Session.deleteOne({ userId: user._id, email: user.email });
    await Session.create({ userId: user._id, email: user.email });

    return res.status(200).json({
      success: true,
      message: `Welcome back Mr ${user.firstName}`,
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
    const userId = req.user._id
    const session = await Session.findOne({ userId: userId })
    if (!session) {
      return res.status(401).json({ success: false, message: "Already Logged Out !" });
    }


    await Session.deleteMany({ userId: userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false })
    return res.status(200).json({ success: true, message: "Logged out successfully", });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Logout error: " + error.message, });
  }
}