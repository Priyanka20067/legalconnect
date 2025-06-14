import connectDB from '../../lib/mongoose';
import Booking from '../../models/Booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  await connectDB();
  const { lawyerId, date } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session) return new Response('Unauthorized', { status: 401 });

  const booking = await Booking.create({
    userId: session.user.id,
    lawyerId,
    date: new Date(date),
    status: 'PENDING',
  });

  return new Response(JSON.stringify(booking), { status: 200 });
}