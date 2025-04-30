"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import OTPVerificationModal from './OTPVerificationModal';

const AuthManager = ({ children }) => {
  const { pendingVerification, user } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  // Export functions to open modals
  const openLoginModal = () => {
    setRegisterModalOpen(false);
    setOtpModalOpen(false);
    setLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setLoginModalOpen(false);
    setOtpModalOpen(false);
    setRegisterModalOpen(true);
  };

  // Handle switching between modals
  const handleSwitchToLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const handleSwitchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  // Automatically show OTP modal when pending verification exists
  useEffect(() => {
    if (pendingVerification) {
      setLoginModalOpen(false);
      setRegisterModalOpen(false);
      setOtpModalOpen(true);
    }
  }, [pendingVerification]);

  // Add auth globals to window for easy access from anywhere
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.openLoginModal = openLoginModal;
      window.openRegisterModal = openRegisterModal;
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.openLoginModal;
        delete window.openRegisterModal;
      }
    };
  }, []);

  return (
    <>
      {children}
      
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onSwitchToRegister={handleSwitchToRegister}
      />
      
      <RegisterModal 
        isOpen={registerModalOpen} 
        onClose={() => setRegisterModalOpen(false)} 
        onSwitchToLogin={handleSwitchToLogin}
      />
      
      <OTPVerificationModal 
        isOpen={otpModalOpen || !!pendingVerification} 
        onClose={() => setOtpModalOpen(false)}
      />
    </>
  );
};

export default AuthManager; 