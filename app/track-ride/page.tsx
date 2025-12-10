'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrackRide() {
  const router = useRouter();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [eta, setEta] = useState(5);

  useEffect(() => {
    setPickup(localStorage.getItem('pickup') || '');
    setDropoff(localStorage.getItem('dropoff') || '');

    const interval = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // every 1 minute

    return () => clearInterval(interval);
  }, []);

  const handleEndRide = () => {
    router.push('/ride-complete');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Track Your Ride</h1>
      <p className="mb-4 text-gray-700">
        From <strong>{pickup}</strong> to <strong>{dropoff}</strong>
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-xl mb-6">
        {/* Map placeholder */}
        <div className="w-full h-64 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
          Map view coming soon
        </div>
        <p className="text-blue-600 font-semibold text-lg">
          ETA: {eta} minute{eta === 1 ? '' : 's'}
        </p>
        <p className="text-gray-600 text-sm mt-2">
          Your driver is on the way. You will arrive at your destination shortly.
        </p>
      </div>

      <button
        onClick={handleEndRide}
        className="w-full max-w-md bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        End Ride
      </button>
    </div>
  );
}
