import mongoose, { Schema } from 'mongoose';

export interface Booking {
  _id: string;
  userId: string;
  lawyerId: string;
  date: Date;
  message?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const bookingSchema = new Schema<Booking>({
  userId: { type: String, required: true },
  lawyerId: { type: String, required: true },
  date: { type: Date, required: true },
  message: { type: String },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model<Booking>('Booking', bookingSchema);