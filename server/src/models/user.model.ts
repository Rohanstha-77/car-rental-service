import mongoose, { Document, Model, Schema } from "mongoose";


export interface user extends Document {
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'user',
    image: string
}

const userSchema = new Schema<user>({
    name: {type: String, required:true},
    email: {type: String, required:true,unique:true},
    password: {type: String, required:true},
    role: {type: String, enum: ['admin','user'], default: 'user'},
    image: {type: String},
},{
    timestamps:true
}) 

const userModel:Model<user> = mongoose.model<user>("user", userSchema)
export default userModel