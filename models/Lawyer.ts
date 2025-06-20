import mongoose, { Schema } from 'mongoose';

// Define the Lawyer interface for TypeScript type safety
export interface Lawyer {
  _id: string;
  name: string;
  specialization: string;
  email: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const lawyerSchema = new Schema<Lawyer>({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
}, { timestamps: true });

export default mongoose.models.Lawyer || mongoose.model<Lawyer>('Lawyer', lawyerSchema);