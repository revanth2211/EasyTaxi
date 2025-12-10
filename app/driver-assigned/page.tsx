'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DriverInfo {
  name: string;
  vehicle: string;
  plate: string;
  rating: number;
  etaMinutes: number;
}

export default function DriverAssigned() {
  const router = useRouter();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [fare, setFare] = useState('');
  const [driver] = useState<DriverInfo>({
    name: "Alex Johnson",
    vehicle: "Toyota Camry (Standard)",
    plate: "VIC EZT-123",
    rating: 4.9,
    etaMinutes: 5,
  });

  useEffect(() => {
    setPickup(localStorage.getItem('pickup') || '');
    setDropoff(localStorage.getItem('dropoff') || '');
    setFare(localStorage.getItem('fare') || '');
  }, []);

  const handleTrackRide = () => {
    router.push('/track-ride');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Driver Assigned</h1>
      <p className="mb-6 text-gray-700">Your driver is on the way.</p>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mb-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mr-3">
            {driver.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{driver.name}</p>
            <p className="text-gray-500 text-sm">{driver.vehicle}</p>
            <p className="text-gray-500 text-sm">Plate: {driver.plate}</p>
            <p className="text-yellow-500 text-sm">⭐ {driver.rating}</p>
          </div>
        </div>

        <div className="border-t pt-4 mt-4 text-sm text-gray-700">
          <p><strong>Pickup:</strong> {pickup}</p>
          <p><strong>Drop-off:</strong> {dropoff}</p>
          <p><strong>Fare:</strong> ${fare}</p>
          <p className="mt-2 text-blue-600 font-semibold">
            ETA: {driver.etaMinutes} minutes
          </p>
        </div>
      </div>

      <button
        onClick={handleTrackRide}
        className="w-full max-w-md bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Track Ride
      </button>
    </div>
  );
}
