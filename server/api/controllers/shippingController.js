import db from '../../config/db.js';

export const addShipping = async(req,res) => {
    const {address_line_1, address_line_2, city, state, zip_code, country} = req.body;
    const userId = req.user.userId;
    try {
        //Check if user already has 4 addresses
        const [addressCount] = await db.query(`SELECT COUNT(*) AS count FROM SHIPPING_ADDRESSES WHERE user_id = ?`, [userId]);

        if(addressCount[0].count >= 4) {
            return res.status(400).json({
                valid: false, 
                message: "User can have at most 4 shipping addresses." 
            });
        }

        //Insert new address
        await db.query(`
        INSERT INTO SHIPPING_ADDRESSES (user_id, address_line_1, address_line_2, city, state, zip_code, country)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
       [userId, address_line_1, address_line_2, city, state, zip_code, country]);

       return res.status(201).json({
        valid: true,
        message: 'Shipping address added successfully'
       });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Error adding shipping address',
            error: err.message
        })
    }
}

export const getAllAddress = async(req,res) => {
    const userId = req.user.userId;
    try {
        const [addresses] = await db.query('SELECT * FROM SHIPPING_ADDRESSES WHERE user_id = ?', [userId]);

        if(addresses.length === 0) {
            return res.status(404).json({
                valid: false,
                message: 'You have not addded any shipping addresses'
            });
        }

        return res.status(200).json({
            valid: true,
            message: 'Shipping addresses fetched',
            shipping_addresses: addresses
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Error in fetching addresses',
            error: err.message
        })
    }
}

export const deleteAddress = async(req,res) => {
    const id = req.params.id;
    try {
        const [result] = await db.query('DELETE FROM SHIPPING_ADDRESSES WHERE address_id = ?', [id]);

        if(result.affectedRows === 0) {
            return res.status(404).json({
                valid: false,
                message: 'Address not found'
            })
        }

        return res.json({
            valid: true,
            message: 'Address deleted'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Error deleting address',
            error: err.message
        })
    }
}