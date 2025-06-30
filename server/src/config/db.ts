import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async ():Promise<void> => {
    try {
        const url = process.env.MONGODB

        if (!url) throw new Error("doesnt not contain mongodb url")
        await mongoose.connect(url)
    } catch (error) {
        console.log("error in mongodb connection",error)
    }
}