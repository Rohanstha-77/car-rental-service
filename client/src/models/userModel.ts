import mongoose, { Document, Model, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  image: string;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

// 🛡️ Fix OverwriteModelError here:
const userModel: Model<User> = mongoose.models.user || mongoose.model<User>("user", userSchema);

export default userModel;
