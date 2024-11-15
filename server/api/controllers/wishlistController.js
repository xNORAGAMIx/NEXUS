import db from '../../config/db.js';

//Create wishlist columns -> user_id , product_id
export const createWishlist=async (req, res)=>{
  try{
    const {user_id , product_id} = req.body;
    if(!user_id && !product_id){
        return res.status(404).json({
            success: false, 
            message :"Invalid data provided. user_id and product_id are required."
        })
    }
    //CHeck the product_id if exists in wishlist with same user id then increment the quantity 
    const [checking] = await db.query(`SELECT wishlist_id FROM wishlists WHERE user_id = ? AND product_id = ?`, [user_id, product_id]);

    
    //i.e it does exists in wishlist i.e no updation needed 
    if(checking){
      return res.status(400).json({
        success:false, 
        message :"Product already exists in the wishlist"
      })
    }

    //else
    const [result]= await db.query(`Insert into wishlists (user_id , product_id) VALUES (?,?)`,[user_id,product_id]);
     res.status(201).json({
        success: true, 
        message:"Wishlist created successfully",
        data:result[0]
    })
  }catch(err){
    res.status(500).json({
        success: false, 
        mmessage:"Internal server Error",
        err:err.message
    })
}
}




//READ WISHLIST BY user id
 
export const readWishlist = async (req, res) => {
    try {
      const userId = req.params.id;
      if(!userId){
        return res.status(404).json({
            success:false,
            message :"Invalid user id"
        })
    }
      const [rows] = await db.query('SELECT * FROM wishlists WHERE user_id = ?', [userId]);
  
      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
  
      res.json({
        success: true,
        wishlist: rows[0]
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
      });
    }
  };




    //Delete ALL items in wishlist by userid
  export  const deleteWishlist =async(req, res)=>{
        try{
            const userId= req.params.id;
             if(!userId){
                return res.send(404).json({
                    success:fail,
                    message: "Invalid userid",
            })
        }
        await db.query(`Delete from wishlists where wishlists.user_id=?`,[userId]);
       
          res.status(200).json({
            success:true,
            message :"deleted Successfully (Empty wishlist)"
          })
        
        }catch(err){
            console.log(err);
            res.status(500).json({
                success: fail,
                message : "Internal server Error",
                err:err.message
            })
        }
    }

export const getAllWishlist =async(req,res)=>{
    try{
     const [data] = await db.query(`Select * from inventory`);
    if(data.length===0){
        return res.status(404).json({
            success :false, 
            message :"Empty wishlist"
        })
    }
    res.status(200).json({
        success: true,
        message :"Wishlist data fetched Successfully!!",
        data: data[0]
    })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: fail,
            message : "Internal server Error",
            err:err.message
    
    })
 }
}



