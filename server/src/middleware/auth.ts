import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
import userModel from "../models/user.model.js";
import { Document } from "mongoose";
 

declare global {
  namespace Express {
    interface Request {
      user?: Document;
      _id?: Document,
      role?: "user" | "owner"
    }
  }
}
dotenv.config()

export const authMiddleware = async(req:Request, res:Response, next:NextFunction):Promise<void> => {

    const authHeader = req.headers.authorization
    const screctKey = process.env.JWTSECRET
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "invalid user" });
        return;
    }
    const token = authHeader.slice(7);
    
    if(!screctKey){
        console.log("enviroment is not working")
        return
    }
    if(!token){
        res.json({success:false, message:"Unauthorized user"})
        return
    }
    
    try {
        const verifyToken = jwt.verify(token,screctKey) as JwtPayload
        if(!verifyToken) {
            res.json({success:false, message:"invalid user"})
            return
        }

        const user = await userModel.findById(verifyToken.id).select("-password").lean() //it will exclude the password file 
        if (!user) {
            res.status(401).json({ success: false, message: "User not found" });
            return 
        }
        req.user = user
        next()

    } catch (error) {
        console.log("while verifying the token",error)
    }
}