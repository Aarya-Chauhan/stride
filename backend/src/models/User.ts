import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  timezone?: string;
  profession?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    timezone: { type: String },
    profession: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const User = mongoose.model<IUser>("User", userSchema);
