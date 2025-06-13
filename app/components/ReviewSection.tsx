'use client';

import { useState } from 'react';

export default function ReviewSection({ reviews, lawyerId }: { reviews: any[]; lawyerId: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lawyerId, rating, comment }),
    });
    setRating(0);
    setComment('');
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id.toString()} className="border p-4 mb-2 rounded-lg">
          <p>Rating: {review.rating}/5</p>
          <p>{review.comment}</p>
          <p>By: {review.userId.name}</p>
        </div>
      ))}
      <div className="mt-4">
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="border p-2 mr-2"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a review"
          className="border p-2 w-full"
        />
        <button onClick={handleSubmit} className="mt-2 bg-blue-500 text-white p-2 rounded">
          Submit Review
        </button>
      </div>
    </div>
  );
}