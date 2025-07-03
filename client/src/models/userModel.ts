import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface User extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  image?: string;
  provider: string;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    role: { type: String, enum: ["admin", "user"], default: "user" },
    image: { type: String },
    provider: { type: String, default: "credentials" }
  },
  {
    timestamps: true,
  }
);

const userModel: Model<User> = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default userModel;
