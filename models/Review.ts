import mongoose, { Schema } from 'mongoose';

export interface Review {
  _id: string;
  userId: string;
  lawyerId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const reviewSchema = new Schema<Review>({
  userId: { type: String, required: true },
  lawyerId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model<Review>('Review', reviewSchema);