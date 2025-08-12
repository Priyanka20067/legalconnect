import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongoose';
import LawyerModel, { Lawyer } from '@/models/Lawyer';
import BookingForm from '@/app/components/BookingForm';
import ReviewSection from '@/app/components/ReviewSection';
import mongoose from 'mongoose';

interface LawyerPageProps {
  params: Promise<{ id: string }>;
}

export default async function LawyerPage({ params }: LawyerPageProps) {
  await connectDB();
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!mongoose.isValidObjectId(id)) {
    notFound();
  }

  const lawyer: Lawyer | null = await LawyerModel.findById(id).lean<Lawyer>();

  if (!lawyer) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{lawyer.name}</h1>
      <p className="text-lg mb-2">Specialization: {lawyer.specialization}</p>
      <p className="mb-4">{lawyer.bio || 'No bio available.'}</p>
      <BookingForm lawyerId={lawyer._id} />
      <ReviewSection lawyerId={lawyer._id} />
    </div>
  );
}