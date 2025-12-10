'use client';

export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Booking Confirmed!</h1>
      <p className="text-gray-700 mb-6">
        Your cab is on the way. The fare will be calculated by the cab’s meter when your trip begins. 
        A printed receipt can be provided by the driver if requested.
      </p>
      <a
        href="/"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Back to Home
      </a>
    </div>
  );
}
