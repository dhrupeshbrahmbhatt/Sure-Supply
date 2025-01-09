const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (phoneNumber, otp) => {
  // Implement your SMS service here (Twilio, MessageBird, etc.)
  console.log(`OTP ${otp} sent to ${phoneNumber}`);
};

module.exports = { generateOTP, sendOTP }; 