'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RideComplete() {
  const router = useRouter();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [fare, setFare] = useState('');

  useEffect(() => {
    setPickup(localStorage.getItem('pickup') || '');
    setDropoff(localStorage.getItem('dropoff') || '');
    setVehicle(localStorage.getItem('selectedVehicle') || '');
    setFare(localStorage.getItem('fare') || '');
  }, []);

  const handleBookAgain = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Ride Completed</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mb-6">
        <p className="mb-2"><strong>Pickup:</strong> {pickup}</p>
        <p className="mb-2"><strong>Drop-off:</strong> {dropoff}</p>
        <p className="mb-2"><strong>Vehicle:</strong> {vehicle}</p>
        <p className="mb-2"><strong>Total Fare:</strong> ${fare}</p>
        <p className="mt-4 text-green-600 font-semibold">
          Thank you for riding with EasyTaxi.
        </p>
      </div>

      <button
        onClick={handleBookAgain}
        className="w-full max-w-md bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Book Another Ride
      </button>
    </div>
  );
}
