'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../src/firebase';

export default function LoginPage() {
  const router = useRouter();

  // State management
  const [phoneDigits, setPhoneDigits] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('enter-phone');

  // Setup invisible reCAPTCHA
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
      });
    }
  }, []);

  // Australian mobile format check
  const AU_MOBILE_REGEX = /^4\d{8}$/;

  // Send OTP
  const handleSendOTP = async () => {
    const fullNumber = `+61${phoneDigits.replace(/\s+/g, '')}`;

    if (!AU_MOBILE_REGEX.test(phoneDigits)) {
      alert('Please enter a valid Australian mobile number (9 digits starting with 4). Example: 412345678');
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, fullNumber, appVerifier);
      setConfirmationResult(result);
      setStep('enter-otp');
    } catch (error) {
      console.error('OTP error:', error);
      alert(`Failed to send OTP: ${error.message || 'Please try again later.'}`);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      localStorage.setItem('phone', `+61${phoneDigits}`);
      router.push('/confirm-booking');
    } catch (error) {
      console.error('OTP verify error:', error);
      alert(`Invalid OTP: ${error.message || 'Please try again.'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-black mb-6">Login to Confirm Booking</h1>

      {/* Instructions */}
      <p className="text-lg text-gray-800 mb-2 text-center max-w-md">
        Enter your <strong>Australian mobile number</strong> below.  
        The country code <strong>+61</strong> is already included.  
        Example: <code>412345678</code>
      </p>
      <p className="text-sm text-gray-600 mb-4 text-center">
        After entering your number, click <strong>Send OTP</strong> to receive a one-time password.  
        Enter the OTP to verify and continue to booking.
      </p>

      {/* Phone input */}
      {step === 'enter-phone' && (
        <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-sm">
          <span className="text-gray-700 font-semibold mr-2">+61</span>
          <input
            type="text"
            value={phoneDigits}
            onChange={(e) => setPhoneDigits(e.target.value)}
            placeholder="412345678"
            className="bg-white text-black border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* OTP input */}
      {step === 'enter-otp' && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-sm">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="bg-white text-black border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}

      {/* Action buttons */}
      {step === 'enter-phone' && (
        <button
          onClick={handleSendOTP}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Send OTP
        </button>
      )}

      {step === 'enter-otp' && (
        <button
          onClick={handleVerifyOTP}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          Verify OTP
        </button>
      )}

      {/* reCAPTCHA container */}
      <div id="recaptcha-container"></div>

      {/* Footer */}
      <div className="mt-8 text-center text-lg text-gray-900">
        Need help? Call us at{' '}
        <strong className="text-blue-700">
          <a href="tel:+614XXXXXXXX">+61 4XX XXX XXX</a>
        </strong>
      </div>
    </div>
  );
}
