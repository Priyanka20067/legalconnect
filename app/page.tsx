import Link from 'next/link';
import connectDB from '../app/lib/mongoose';
import Lawyer from '../app/models/Lawyer';
import User from '../app/models/User';

export default async function Home() {
  await connectDB();
  const lawyers = await Lawyer.find().populate('userId').limit(6);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Find a Lawyer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lawyers.map((lawyer) => (
          <div key={lawyer._id.toString()} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{lawyer.userId.name}</h2>
            <p>Category: {lawyer.category}</p>
            <p>Experience: {lawyer.experience} years</p>
            <Link href={`/lawyers/${lawyer._id}`} className="text-blue-500">
              View Profile
            </Link>
          </div>
        ))}
      </div>
      <Link href="/search" className="mt-4 inline-block bg-blue-500 text-white p-2 rounded">
        Search Lawyers
      </Link>
    </div>
  );
}