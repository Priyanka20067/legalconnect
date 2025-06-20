'use client';

import { useState, MouseEvent } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

export default function BookingForm({ lawyerId }: { lawyerId: string }) {
  const [date, setDate] = useState<Date | [Date, Date] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (
    value: Date | [Date | null, Date | null] | null,
    _event: MouseEvent<HTMLButtonElement>
  ) => {
    if (Array.isArray(value)) {
      const selectedDate = value[0] instanceof Date ? value[0] : null;
      setDate(selectedDate);
    } else {
      setDate(value);
    }
  };

  const handleBooking = async () => {
    if (!date) return;

    const selectedDate = Array.isArray(date) ? date[0] : date;
    if (!(selectedDate instanceof Date)) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lawyerId, date: selectedDate.toISOString() }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create booking: ${response.statusText}`);
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert(`Failed to book appointment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
      <Calendar onChange={handleDateChange} value={date} />
      <button
        onClick={handleBooking}
        className="mt-4 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!date || isLoading}
      >
        {isLoading ? 'Processing...' : 'Book Now'}
      </button>
    </div>
  );
}