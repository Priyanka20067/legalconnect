import connectDB from '@/lib/mongoose';
import LawyerModel, { Lawyer } from '@/models/Lawyer';
import Link from 'next/link';

export default async function Home() {
  await connectDB();
  const lawyers: Lawyer[] = await LawyerModel.find().lean<Lawyer[]>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to LegalConnect</h1>
      <h2 className="text-2xl font-semibold mb-4">Available Lawyers</h2>
      {lawyers.length === 0 ? (
        <p>No lawyers found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lawyers.map((lawyer) => (
            <li key={lawyer._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-bold">{lawyer.name}</h3>
              <p>Specialization: {lawyer.specialization}</p>
              <Link href={`/lawyers/${lawyer._id}`} className="text-blue-500 hover:underline">
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}