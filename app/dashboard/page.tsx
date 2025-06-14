import { getServerSession } from 'next-auth';
import connectDB from '../lib/mongoose';
import Lawyer from '../models/Lawyer';
import Booking from '../models/Booking';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Dashboard() {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'LAWYER') {
    return <div>Access Denied</div>;
  }

  const lawyer = await Lawyer.findOne({ userId: session.user.id }).populate('bookings');
  if (!lawyer) return <div>Lawyer not found</div>;

  const bookings = await Booking.find({ lawyerId: lawyer._id });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Lawyer Dashboard</h1>
      <h2 className="text-2xl">Your Bookings</h2>
      <div className="grid grid-cols-1 gap-4">
        {bookings.map((booking) => (
          <div key={booking._id.toString()} className="border p-4 rounded-lg">
            <p>Date: {booking.date.toLocaleString()}</p>
            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}