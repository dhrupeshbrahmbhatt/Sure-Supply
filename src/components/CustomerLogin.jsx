import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowRight, FaPhone } from 'react-icons/fa';
import { RiVipCrownFill, RiSecurePaymentFill } from 'react-icons/ri';
import { IoSpeedometer } from 'react-icons/io5';
import toast from 'react-hot-toast';

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [focusedField, setFocusedField] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetMethod, setResetMethod] = useState(null); // 'email' or 'phone'
  const [resetData, setResetData] = useState({
    email: '',
    phoneNumber: '',
    otp: ''
  });

  const features = [
    {
      icon: <RiVipCrownFill size={32} />,
      title: "Smart Savings",
      description: "Access sustainable products at great prices"
    },
    {
      icon: <RiSecurePaymentFill size={32} />,
      title: "Track Impact",
      description: "See your contribution to reducing waste"
    },
    {
      icon: <IoSpeedometer size={32} />,
      title: "Real-time Alerts",
      description: "Never miss nearby sustainable deals"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const loadingToast = toast.loading('Logging in...');
    
    try {
      const response = await fetch('http://localhost:3000/customer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Welcome back! 🌟', { id: loadingToast });
        // Handle successful login (e.g., store token, redirect)
      } else {
        const error = await response.text();
        toast.error(error, { id: loadingToast });
      }
    } catch (error) {
      toast.error('Login failed', { id: loadingToast });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (resetMethod === 'email' && !resetData.email) {
      toast.error('Please enter your email');
      return;
    }

    if (resetMethod === 'phone' && !resetData.phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }

    const loadingToast = toast.loading('Sending reset instructions...');
    
    try {
      const endpoint = resetMethod === 'email' 
        ? 'send-reset-email' 
        : 'send-reset-otp';
      
      const response = await fetch(`http://localhost:3000/customer/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetMethod === 'email' 
          ? { email: resetData.email }
          : { phoneNumber: resetData.phoneNumber }
        )
      });

      if (response.ok) {
        toast.success(
          resetMethod === 'email'
            ? 'Reset link sent to your email!'
            : 'OTP sent to your phone!',
          { id: loadingToast }
        );
      } else {
        const error = await response.text();
        toast.error(error, { id: loadingToast });
      }
    } catch (error) {
      toast.error('Failed to send reset instructions', { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-pearl-gradient">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-7xl mx-auto px-4 py-8"
      >
        <div className="grid md:grid-cols-2 min-h-[700px] rounded-[30px] overflow-hidden shadow-luxury bg-white/80 backdrop-blur-lg">
          {/* Left Side - Features */}
          <div className="relative bg-gradient-to-br from-emerald-900 to-emerald-800 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/luxury-pattern.svg')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
            
            <div className="relative p-10 h-full flex flex-col justify-center">
              <motion.div variants={itemVariants}>
                <h1 className="text-5xl font-extrabold text-emerald-50 mb-6 leading-tight">
                  Welcome Back to<br />Sustainable Shopping
                </h1>
                <p className="text-emerald-100/80 text-lg mb-12">
                  Continue your journey in reducing waste
                </p>
              </motion.div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300"
                  >
                    <div className="mr-6 p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 text-emerald-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-emerald-50 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-emerald-100/70">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-10 flex flex-col justify-center bg-luxury-pearl/50 backdrop-blur-md">
            {!showForgotPassword ? (
              <>
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
                    Login to Your Account
                  </h2>
                </motion.div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <div className="relative">
                      <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        focusedField === 'email' ? 'text-emerald-500' : 'text-gray-400'
                      }`}>
                        <FaEnvelope size={20} />
                      </span>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-4 bg-white/50 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="relative">
                      <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        focusedField === 'password' ? 'text-emerald-500' : 'text-gray-400'
                      }`}>
                        <FaLock size={20} />
                      </span>
                      <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-4 bg-white/50 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      className="w-full py-4 px-6 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Login
                        <FaArrowRight />
                      </span>
                    </button>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="mt-6 flex flex-col items-center space-y-4">
                      <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link 
                          to="/signup/customer" 
                          className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors duration-300 border-b-2 border-transparent hover:border-emerald-500"
                        >
                          Sign up
                        </Link>
                      </p>
                      
                      <div className="w-full border-t border-gray-200" />
                      
                      <Link 
                        to="/login/retailer" 
                        className="group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-all duration-300"
                      >
                        <span className="text-sm text-gray-600">Are you a business?</span>
                        <span className="font-semibold text-emerald-600 group-hover:text-emerald-500 transition-colors duration-300">
                          Login as Retailer →
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                </form>
              </>
            ) : (
              <>
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
                    Reset Password
                  </h2>
                </motion.div>

                {!resetMethod ? (
                  <div className="space-y-4">
                    <motion.button
                      variants={itemVariants}
                      onClick={() => setResetMethod('email')}
                      className="w-full p-4 text-left rounded-2xl bg-white/50 border border-gray-200 hover:border-emerald-500 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <FaEnvelope size={24} className="text-emerald-500" />
                        <div>
                          <h3 className="font-semibold">Reset via Email</h3>
                          <p className="text-sm text-gray-600">Get a reset link in your email</p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      variants={itemVariants}
                      onClick={() => setResetMethod('phone')}
                      className="w-full p-4 text-left rounded-2xl bg-white/50 border border-gray-200 hover:border-emerald-500 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <FaPhone size={24} className="text-emerald-500" />
                        <div>
                          <h3 className="font-semibold">Reset via Phone</h3>
                          <p className="text-sm text-gray-600">Get an OTP on your phone</p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.div variants={itemVariants} className="text-center mt-6">
                      <button
                        onClick={() => setShowForgotPassword(false)}
                        className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
                      >
                        Back to Login
                      </button>
                    </motion.div>
                  </div>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-6">
                    <motion.div variants={itemVariants}>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          {resetMethod === 'email' ? <FaEnvelope size={20} /> : <FaPhone size={20} />}
                        </span>
                        <input
                          type={resetMethod === 'email' ? 'email' : 'tel'}
                          placeholder={resetMethod === 'email' ? 'Email Address' : 'Phone Number'}
                          value={resetMethod === 'email' ? resetData.email : resetData.phoneNumber}
                          onChange={(e) => setResetData({ 
                            ...resetData, 
                            [resetMethod === 'email' ? 'email' : 'phoneNumber']: e.target.value 
                          })}
                          className="w-full pl-12 pr-4 py-4 bg-white/50 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button
                        type="submit"
                        className="w-full py-4 px-6 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Send Reset Instructions
                          <FaArrowRight />
                        </span>
                      </button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setResetMethod(null);
                          setResetData({ email: '', phoneNumber: '', otp: '' });
                        }}
                        className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
                      >
                        Try Another Method
                      </button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgotPassword(false);
                          setResetMethod(null);
                          setResetData({ email: '', phoneNumber: '', otp: '' });
                        }}
                        className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
                      >
                        Back to Login
                      </button>
                    </motion.div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerLogin; 