'use client';

import { useState } from 'react';
import Calendar, { Value } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function BookingForm({ lawyerId }: { lawyerId: string }) {
  const [date, setDate] = useState<Value>(null);

  const handleBooking = async () => {
    if (!date) return;

    // Handle single date or first date in range
    const selectedDate = Array.isArray(date) ? date[0] : date;
    if (!(selectedDate instanceof Date)) return;

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lawyerId, date: selectedDate }),
    });

    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
      <Calendar onChange={setDate} value={date} />
      <button
        onClick={handleBooking}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
        disabled={!date}
      >
        Book Now
      </button>
    </div>
  );
}