'use client';

export default function PaymentOptions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Payment Options</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
        <p className="mb-2 text-gray-700">
          This is a placeholder for your unified payment gateway.
        </p>
        <p className="text-gray-600 text-sm">
          Here you’ll let users choose between card, wallet, rewards, and merchant-linked offers,
          all under a single seamless flow.
        </p>
      </div>
    </div>
  );
}
