import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  userId: { type: String, required: true },
  lawyerId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);