import express from 'express';
import { allUser, changePassword, forgotPassword, getUserById, login, logout, register, reVerification, Verification, verifyOTP } from '../controller/userController.js';
import { isAdmin, isAuthenticated } from '../middleware/isAuthinticated.js';
const router = express.Router();
router.post('/register', register);
router.post('/verification', Verification);
router.post('/reverification', reVerification);
router.post('/login', login);
router.post('/logout', isAuthenticated,logout);
router.post('/forgotpassword',forgotPassword);
router.post('/otpverification/:email',verifyOTP);
router.post('/changepassword/:email',changePassword);
router.get('/alluser',isAuthenticated,isAdmin,allUser)
router.get('/getuser/:userId',getUserById)
export default router