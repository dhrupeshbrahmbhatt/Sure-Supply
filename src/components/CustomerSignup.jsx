import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaArrowRight } from 'react-icons/fa';
import { RiVipCrownFill, RiSecurePaymentFill } from 'react-icons/ri';
import { IoSpeedometer } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    otp: ''
  });

  const [focusedField, setFocusedField] = useState(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const features = [
    {
      icon: <RiVipCrownFill size={32} />,
      title: "Dynamic Discounts",
      description: "Access time-sensitive deals on quality products"
    },
    {
      icon: <RiSecurePaymentFill size={32} />,
      title: "Impact Tracking",
      description: "Monitor your contribution to waste reduction"
    },
    {
      icon: <IoSpeedometer size={32} />,
      title: "Smart Notifications",
      description: "Real-time alerts for nearby deals"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleSendOtp = async () => {
    if (formData.phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const loadingToast = toast.loading('Sending OTP...');
    
    try {
      const response = await fetch('http://localhost:3000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formData.phoneNumber })
      });

      if (response.ok) {
        toast.success('OTP sent successfully!', { id: loadingToast });
        setShowOtpField(true);
        setOtpSent(true);
      } else {
        const error = await response.text();
        toast.error(error, { id: loadingToast });
      }
    } catch (error) {
      toast.error('Failed to send OTP', { id: loadingToast });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length < 2) {
      toast.error('Name must be at least 2 characters long');
      return;
    }
    
    if (!otpSent) {
      handleSendOtp();
      return;
    }

    if (!formData.otp) {
      toast.error('Please enter the OTP');
      return;
    }

    const loadingToast = toast.loading('Verifying OTP...');
    
    try {
      const response = await fetch('http://localhost:3000/customer/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Welcome to our community! 🎉', { id: loadingToast });
      } else {
        const error = await response.text();
        toast.error(error, { id: loadingToast });
      }
    } catch (error) {
      toast.error('Something went wrong', { id: loadingToast });
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
          {/* Left Side - Premium Features */}
          <div className="relative bg-gradient-to-br from-emerald-900 to-emerald-800 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/luxury-pattern.svg')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
            
            <div className="relative p-10 h-full flex flex-col justify-center">
              <motion.div variants={itemVariants}>
                <h1 className="text-5xl font-extrabold text-emerald-50 mb-6 leading-tight">
                  Smart Shopping<br />Made Sustainable
                </h1>
                <p className="text-emerald-100/80 text-lg mb-12">
                  Join our community of conscious consumers
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

          {/* Right Side - Signup Form */}
          <div className="p-10 flex flex-col justify-center bg-luxury-pearl/50 backdrop-blur-md">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
                Create Sustainable Account
              </h2>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <div className="relative group">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === 'name' ? 'text-emerald-500' : 'text-gray-400'
                  }`}>
                    <FaUser size={20} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 bg-white/50 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="relative group">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === 'phone' ? 'text-emerald-500' : 'text-gray-400'
                  }`}>
                    <FaPhone size={20} />
                  </span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 bg-white/50 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                    required
                  />
                </div>
              </motion.div>

              {showOtpField && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="relative group">
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'otp' ? 'text-emerald-500' : 'text-gray-400'
                    }`}>
                      <RiSecurePaymentFill size={20} />
                    </span>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      onFocus={() => setFocusedField('otp')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-4 bg-white/50 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  className="w-full py-4 px-6 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    {!otpSent ? 'Verify Number' : 'Join Premium Club'}
                    <FaArrowRight />
                  </span>
                </button>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="mt-6 text-sm text-gray-600 text-center">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-emerald-600 hover:text-emerald-500 transition-colors">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-emerald-600 hover:text-emerald-500 transition-colors">
                    Privacy Policy
                  </a>
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="mt-6 flex flex-col items-center space-y-4">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      to="/login/customer" 
                      className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors duration-300 border-b-2 border-transparent hover:border-emerald-500"
                    >
                      Login
                    </Link>
                  </p>
                  
                  <div className="w-full border-t border-gray-200" />
                  
                  <Link 
                    to="/signup/retailer" 
                    className="group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-all duration-300"
                  >
                    <span className="text-sm text-gray-600">Are you a business?</span>
                    <span className="font-semibold text-emerald-600 group-hover:text-emerald-500 transition-colors duration-300">
                      Register as Retailer →
                    </span>
                  </Link>
                </div>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerSignup; 