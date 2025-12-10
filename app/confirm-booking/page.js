'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addBooking } from '../../src/bookingService';

export default function ConfirmBooking() {
  const router = useRouter();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPickup(localStorage.getItem('pickup') || '');
    setDropoff(localStorage.getItem('dropoff') || '');
    setVehicle(localStorage.getItem('vehicle') || '');
    setPhone(localStorage.getItem('phone') || '');
  }, []);

  const handleConfirm = async () => {
    setSaving(true);
    try {
      await addBooking({ pickup, dropoff, vehicle, phone });
      alert('Booking confirmed! Fare will be calculated by the cab meter.');
      router.push('/success');
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to confirm booking. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Confirm Booking</h1>

       <p className="text-black mb-2"><strong>Pickup:</strong> {pickup}</p>
       <p className="text-black mb-2"><strong>Dropoff:</strong> {dropoff}</p>
       <p className="text-black mb-2"><strong>Vehicle:</strong> {vehicle || 'Not selected'}</p>
       <p className="text-black mb-2"><strong>Phone:</strong> {phone}</p>


        <p className="text-gray-700 mb-6">
          Fare will be calculated by the cab’s meter when your trip begins. 
          A printed receipt can be provided by the driver if requested.
        </p>

        <button
          onClick={handleConfirm}
          disabled={saving}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {saving ? 'Saving...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}
