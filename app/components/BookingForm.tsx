'use client';

import { useState, MouseEvent } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function BookingForm({ lawyerId }: { lawyerId: string }) {
  const [date, setDate] = useState<Date | [Date, Date] | null>(null);

  const handleDateChange = (
    value: Date | [Date | null, Date | null] | null,
    _event: MouseEvent<HTMLButtonElement>
  ) => {
    if (Array.isArray(value)) {
      // Handle range selection; use first valid date or null
      const selectedDate = value[0] instanceof Date ? value[0] : null;
      setDate(selectedDate);
    } else {
      // Handle single date or null
      setDate(value);
    }
  };

  const handleBooking = async () => {
    if (!date) return;

    // Handle single date or first date in range
    const selectedDate = Array.isArray(date) ? date[0] : date;
    if (!(selectedDate instanceof Date)) return;

    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lawyerId, date: selectedDate.toISOString() }),
      });

      if (!response.ok) throw new Error('Failed to create booking');

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
      <Calendar onChange={handleDateChange} value={date} />
      <button
        onClick={handleBooking}
        className="mt-4 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        disabled={!date}
      >
        Book Now
      </button>
    </div>
  );
}