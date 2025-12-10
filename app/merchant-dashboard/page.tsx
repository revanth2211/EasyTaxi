'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MerchantDashboard() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('merchantEmail') || '';
    if (!storedEmail) {
      router.push('/merchant-login');
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <h1 className="text-2xl font-bold mb-2">Merchant Dashboard</h1>
      <p className="mb-6 text-gray-700">Logged in as: {email}</p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h2 className="font-semibold mb-2">Nearby Ride Traffic</h2>
          <p className="text-gray-600 text-sm">
            Coming soon: see how many EasyTaxi riders pass near your location.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h2 className="font-semibold mb-2">Promotions</h2>
          <p className="text-gray-600 text-sm">
            Configure offers that show up to riders as they approach your store.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h2 className="font-semibold mb-2">Payment Insights</h2>
          <p className="text-gray-600 text-sm">
            Future: connect to your unified payment platform for real-time spend analytics.
          </p>
        </div>
      </div>
    </div>
  );
}
