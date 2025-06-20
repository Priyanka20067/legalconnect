import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, default: 'USER' },
  password: { type: String, required: true }, // Add this field
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);