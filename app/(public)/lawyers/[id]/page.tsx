import connectDB from '../../../lib/mongoose';
import Lawyer from '../../../models/Lawyer';
import Review from '../../../models/Review';


export default async function LawyerProfile({ params }: { params: { id: string } }) {
  await connectDB();
  const lawyer = await Lawyer.findById(params.id).populate('userId');
  const reviews = await Review.find({ lawyerId: params.id }).populate('userId');

  if (!lawyer) return <div>Lawyer not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{lawyer.userId.name}</h1>
      <p>Category: {lawyer.category}</p>
      <p>Experience: {lawyer.experience} years</p>
      <p>Bio: {lawyer.bio}</p>
      <p>Credentials: {lawyer.credentials}</p>
     
    </div>
  );
}