import express from 'express';
import { authenticateJWT } from '../middleware/verifyToken.js';
import { getOrderItems, getOrderStatusHistory, getUserOrders, placeOrder } from '../controllers/orderController.js';

const router = express.Router();

// PLACE || POST
router.post('/place-order', authenticateJWT, placeOrder);
// VIEW ALL || GET 
router.get('/viewOrders', authenticateJWT, getUserOrders);
// VIEW SPECIFIC || GET

// VIEW ITEMS FOR SPECIFIC || GET
router.get('/:orderId/items', authenticateJWT, getOrderItems);
// VIEW ORDER HISTORY FOR SPECIFIC || GET
router.get('/:orderId/status-history', authenticateJWT, getOrderStatusHistory);

export default router;