import db from '../../config/db.js';
import bcrypt from 'bcryptjs';

//working , role insertion check
export const registerUser = async (req,res) => {
    const {name, email, password, phone_number, role} = req.body;
    try {

        const hashedPassword = bcrypt.hashSync(password, 10);
        const [user] = await db.query('INSERT INTO USERS (name, email, password, phone_number, role) VALUES(?,?,?,?,?)' , [name, email, hashedPassword, phone_number, role]);

        return res.status(201).json({
            valid: true,
            message: 'User registered',
            user
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'User could not be registered',
            error: err.message
        });
    }
}
// TODO   
export const updateUser = async (req,res) => {
    try{
        const user_id = req.params.id;
        const {name,email, password, phone_number, role, status}=req.body;
         

        if (!user_id) {
           return res.status(400).json({
               success:false,
               message: "user ID is required."
            });
       }
         if (!name || !email || !password || !phone_number|| !role || !status) {
           return res.status(400).json({
               success:false,
               message: "All required fields must be provided."
            });
       }
           const [result]=await db.query(`UPDATE USERS
           SET name=?, email=?, password=?, phone_number=?, role=?, status=?, WHERE user_id = ?`,[name, email, password, phone_number, role, status, user_id]);

           if (result.affectedRows === 0) {
               return res.status(404).json({
                 success: false,
                 message: 'User not found'
               });
             }
         
           res.status(200).json({
                success:true,
                message: "User updated successfully.",
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

// working as expected
export const getAllUsers = async (req,res) => {
    try {
        const [rows] = await db.query('SELECT * FROM USERS');

        if(rows.length === 0) {
            return res.status(404).json({
                valid: false,
                message: 'No users found'
            })
        }

        return res.status(200).json({
            valid: true,
            message: "Users retrieved",
            users: rows
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Users could not be retrieved',
            err: err.message
        })
    }
}

// working as expected
export const getUserById = async (req,res) => {
    const id = req.params.id;
    try {
        const [user] = await db.query('SELECT * FROM USERS WHERE user_id = ?', [id]);

        if(user.length === 0){
            return res.status(404).json({
                valid: false,
                message: 'No user found'
            })
        }

        return res.status(200).json({
            valid: true,
            message: "User retrieved",
            user: user[0]
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'User could not be retrieved',
            err: err.message
        })
    }
}

// working as expected
export const deleteUser = async (req,res) => {
    const id = req.params.id;
    try {
        const [user] = await db.query('DELETE FROM USERS WHERE user_id = ?', [id]);

        if(user.affectedRows === 0){
            return res.status(404).json({
                valid: false,
                message: 'No user found'
            })
        }

        return res.status(200).json({
            valid: true,
            message: "User deleted successfully",
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'User could not be deleted',
            err: err.message
        })
    }
}