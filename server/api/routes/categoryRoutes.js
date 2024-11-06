import express from 'express'

const router = express.Router();

// ADD || POST
router.post('/add')
// ALL CATEGORY || GET
router.get('/all')
// SPECIFIC CATEGORY || GET
router.get('/fetch/:id')
// DELETE CATEGORY || DELETE
router.delete('/delete/:id')
// UPDATE CATEGORY || PATCH
router.patch('/update/:id')
export default router;