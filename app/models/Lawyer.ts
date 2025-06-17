import mongoose, { Schema } from 'mongoose';

const lawyerSchema = new Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
}, { timestamps: true });

export default mongoose.models.Lawyer || mongoose.model('Lawyer', lawyerSchema);