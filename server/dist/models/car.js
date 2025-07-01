import mongoose, { Schema } from "mongoose";
const carSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    brand: { type: String, required: true },
    Model: { type: String, required: true },
    image: { type: String, default: "" },
    year: { type: Number, required: true },
    category: { type: String },
    seating_capacity: { type: Number },
    fuel_type: { type: String },
    transmission: { type: String },
    pricePerDay: { type: Number, required: true },
    location: { type: String },
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
});
export const carModel = mongoose.model("Cars Detail", carSchema);
//# sourceMappingURL=car.js.map