import connectDB from '../../../lib/mongoose';
import LawyerModel, { Lawyer } from '../../../models/Lawyer';
import BookingForm from '../../components/BookingForm';
import { notFound } from 'next/navigation';

export default async function LawyerProfile({ params }: { params: { id: string } }) {
  await connectDB();
  const lawyer: Lawyer | null = await LawyerModel.findById(params.id).lean<Lawyer>();

  if (!lawyer) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{lawyer.name}</h1>
      <p className="mb-2">Specialization: {lawyer.specialization}</p>
      <p className="mb-4">{lawyer.bio || 'No bio available'}</p>
      <BookingForm lawyerId={params.id} />
    </div>
  );
}