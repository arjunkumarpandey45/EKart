import express from 'express';
import { login, register, reVerification, Verification } from '../controller/userController.js';
const router = express.Router();
router.post('/register', register);
router.post('/verification', Verification);
router.post('/reverification', reVerification);
router.post('/login', login);
export default router