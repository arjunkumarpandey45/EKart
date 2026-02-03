import express from 'express';
import { changePassword, forgotPassword, login, logout, register, reVerification, Verification, verifyOTP } from '../controller/userController.js';
import { isAuthenticated } from '../middleware/isAuthinticated.js';
const router = express.Router();
router.post('/register', register);
router.post('/verification', Verification);
router.post('/reverification', reVerification);
router.post('/login', login);
router.post('/logout', isAuthenticated,logout);
router.post('/forgotpassword',forgotPassword);
router.post('/otpverification/:email',verifyOTP);
router.post('/changepassword/:email',changePassword);
export default router