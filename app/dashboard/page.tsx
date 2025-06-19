import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import connectDB from '../lib/mongoose';
import Booking from '../models/Booking';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <div className="container mx-auto p-4">Please sign in to view your dashboard.</div>;
  }

  await connectDB();
  const bookings = await Booking.find({ userId: session.user.id }).lean();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session.user.name || 'User'} ({session.user.role || 'User'})
      </h1>
      <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking: any) => (
            <li key={booking._id} className="border p-4 rounded shadow">
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}