import express from 'express';
import { addItems, deleteItem, updateCart, viewCart } from '../controllers/cartController.js';
import { authenticateJWT } from '../middleware/verifyToken.js';

const router = express.Router();

// ADD || POST
router.post('/add' , authenticateJWT, addItems)
// VIEW || GET
router.get('/view', authenticateJWT, viewCart)
// DELETE ||  DELETE
router.delete('/delete/:id', authenticateJWT, deleteItem)
// UPDATE || PATCH
router.patch('/update', authenticateJWT, updateCart)

export default router;