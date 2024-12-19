import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import argon2 from "argon2";
dotenv.config();

class AuthenticationController {
    encryptPassword = async (password) => {
        try {
            const hashPassword = await argon2.hash(password);
            return hashPassword;
        } catch (err) {
            return null;
        }
    }
    decryptAndVerifyPassword = async (hashPassword, password) => {
        try {

            const pass = await argon2.verify(hashPassword, password);
            return pass;
        } catch (err) {
            return null;
        }
    }
    generateToken = (parameters) => {
        const token = jwt.sign(
            parameters,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );
        return token;
    }
    verifyToken = (req, res, next) => {
       try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
       } catch(err) {
        console.log(err)
        return res.status(401).json({ message: 'No token, authorization denied' });
       }
    }
}
export default AuthenticationController;