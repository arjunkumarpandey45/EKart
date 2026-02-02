import express from 'express';
import { register, reVerification, Verification } from '../controller/userController.js';
const router = express.Router();
router.post('/register', register);
router.post('/verification', Verification);
router.post('/reverification', reVerification);
export default router