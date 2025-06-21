import mongoose, { Schema } from 'mongoose';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<User>('User', userSchema);