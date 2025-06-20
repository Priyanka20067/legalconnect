import mongoose, { Schema } from 'mongoose';

export interface Booking {
  _id: string;
  userId: string;
  lawyerId: string;
  date: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const bookingSchema = new Schema<Booking>({
  userId: { type: String, required: true },
  lawyerId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model<Booking>('Booking', bookingSchema);