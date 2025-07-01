import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    image: { type: String },
}, {
    timestamps: true
});
const userModel = mongoose.model("user", userSchema);
export default userModel;
//# sourceMappingURL=user.model.js.map