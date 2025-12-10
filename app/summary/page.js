'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SummaryPage() {
  const router = useRouter();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [fare, setFare] = useState('');

  useEffect(() => {
    // Optional enhancement: redirect if not logged in
    const phone = localStorage.getItem('phone');
    if (!phone) {
      // If you want to force login before summary, uncomment:
      // router.push('/login');
    }

    setPickup(localStorage.getItem('pickup') || '');
    setDropoff(localStorage.getItem('dropoff') || '');
    setVehicle(localStorage.getItem('selectedVehicle') || '');
    setFare(localStorage.getItem('fare') || '');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-black mb-6">Booking Summary</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <p className="text-lg text-gray-900 mb-2"><strong>Pickup:</strong> {pickup}</p>
        <p className="text-lg text-gray-900 mb-2"><strong>Drop-off:</strong> {dropoff}</p>
        <p className="text-lg text-gray-900 mb-2"><strong>Vehicle:</strong> {vehicle}</p>
        <p className="text-lg text-gray-900 mb-2"><strong>Fare:</strong> ${fare}</p>
      </div>

      <button
        onClick={() => router.push('/login')}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        Continue to Login
      </button>

      <div className="mt-8 text-center text-lg text-gray-900">
        Need help? Call us at{' '}
        <strong className="text-blue-700">
          <a href="tel:+614XXXXXXXX">+61 4XX XXX XXX</a>
        </strong>
      </div>
    </div>
  );
}
