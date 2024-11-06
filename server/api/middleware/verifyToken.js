import jwt from 'jsonwebtoken';
import db from '../../config/db.js';

export const authenticateJWT = async(req, res, next) => {
    const token = req.cookies.accessToken; //Read the token from cookies

    // If access token doesn't exists
    if (!token) {
        // Create accessToken if refreshToken valid
        const tokenRenewed = await renewToken(req,res);
        if(tokenRenewed){
            next();
        } else {
            return;
        }
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = { userId: decoded.userId }; // attach user information to request
        next(); //move to next middleware or route handler
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            Authentication: err.message
        })
    }
}

//Changes made due to ERR_HTTP_HEADERS_SENT
const renewToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({
            valid: false,
            message: "Not authorized no refresh token."
        });
        return false; //Token renewal not successfull
    }
    try {
        const [rows] = await db.query('SELECT * FROM REFRESH_TOKENS  WHERE token = ?', [refreshToken]);

        // No refresh token in DB
        if(rows.length === 0){
            res.status(401).json({
                valid: false,
                message: "Authorization error no refresh token in DB, login again."
            });
            return false;
        }

        const refreshTokenData = rows[0];
        const userId = refreshTokenData.ref_user_id;

        //check if token has expired
        if (new Date(refreshTokenData.expires_at) < new Date()) {
            res.json({
                valid:  false,
                message: "Session expired"
            });
            return false;
        }

        //Generate new access token
        const newAccessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });

        //Set access token in cookie
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,  // Set to true in production
            maxAge: 5 * 60 * 1000,  // Access token expiry in milliseconds (5 minutes)
            path: '/',
            sameSite: 'Strict'
        });

        res.json({ renew: refreshToken });
        return true;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            valid: false,
            message:  "Internal server error.",
            error: err.message
        })
        return false;
    }
}