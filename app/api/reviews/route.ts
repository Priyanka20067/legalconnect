import connectDB from '../../../lib/mongoose';
import Review from '../../../models/Review';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  await connectDB();
  const { lawyerId, rating, comment } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return new Response('Unauthorized', { status: 401 });

  const review = await Review.create({
    userId: session.user.id,
    lawyerId,
    rating,
    comment,
    createdAt: new Date(),
  });

  return new Response(JSON.stringify(review), { status: 201 });
}