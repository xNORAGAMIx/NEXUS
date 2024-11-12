import db from '../../config/db.js';

export const verifyCategoryManager = async (req,res, next) => {
    const userId = req.user.userId;
    try {
        const [user] = await db.query('SELECT * FROM USERS WHERE user_id = ?', [userId]);

        const isUser = user[0];

        if(isUser.role === "Admin"){
            next();
        } else {
            return res.json({
                valid: false,
                message: "You are not authorized to access this!"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Error finding category",
            error: err.message
        })
    }
}