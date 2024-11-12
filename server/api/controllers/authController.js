import db from '../../config/db.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../../utils/generateToken.js';


// user login
export const loginUser = async(req,res) => {
    const {email, password} = req.body;
    try {
        const [user] = await db.query('SELECT * FROM USERS WHERE email = ?', [email]);

        if(user.length === 0) {
            return res.status(404).json({
                valid: false,
                message: 'User does not exist'
            })
        }

        const isUser = user[0];

        const isMatch = bcrypt.compareSync(password, isUser.password);

        if(!isMatch) {
            return res.status(404).json({
                valid: false,
                message: 'Invalid credentials'
            })
        }

        //Generate Tokens
        const refreshToken = generateRefreshToken(isUser.user_id);
        const accessToken = generateAccessToken(isUser.user_id);

        //Set refresh token in database
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await db.query('INSERT INTO REFRESH_TOKENS (ref_user_id, token, expires_at) VALUES (?,?,?)', [isUser.user_id, refreshToken, expiresAt]);

        // Set access token in an HTTP-only cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,  // Set to true in production
            maxAge: 30 * 60 * 1000,  // Access token expiry in milliseconds (5 minutes)
            path: '/',
            sameSite: 'Strict'
        });

        // Set refresh token in an HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,  // Set to true in production
            maxAge: 45 * 60 * 1000,  // Access token expiry in milliseconds (5 minutes)
            path: '/',
            sameSite: 'Strict'
        });

        return res.status(200).json({
            valid: true,
            message: "User logged in successfully",
            refreshToken,
            accessToken
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Could not login",
            error: err.message
        });
    }
}

//user logout
export const logoutUser = async (req,res) => {
    console.log(req.user);
    const userId = req.user.userId;
    try {
        await db.query('DELETE FROM REFRESH_TOKENS WHERE ref_user_id = ?', [userId]);

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return res.json({
            valid: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Logout error",
            error: err.message
        });
    }
}