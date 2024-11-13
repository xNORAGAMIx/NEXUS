import express from 'express';
const router = express.Router();

import  {createWishlist, readWishlist, deleteWishlist ,getAllWishlist} from "../controllers/wishlistController.js";


//Create wishlist
router.post('/', createWishlist);

//Read wishlist
router.get('/readWishlist/:id' ,readWishlist);

//delete wishlist 
router.delete('/delWishlist/:id' , deleteWishlist);

//real all
router.get('/' ,getAllWishlist);


export default router;