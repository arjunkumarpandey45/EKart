import express from 'express';
import { register, Verification } from '../controller/userController.js';
const router = express.Router();
router.post('/register', register);
router.post('/verification', Verification);
export default router