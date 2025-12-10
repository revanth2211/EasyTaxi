'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MerchantLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (!email) {
      alert("Enter a valid email");
      return;
    }
    localStorage.setItem('merchantEmail', email);
    router.push('/merchant-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Merchant Login</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
        <label className="block mb-2 font-medium">Business Email</label>
        <input
          type="email"
          placeholder="you@business.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
        />
        <button
          onClick={handleLogin}
          className="w-full p-3 rounded text-white text-lg font-semibold transition bg-blue-600 hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
