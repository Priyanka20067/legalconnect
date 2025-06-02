import mongoose, { Schema } from 'mongoose';

const lawyerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  category: { type: String, required: true },
  experience: { type: Number, required: true },
  bio: { type: String },
  credentials: { type: String },
}, { timestamps: true });

export default mongoose.models.Lawyer || mongoose.model('Lawyer', lawyerSchema);