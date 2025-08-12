import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import BookingModel from '@/models/Booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { lawyerId, date, time, message } = await request.json();
    if (!lawyerId || !date || !time) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const booking = await BookingModel.create({
      userId: session.user.id,
      lawyerId,
      date: new Date(`${date}T${time}`),
      message,
      status: 'pending',
    });

    return NextResponse.json({ message: 'Booking created successfully', booking }, { status: 201 });
  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}