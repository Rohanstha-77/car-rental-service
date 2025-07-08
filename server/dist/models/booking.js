import mongoose from "mongoose";
import { Schema } from "mongoose";
const bookingSchema = new Schema({
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
    price: {
        type: Number, required: true
    },
}, { timestamps: true });
const bookingModel = mongoose.model("Booking", bookingSchema);
export default bookingModel;
//# sourceMappingURL=booking.js.map