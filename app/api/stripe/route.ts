import Stripe from 'stripe';
import connectDB from '../../lib/mongoose';
import Booking from '../../models/Booking';
import Payment from '../../models/Payment';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: Request) {
  await connectDB();
  const { lawyerId, date } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return new Response('Unauthorized', { status: 401 });

  const booking = await Booking.create({
    userId: session.user.id,
    lawyerId,
    date: new Date(date),
    status: 'PENDING',
  });

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'Lawyer Consultation' },
          unit_amount: 5000, // $50
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.headers.get('origin')}/success`,
    cancel_url: `${req.headers.get('origin')}/cancel`,
    metadata: { bookingId: booking._id.toString() },
  });

  await Payment.create({
    bookingId: booking._id,
    amount: 50.0,
    status: 'PENDING',
    stripeId: stripeSession.id,
  });

  return new Response(JSON.stringify({ sessionId: stripeSession.id }), { status: 200 });
}