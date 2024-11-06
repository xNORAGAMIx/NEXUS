import express from 'express'
import { addCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from '../controllers/categoryController.js';
import { authenticateJWT } from '../middleware/verifyToken.js';
import { verifyCategoryManager } from '../middleware/verifyRole.js';

const router = express.Router();

// ADD || POST
router.post('/add', authenticateJWT, verifyCategoryManager, addCategory)
// ALL CATEGORY || GET
router.get('/all', getAllCategory)
// SPECIFIC CATEGORY || GET
router.get('/fetch/:id', getCategoryById)
// DELETE CATEGORY || DELETE
router.delete('/delete/:id', authenticateJWT, verifyCategoryManager, deleteCategory)
// UPDATE CATEGORY || PATCH
router.patch('/update/:id',authenticateJWT, verifyCategoryManager, updateCategory)
export default router;