import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import { sendOTP } from '../services/emailService';

const LoginPopup = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [userOTP, setUserOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuthStore();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        onClose();
      } else {
        // Generate and send OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(otp);
        
        const res = await sendOTP(email, name, otp);
        if (res.success) {
          setShowOTPInput(true);
        } else {
          setError('Failed to send OTP to this email. Please check your email address.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (userOTP === generatedOTP) {
        await register(name, email, password);
        onClose();
      } else {
        setError('Invalid OTP code. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-[700px] min-h-[400px] md:h-[528px] max-h-[90vh] rounded-sm overflow-hidden relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute right-2 top-2 md:-right-8 md:top-0 text-gray-500 md:text-white text-3xl opacity-80 hover:opacity-100 z-10"
        >
          &times;
        </button>

        {/* Left Side: Blue Banner */}
        <div className="w-full md:w-[40%] bg-[#2874f0] p-6 md:p-8 flex-col justify-between hidden md:flex">
          <div>
            <h2 className="text-[28px] font-medium text-white mb-4">
              {isLogin ? 'Login' : 'Looks like you\'re new here!'}
            </h2>
            <p className="text-[15px] text-[#dbe4fd] leading-relaxed">
              {isLogin 
                ? 'Get access to your Orders, Wishlist and Recommendations' 
                : 'Sign up with your mobile number to get started'}
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <img 
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
              alt="Login illustration"
              className="max-w-full"
            />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[60%] p-6 md:p-8 bg-white relative overflow-y-auto">
          {!showOTPInput ? (
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              {error && <div className="text-red-500 text-xs mb-4">{error}</div>}
              
              {!isLogin && (
                <div className="relative mb-6">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#2874f0] transition-colors peer bg-transparent"
                    placeholder=" "
                  />
                  <label className={`absolute left-0 pointer-events-none transition-all ${name ? '-top-3 text-[12px] text-[#878787]' : 'top-2 text-[14px] text-[#878787]'} peer-focus:-top-3 peer-focus:text-[12px] peer-focus:text-[#2874f0]`}>
                    Full Name
                  </label>
                </div>
              )}

              <div className="relative mb-6">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#2874f0] transition-colors peer bg-transparent"
                  placeholder=" "
                />
                <label className={`absolute left-0 pointer-events-none transition-all ${email ? '-top-3 text-[12px] text-[#878787]' : 'top-2 text-[14px] text-[#878787]'} peer-focus:-top-3 peer-focus:text-[12px] peer-focus:text-[#2874f0]`}>
                  Enter Email/Mobile number
                </label>
              </div>

              <div className="relative mb-8">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#2874f0] transition-colors peer bg-transparent"
                  placeholder=" "
                />
                <label className={`absolute left-0 pointer-events-none transition-all ${password ? '-top-3 text-[12px] text-[#878787]' : 'top-2 text-[14px] text-[#878787]'} peer-focus:-top-3 peer-focus:text-[12px] peer-focus:text-[#2874f0]`}>
                  Enter Password
                </label>
              </div>

              <p className="text-[12px] text-[#878787] mb-4">
                By continuing, you agree to Flipkart's <span className="text-[#2874f0]">Terms of Use</span> and <span className="text-[#2874f0]">Privacy Policy</span>.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#fb641b] text-white py-3 font-medium rounded-sm shadow hover:shadow-lg transition-shadow disabled:opacity-70 flex justify-center items-center h-[48px]"
              >
                {isLoading ? (
                   <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  isLogin ? 'Login' : 'Continue'
                )}
              </button>

            {isLogin && (
              <div className="text-center mt-4">
                <span className="text-[#2874f0] text-[13px] font-medium cursor-pointer">
                  Forgot Password?
                </span>
              </div>
            )}

            <div className="mt-auto pt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-[#2874f0] text-[14px] font-medium cursor-pointer bg-white py-3 w-full shadow-[0_2px_4px_0_rgba(0,0,0,.2)] rounded-sm hover:shadow-[0_4px_8px_0_rgba(0,0,0,.2)]"
              >
                {isLogin ? 'New to Flipkart? Create an account' : 'Existing User? Log in'}
              </button>
            </div>
          </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="flex flex-col h-full">
              <div className="mb-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Verify Email</h3>
                <p className="text-[13px] text-gray-600">Please enter the 6-digit verification code sent to <strong>{email}</strong></p>
              </div>

              {error && <div className="text-red-500 text-xs mb-4 text-center">{error}</div>}

              <div className="relative mb-8">
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={userOTP}
                  onChange={(e) => setUserOTP(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#2874f0] transition-colors peer bg-transparent text-center tracking-[0.5em] text-lg font-semibold"
                  placeholder=" "
                />
                <label className={`absolute left-0 pointer-events-none transition-all ${userOTP ? '-top-3 text-[12px] text-[#878787]' : 'top-2 text-[14px] text-[#878787] text-center w-full'} peer-focus:-top-3 peer-focus:text-[12px] peer-focus:text-[#2874f0] peer-focus:text-left`}>
                  Enter OTP
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || userOTP.length !== 6}
                className="w-full bg-[#fb641b] text-white py-3 font-medium rounded-sm shadow hover:shadow-lg transition-shadow disabled:opacity-70 flex justify-center items-center h-[48px]"
              >
                {isLoading ? (
                   <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  'Verify & Signup'
                )}
              </button>
              
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setShowOTPInput(false)}
                  className="text-[#2874f0] text-[13px] font-medium"
                >
                  Change Email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
