'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Fallback component for car images
function CarImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  return error ? (
    <div className="w-20 h-20 flex items-center justify-center bg-gray-200 text-gray-700 text-xs rounded border border-gray-300">
      Image not found
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className="w-80 h-80 object-contain"
      onError={() => setError(true)}
    />
  );
}

export default function RideOptions() {
  const router = useRouter();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  useEffect(() => {
    setPickup(localStorage.getItem('pickup') || '');
    setDropoff(localStorage.getItem('dropoff') || '');
  }, []);

  const selectVehicle = (vehicle: string) => {
    localStorage.setItem('selectedVehicle', vehicle);
    router.push('/summary');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-black mb-6">Choose Your Ride</h1>
      <p className="text-lg text-gray-900 mb-4">
        From <strong>{pickup}</strong> to <strong>{dropoff}</strong>
      </p>

      <div className="grid gap-6 w-full max-w-md">
        {[
          { type: 'Standard', image: '/standard.png' },
          { type: 'SUV', image: '/suv.png' },
          { type: 'Premium', image: '/premium.png' },
        ].map(({ type, image }) => (
          <div
            key={type}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex items-center justify-between cursor-pointer hover:shadow-lg"
            onClick={() => selectVehicle(type)}
          >
            <div>
              <p className="text-lg font-semibold text-gray-900">{type}</p>
              <p className="text-sm text-gray-700">ETA: 5 mins</p>
              <p className="text-sm text-gray-700 italic">
                Fare will be calculated using the cab meter once your ride starts.
              </p>
            </div>
            <CarImage src={image} alt={`${type} car`} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-lg text-gray-900">
        Need help? Call us at{' '}
        <strong className="text-blue-700">
          <a href="tel:+614XXXXXXXX">+61 4XX XXX XXX</a>
        </strong>
      </div>
    </div>
  );
}
