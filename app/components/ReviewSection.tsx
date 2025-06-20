'use client';

import { useEffect, useState } from 'react';

// Define Review interface to match models/Review.ts
interface Review {
  _id: string;
  userId: string;
  lawyerId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ReviewSection({ lawyerId }: { lawyerId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(`/api/reviews?lawyerId=${lawyerId}`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [lawyerId]);

  if (loading) return <p>Loading reviews...</p>;
  if (!reviews.length) return <p>No reviews yet.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review._id} className="border p-4 rounded shadow">
            <p>Rating: {review.rating}/5</p>
            {review.comment && <p>Comment: {review.comment}</p>}
            <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}