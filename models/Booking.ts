import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lawyerId: { type: Schema.Types.ObjectId, ref: 'Lawyer', required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'PENDING' },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);