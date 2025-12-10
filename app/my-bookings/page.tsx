'use client';

import { useEffect, useState } from 'react';
import { getBookingsByPhone } from '../../src/bookingService';

export default function MyBookings() {
  const [phone, setPhone] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPhone = localStorage.getItem('phone') || '';
    setPhone(storedPhone);

    if (storedPhone) {
      getBookingsByPhone(storedPhone)
        .then((data) => setBookings(data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (!phone) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex items-center justify-center">
        <p className="text-gray-700">
          Please log in and complete a booking to see your ride history.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <p className="mb-4 text-gray-700">Phone: {phone}</p>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <p><strong>Pickup:</strong> {booking.pickup}</p>
              <p><strong>Drop-off:</strong> {booking.dropoff}</p>
              <p><strong>Vehicle:</strong> {booking.vehicle}</p>
              <p><strong>Fare:</strong> ${booking.fare}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p className="text-gray-500 text-sm mt-1">
                {booking.createdAt?.toDate
                  ? booking.createdAt.toDate().toLocaleString()
                  : ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
