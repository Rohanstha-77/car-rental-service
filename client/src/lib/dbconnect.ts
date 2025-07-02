import mongoose from "mongoose";

export const dbconnect = async ():Promise<void> => {
    try {
        const url = process.env.MONGODB_URI

        if (!url) throw new Error("doesnt not contain mongodb url")
        await mongoose.connect(url)
    } catch (error) {
        console.log("error in mongodb connection",error)
    }
}