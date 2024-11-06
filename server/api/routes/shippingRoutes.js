import express from 'express';
import { addShipping, deleteAddress, getAllAddress } from '../controllers/shippingController.js';
import { authenticateJWT } from '../middleware/verifyToken.js';

const router = express.Router();

// ADD || POST
router.post('/add', authenticateJWT, addShipping);
// VIEW || GET
router.get('/view', authenticateJWT, getAllAddress)
// DELETE || DELETE
router.delete('/delete/:id', authenticateJWT, deleteAddress);
// UPDATE || PATCH
router.patch('/update/:id')

export default router;

