import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export const generateToken = (userId: string, role: string) => {
    const payload = {id: userId, role}

    const JWT_SECRET = process.env.JWTSECRET;

    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables");
    return jwt.sign(payload, JWT_SECRET)

}