"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const OTPVerificationModal = ({ isOpen, onClose }) => {
  const { pendingVerification, verifyOTP, resendOTP } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  if (!isOpen || !pendingVerification) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!otp) {
      setError('Please enter the verification code');
      setLoading(false);
      return;
    }

    const result = await verifyOTP(otp);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Verification failed');
    } else {
      onClose();
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setResendDisabled(true);
    setCountdown(60); // 60 seconds cooldown

    const result = await resendOTP();
    
    if (!result.success) {
      setError(result.error || 'Failed to resend verification code');
      setResendDisabled(false);
      setCountdown(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-2 text-center">Verify Your Email</h2>
        <p className="text-gray-600 text-center mb-6">
          We've sent a verification code to <strong>{pendingVerification?.email}</strong>
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-medium mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-wider"
              placeholder="000000"
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:bg-blue-400"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{' '}
            <button 
              onClick={handleResendOTP} 
              disabled={resendDisabled}
              className="text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline"
            >
              {resendDisabled 
                ? `Resend in ${countdown}s` 
                : 'Resend Code'
              }
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal; 