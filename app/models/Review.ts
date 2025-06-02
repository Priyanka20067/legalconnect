import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lawyerId: { type: Schema.Types.ObjectId, ref: 'Lawyer', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);