import Link from 'next/link';
import connectDB from '../lib/mongoose';
import LawyerModel, { Lawyer } from '../models/Lawyer';

export default async function Home() {
  await connectDB();
  const lawyers: Lawyer[] = await LawyerModel.find().lean();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Find a Lawyer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lawyers.map((lawyer) => (
          <div key={lawyer._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{lawyer.name}</h2>
            <p>{lawyer.specialization}</p>
            <Link href={`/lawyers/${lawyer._id}`} className="text-blue-500 hover:underline">
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}