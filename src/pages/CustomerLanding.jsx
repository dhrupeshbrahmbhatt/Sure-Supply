import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import "../App.css";
import 'aos/dist/aos.css';
import {
  ShoppingBag,
  MapPin,
  LeafyGreen,
  Bell,
  Smartphone,
  TrendingUp,
  Award,
  Zap,
  Leaf,
  Factory,
  Sprout,
  Crown,
  Star,
} from 'lucide-react';
import Navbar from '../components/Navbar';

const CustomerLanding = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />

      {/* Hero Section with Glassmorphism */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent)] animate-pulse" />
        <div className="absolute inset-0 bg-[url('/luxury-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-white/20"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-emerald-900 mb-6">
              Premium Savings.<br />
              <span className="bg-gradient-to-r from-emerald-600 to-yellow-500 text-transparent bg-clip-text">
                Sustainable Living.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Join the elite community of conscious consumers saving money while saving the planet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                Download App
                <Smartphone className="inline-block ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-full text-lg font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Features Showcase */}
      <section className="py-20 bg-white/80">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center text-gray-900 mb-16">
            Premium Features for Smart Shopping
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <AppFeatureCard
              icon={<Bell className="w-8 h-8" />}
              title="Smart Notifications"
              description="Get real-time alerts for exclusive deals near you"
              delay={0}
            />
            <AppFeatureCard
              icon={<MapPin className="w-8 h-8" />}
              title="Store Locator"
              description="Find premium retailers and deals in your vicinity"
              delay={100}
            />
            <AppFeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Savings Tracker"
              description="Monitor your savings and environmental impact"
              delay={200}
            />
            <AppFeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Rewards Program"
              description="Earn points and unlock exclusive benefits"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gradient-to-b from-emerald-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center mb-16">
            Choose Your Premium Experience
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <MembershipCard
              title="Basic"
              price="Free"
              features={[
                "Basic deal notifications",
                "Store locator",
                "Basic savings tracking",
                "Community access"
              ]}
              delay={0}
            />
            <MembershipCard
              title="Premium"
              price="₹299/month"
              features={[
                "Priority deal access",
                "Advanced savings tracking",
                "Exclusive rewards",
                "Premium support",
                "Partner discounts"
              ]}
              recommended={true}
              delay={100}
            />
            <MembershipCard
              title="Enterprise"
              price="₹999/month"
              features={[
                "All Premium features",
                "API access",
                "Dedicated account manager",
                "Custom solutions",
                "Bulk purchasing options"
              ]}
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Waste-to-Energy Statistics */}
      <section className="py-20 bg-white/80">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center text-gray-900 mb-16">
            Our Environmental Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ImpactCard
              icon={<Zap className="w-12 h-12" />}
              stat="50,000 kWh"
              label="Energy Generated"
              description="Converted food waste into clean electricity"
              delay={0}
            />
            <ImpactCard
              icon={<Leaf className="w-12 h-12" />}
              stat="25,000 kg"
              label="CO₂ Reduced"
              description="Reduced carbon emissions through waste management"
              delay={100}
            />
            <ImpactCard
              icon={<Sprout className="w-12 h-12" />}
              stat="10,000 kg"
              label="Compost Created"
              description="Organic waste converted to fertile compost"
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Biomass Management Partners */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center text-gray-900 mb-16">
            Our Sustainability Partners
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <PartnerCard
              icon={<Factory className="w-8 h-8" />}
              name="GreenPower Biogas"
              type="Biogas Plant"
              capacity="Processes 5000kg/day"
              delay={0}
            />
            <PartnerCard
              icon={<Leaf className="w-8 h-8" />}
              name="EcoCompost India"
              type="Composting Facility"
              capacity="Handles 2000kg/day"
              delay={100}
            />
            <PartnerCard
              icon={<Zap className="w-8 h-8" />}
              name="BiofuelTech"
              type="Biofuel Producer"
              capacity="Converts 3000L/day"
              delay={200}
            />
            <PartnerCard
              icon={<Sprout className="w-8 h-8" />}
              name="AgroRecycle"
              type="Agricultural Partner"
              capacity="Uses 1000kg/day"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Mobile App Showcase */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold mb-8">Experience Premium Shopping on Mobile</h2>
              <div className="space-y-6">
                <AppFeature
                  title="Real-time Notifications"
                  description="Get instant alerts for exclusive deals near you"
                />
                <AppFeature
                  title="Smart Dashboard"
                  description="Track your savings and environmental impact"
                />
                <AppFeature
                  title="Digital Rewards"
                  description="Earn and redeem points seamlessly"
                />
                <AppFeature
                  title="Store Locator"
                  description="Find participating stores with ease"
                />
              </div>
              <div className="mt-8 flex gap-4">
                <img src="/app-store.png" alt="App Store" className="h-12" />
                <img src="/play-store.png" alt="Play Store" className="h-12" />
              </div>
            </div>
            <div data-aos="fade-left" className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-transparent rounded-3xl transform rotate-6"></div>
              <img src="/app-mockup.png" alt="App Interface" className="relative z-10 rounded-3xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center text-gray-900 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <FAQItem
              question="How do I start saving with the app?"
              answer="Download our app, create an account, and start receiving notifications for deals near you. It's that simple!"
              delay={0}
            />
            <FAQItem
              question="What types of deals can I expect?"
              answer="From grocery items to restaurant meals, find discounts on quality products that would otherwise go to waste."
              delay={100}
            />
            <FAQItem
              question="How does the rewards program work?"
              answer="Earn points for every purchase and sustainable action. Redeem them for exclusive deals and premium benefits."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 data-aos="fade-up" className="text-4xl font-bold mb-8">
            Join the Sustainable Shopping Revolution
          </h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-xl mb-8 max-w-2xl mx-auto">
            Start saving money while making a positive impact on the environment
          </p>
          <button data-aos="fade-up" data-aos-delay="200" className="px-8 py-4 bg-white text-emerald-600 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all duration-300">
            Download Now
          </button>
        </div>
      </section>
    </div>
  );
};

// Component Definitions
const AppFeatureCard = ({ icon, title, description, delay }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={delay}
    className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300 border border-emerald-100/20"
  >
    <div className="text-emerald-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const MembershipCard = ({ title, price, features, recommended, delay }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={delay}
    className={`relative p-8 rounded-2xl ${
      recommended 
        ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 text-white transform scale-105' 
        : 'bg-white/10 backdrop-blur-lg'
    }`}
  >
    {recommended && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-yellow-400 text-emerald-900 px-4 py-1 rounded-full text-sm font-semibold">
          Recommended
        </span>
      </div>
    )}
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <div className="text-3xl font-bold mb-6">{price}</div>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Crown className="w-5 h-5 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const ImpactCard = ({ icon, stat, label, description, delay }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={delay}
    className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
  >
    <div className="text-emerald-600 mb-4">{icon}</div>
    <div className="text-3xl font-bold text-gray-900 mb-2">{stat}</div>
    <div className="text-xl font-semibold text-emerald-600 mb-2">{label}</div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const PartnerCard = ({ icon, name, type, capacity, delay }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={delay}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="text-emerald-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
    <p className="text-emerald-600 font-medium mb-1">{type}</p>
    <p className="text-gray-600 text-sm">{capacity}</p>
  </div>
);

const AppFeature = ({ title, description }) => (
  <div className="flex items-start">
    <Star className="w-6 h-6 text-yellow-400 mr-3 mt-1" />
    <div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-emerald-100">{description}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer, delay }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={delay}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <h3 className="text-xl font-bold text-gray-900 mb-2">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </div>
);

export default CustomerLanding; 