import express from 'express';
import { deleteUser, getAllUsers, getUserById, registerUser, updateUser } from '../controllers/userController.js';
import { loginUser, logoutUser } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/verifyToken.js';
import { verifyCategoryManager } from '../middleware/verifyRole.js';

const router = express.Router();

// REGISTER || POST
router.post('/register', registerUser)
// LOGIN || POST
router.post('/login', loginUser)
// LOGOUT || POST
router.post('/logout', authenticateJWT, logoutUser)
// DASHBOARD || POST
router.get('/dashboard', authenticateJWT, (req,res) => {
    res.status(200).json({
        valid: true,
        message: "Authorized, welcome to user dashboard!",
        userId: req.user
    })
})
// UPDATE || PATCH
router.patch('/:id', authenticateJWT, updateUser)
// ALL USERS || GET
router.get('/all',authenticateJWT, verifyCategoryManager, getAllUsers)
// USER BY ID || GET
router.get('/user/:id', authenticateJWT, verifyCategoryManager, getUserById)
// DELETE USER || DELETE
router.delete('/delete/:id', authenticateJWT, verifyCategoryManager, deleteUser)

export default router;