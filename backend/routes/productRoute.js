import express from 'express';
import { addProduct, deletProduct, getAllProduct, updateProduct } from '../controller/productController.js';
import { isAdmin, isAuthenticated } from '../middleware/isAuthinticated.js';
import { multipleUpload } from '../middleware/Multer.js';

const router = express.Router();
router.post('/addproduct', isAuthenticated,multipleUpload,isAdmin,addProduct);
router.get("/allproducts",getAllProduct)
router.delete("/deleteproducts/:productId",isAuthenticated,isAdmin,deletProduct)
router.put("/updateproducts/:productId",isAuthenticated,isAdmin,multipleUpload,updateProduct)
export default router