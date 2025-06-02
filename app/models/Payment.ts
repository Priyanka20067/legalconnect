import mongoose, { Schema } from 'mongoose';

const paymentSchema = new Schema({
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  stripeId: { type: String },
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);