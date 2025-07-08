import mongoose, { Document, Model, Schema } from "mongoose";
import { user } from "../types";

const userSchema = new Schema<user>({
    username: {type: String, required:true},
    email: {type: String, required:true,unique:true},
    password: {type: String, required:true},
    role: {type: String, enum: ['admin','user'], default: 'user'},
    image: {type: String},
},{
    timestamps:true
}) 

const userModel:Model<user> = mongoose.model<user>("user", userSchema)
export default userModel