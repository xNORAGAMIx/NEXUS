import db from '../../config/db';


export const createWarehouse =async(req, res)=>{
    
    try {
        const {warehouse_name, address_line,  city, state , country , pincode , phone_number , email , admin_id , capacity , status } = req.body;
        
         
        if(!warehouse_name|| !address_line || ! city || ! state || ! country || !pincode || !phone_number || !email || !admin_id || ! capacity || !status){
            return res.status(404).json({
                success: false, 
                message :"Invalid data provided. All fields are required."
            })
        }


        const [warehouse] = await db.query('INSERT INTO WAREHOUSES (warehouse_name, address_line,  city, state , country , pincode , phone_number , email , admin_id , capacity , status) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [warehouse_name, address_line,  city, state , country , pincode , phone_number , email , admin_id , capacity , status]);

        return res.status(201).json({
            valid: true,
            message: 'Warehouse created successfully',
            warehouse
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Warehouse could not be added",
            error: err.message
        })
    }
}


export const readWarehouse =async(req, res)=>{
    const warehouseId = req.params.id;
    try {
        const [warehouses] = await db.query('SELECT * FROM WAREHOUSES WHERE warehouse_id = ?', [warehouseId]);

        if(warehouses.length === 0) {
            return res.status(404).json({
                valid: false,
                message: 'You have not addded any Warehouses'
            });
        }

        return res.status(200).json({
            valid: true,
            message: 'Warehouses fetched',
            result: warehouses[0]
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Error in fetching Warehouses',
            error: err.message
        })
    }
}

export const deleteWarehouse =async(req, res)=>{
    const id = req.params.id;
    try {
        const [result] = await db.query('DELETE FROM WAREHOUSES WHERE warehouse_id = ?', [id]);

        if(result.affectedRows === 0) {
            return res.status(404).json({
                valid: false,
                message: 'Warehouse not found'
            })
        }

        return res.json({
            valid: true,
            message: 'Warehouse deleted'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Internal server Error',
            error: err.message
        })
    }
}

export const getAllWarehouse = async(req, res)=>{
    try{
        const [result] =await db.query(`SELECT * FROM WAREHOUSES`);

        if(result.length===0){
            return res.status(404).json({
                success:false, 
                message:"You have not added any Warehouse"
            })
        }

        res.status(200).json({
            success : true,
            message: "Warehouse fetched successfully"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Internal server Error',
            error: err.message
        })
    }

}


export const updateWarehouse = async(req, res)=>{
    try{
        const warehouse_id = req.params.id;
        const { warehouse_name, address_line,  city, state , country , pincode , phone_number , email , admin_id , capacity , status}= req.body;
         

        if (!warehouse_id) {
           return res.status(400).json({
               success:false,
               message: "Warehouse ID is required."
            });
       }
         if (!warehouse_name|| !address_line || ! city || ! state || !country|| ! pincode || ! phone_number|| ! email || !admin_id || ! capacity|| !status) {
           return res.status(400).json({
               success:false,
               message: "All required fields must be provided."
            });
       }
           const [result]=await db.query(`UPDATE WAREHOUSES
           SET warehouse_name = ? , address_line = ? ,  city= ? , state= ?  , country= ?  , pincode= ?  , phone_number= ?  , email= ?  , admin_id = ? , capacity = ? , status= ? , WHERE warehouse_id = ?`,[warehouse_name, address_line,  city, state , country , pincode , phone_number , email , admin_id , capacity , status,warehouse_id]);

           if (result.affectedRows === 0) {
               return res.status(404).json({
                 success: false,
                 message: 'Warehouse not found'
               });
             }
         
           res.status(200).json({
                success:true,
                message: "Warehouse updated successfully.",
                result
                });
           }catch(err){
             return res.status(500).json({
               valid: false,
               message: "Internal server error",
               err: err.message
               })
}
}