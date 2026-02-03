import express from 'express';
import { login, logout, register, reVerification, Verification } from '../controller/userController.js';
import { isAuthenticated } from '../middleware/isAuthinticated.js';
const router = express.Router();
router.post('/register', register);
router.post('/verification', Verification);
router.post('/reverification', reVerification);
router.post('/login', login);
router.post('/logout', isAuthenticated,logout);
export default router