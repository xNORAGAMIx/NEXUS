import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';
import { authenticateJWT } from '../middleware/verifyToken.js';
import { verifyCategoryManager } from '../middleware/verifyRole.js';

const router = express.Router();

// ADD || POST
router.post('/add', authenticateJWT, verifyCategoryManager, addProduct)
// ALL || GET
router.get('/all', getAllProducts)
// SPECIFIC || GET
router.get('/fetch/:id', getProductById)
// DELETE || DELETE
router.delete('/delete/:id', authenticateJWT, verifyCategoryManager, deleteProduct)
// UPDATE || PATCH
router.patch('/update/:id', authenticateJWT, verifyCategoryManager, updateProduct)

export default router;