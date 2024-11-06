import jwt from 'jsonwebtoken';

// Utility function to generate tokens
export const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
};

export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
};