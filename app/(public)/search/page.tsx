import Link from 'next/link';
import connectDB from '../../lib/mongoose';
import Lawyer from '../../models/Lawyer';

export default async function Search({ searchParams }: { searchParams: { category?: string; experience?: string } }) {
  await connectDB();
  const query: any = {};
  if (searchParams.category) query.category = searchParams.category;
  if (searchParams.experience) query.experience = { $gte: parseInt(searchParams.experience) };
  const lawyers = await Lawyer.find(query).populate('userId');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Search Lawyers</h1>
      <form className="mb-6">
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Divorce)"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="experience"
          placeholder="Min Experience (years)"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
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
    </div>
  );
}