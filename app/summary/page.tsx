'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Summary() {
  const router = useRouter();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [vehicle, setVehicle] = useState('');

  useEffect(() => {
    setPickup(localStorage.getItem('pickup') || '');
    setDropoff(localStorage.getItem('dropoff') || '');
    setVehicle(localStorage.getItem('selectedVehicle') || '');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-black mb-6">Booking Summary</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-full max-w-md mb-6">
        <p className="text-lg text-gray-900"><strong>Pickup:</strong> {pickup}</p>
        <p className="text-lg text-gray-900"><strong>Drop-off:</strong> {dropoff}</p>
        <p className="text-lg text-gray-900"><strong>Vehicle:</strong> {vehicle}</p>
        <p className="text-sm text-gray-700 italic mt-2">
          Fare will be calculated using the cab meter once your ride starts.
        </p>
      </div>

      <button
        onClick={() => router.push('/login')}
        className="w-full max-w-md bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Continue to Login
      </button>

      <div className="mt-8 text-center text-lg text-gray-800">
        Need help? Call us at <strong className="text-blue-700">1300 123 456</strong>
      </div>
    </div>
  );
}
