import express from 'express';
import { addProduct, getAllProduct } from '../controller/productController.js';
import { isAdmin, isAuthenticated } from '../middleware/isAuthinticated.js';
import { multipleUpload } from '../middleware/Multer.js';

const router = express.Router();
router.post('/addproduct', isAuthenticated,multipleUpload,isAdmin,addProduct);
router.get("/allproducts",getAllProduct)
export default router