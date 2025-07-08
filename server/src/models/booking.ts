import mongoose, { Model } from "mongoose";
import { Booking } from "../types";
import { Schema } from "mongoose";

const bookingSchema = new Schema<Booking>({
    car: {
        type: mongoose.Schema.ObjectId, ref: "Cars Detail", required: true
    },
    user: {
        type: mongoose.Schema.ObjectId, ref: "user", required: true
    },
    owner: {
        type: mongoose.Schema.ObjectId, ref: "user", required: true
    },
    pickupDate: {
        type: Date, required: true
    },
    returnDate: {
        type: Date, required: true
    },
    status: {
        type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending"
    },
    price:{
        type: Number, required: true
    },
},{timestamps: true})

const bookingModel: Model<Booking> = mongoose.model<Booking>("Booking", bookingSchema)
export default bookingModel