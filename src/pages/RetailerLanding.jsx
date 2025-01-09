import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../App.css";
import {
  BarChart,
  LineChart,
  ShoppingBag,
  Recycle,
  TrendingUp,
  Users,
  Building2,
  ArrowRight,
  Database,
  Zap,
  Award,
  Clock,
  Truck,
  ChartPie,
  Shield,
  Leaf
} from 'lucide-react';
import Navbar from '../components/Navbar';

const RetailerLanding = () => {
  const [isLoading, setIsLoading] = useState(false);

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
              Transform Surplus<br />
              <span className="bg-gradient-to-r from-emerald-600 to-yellow-500 text-transparent bg-clip-text">
                Into Profit
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Join India's premier network of sustainable retailers optimizing inventory and maximizing revenue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsLoading(true)}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Partner With Us
                <ArrowRight className="inline-block ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-full text-lg font-semibold transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white/80">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center text-gray-900 mb-16">
            Transform Your Business Operations
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <BenefitCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Increase Revenue"
              description="Convert potential losses into profitable opportunities"
              stat="Up to 25%"
              delay={0}
            />
            <BenefitCard
              icon={<Database className="w-8 h-8" />}
              title="Optimize Inventory"
              description="AI-driven insights for smart stock management"
              stat="30% Better"
              delay={100}
            />
            <BenefitCard
              icon={<Zap className="w-8 h-8" />}
              title="Reduce Waste"
              description="Minimize waste through predictive analytics"
              stat="60% Less"
              delay={200}
            />
            <BenefitCard
              icon={<Award className="w-8 h-8" />}
              title="Brand Value"
              description="Enhance your sustainability credentials"
              stat="40% Growth"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-20 bg-gradient-to-b from-emerald-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center mb-16">
            Enterprise-Grade Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ChartPie className="w-8 h-8" />}
              title="Advanced Analytics"
              description="Real-time insights into inventory trends and consumer behavior"
              features={[
                "Predictive demand forecasting",
                "Waste reduction analytics",
                "Revenue optimization",
                "Customer behavior insights"
              ]}
              delay={0}
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure Platform"
              description="Enterprise-level security for your business data"
              features={[
                "End-to-end encryption",
                "Compliance ready",
                "Regular security audits",
                "Data backup & recovery"
              ]}
              delay={100}
            />
            <FeatureCard
              icon={<Leaf className="w-8 h-8" />}
              title="Sustainability Tools"
              description="Track and improve your environmental impact"
              features={[
                "Carbon footprint tracking",
                "Waste management metrics",
                "Sustainability reports",
                "Impact certificates"
              ]}
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-white/80">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center text-gray-900 mb-16">
            Calculate Your Potential Returns
          </h2>
          <div className="max-w-4xl mx-auto">
            <div data-aos="fade-up" className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Monthly Revenue (₹)
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter monthly revenue"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Current Waste Percentage (%)
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter waste percentage"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Number of Locations
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter number of locations"
                    />
                  </div>
                </div>
                <div className="bg-emerald-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-emerald-900 mb-4">Potential Annual Savings</h3>
                  <div className="space-y-4">
                    <SavingsMetric label="Waste Reduction" value="₹0" />
                    <SavingsMetric label="Operational Efficiency" value="₹0" />
                    <SavingsMetric label="Tax Benefits" value="₹0" />
                    <div className="pt-4 border-t border-emerald-200">
                      <SavingsMetric label="Total Savings" value="₹0" isTotal />
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Calculate Savings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center text-gray-900 mb-16">
            Partner Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <SuccessStoryCard
              image="/retailer1.jpg"
              name="Fresh Mart"
              position="Supermarket Chain"
              quote="Reduced our waste by 60% and increased profits by 25% within 6 months."
              stats={{ wasteReduction: "60%", profitIncrease: "25%", roi: "300%" }}
              delay={0}
            />
            <SuccessStoryCard
              image="/retailer2.jpg"
              name="Metro Foods"
              position="Restaurant Chain"
              quote="The AI-driven insights helped us optimize our inventory and reduce costs significantly."
              stats={{ wasteReduction: "45%", profitIncrease: "20%", roi: "250%" }}
              delay={100}
            />
            <SuccessStoryCard
              image="/retailer3.jpg"
              name="Green Grocery"
              position="Local Store"
              quote="Perfect solution for small businesses looking to make a big impact."
              stats={{ wasteReduction: "50%", profitIncrease: "15%", roi: "200%" }}
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Integration & Technology */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center mb-16">
            Enterprise-Grade Technology
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h3 className="text-3xl font-bold mb-6">Seamless Integration</h3>
              <div className="space-y-6">
                <IntegrationFeature
                  title="POS Systems"
                  description="Works with all major POS systems"
                />
                <IntegrationFeature
                  title="Inventory Management"
                  description="Real-time sync with your existing systems"
                />
                <IntegrationFeature
                  title="Analytics Platforms"
                  description="Export data to your preferred analytics tools"
                />
                <IntegrationFeature
                  title="Custom API Access"
                  description="Build custom integrations with our robust API"
                />
              </div>
            </div>
            <div data-aos="fade-left" className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-transparent rounded-3xl transform rotate-6"></div>
              <img src="/dashboard-mock.png" alt="Dashboard Interface" className="relative z-10 rounded-3xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-center text-gray-900 mb-16">
            Flexible Plans for Every Business
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Starter"
              price="₹4,999"
              period="/month"
              features={[
                "Up to 100 transactions/day",
                "Basic analytics",
                "Email support",
                "Standard integrations"
              ]}
              delay={0}
            />
            <PricingCard
              title="Growth"
              price="₹9,999"
              period="/month"
              features={[
                "Unlimited transactions",
                "Advanced analytics",
                "Priority support",
                "Custom integrations",
                "API access"
              ]}
              recommended={true}
              delay={100}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              period=""
              features={[
                "All Growth features",
                "Dedicated account manager",
                "Custom development",
                "SLA guarantee",
                "24/7 support"
              ]}
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 data-aos="fade-up" className="text-4xl font-bold mb-8">
            Ready to Transform Your Business?
          </h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already optimizing their operations with our platform
          </p>
          <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-emerald-600 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all duration-300">
              Schedule Demo
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-emerald-700/50 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Component Definitions
const BenefitCard = ({ icon, title, description, stat, delay }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={delay}
    className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300 border border-emerald-100/20"
  >
    <div className="text-emerald-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="text-2xl font-bold text-emerald-600">{stat}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, features, delay }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={delay}
    className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-white/20"
  >
    <div className="text-emerald-300 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-emerald-100 mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-sm">
          <ArrowRight className="w-4 h-4 mr-2 text-emerald-300" />
          <span className="text-white/80">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Additional Component Definitions
const SavingsMetric = ({ label, value, isTotal }) => (
  <div className={`flex justify-between items-center ${isTotal ? 'font-bold text-lg' : ''}`}>
    <span>{label}</span>
    <span className="text-emerald-600">{value}</span>
  </div>
);

const SuccessStoryCard = ({ image, name, position, quote, stats, delay }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={delay}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center mb-4">
      <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
      <div>
        <h3 className="font-bold text-gray-900">{name}</h3>
        <p className="text-emerald-600">{position}</p>
      </div>
    </div>
    <p className="text-gray-600 mb-4 italic">"{quote}"</p>
    <div className="grid grid-cols-3 gap-2 text-center">
      <div>
        <div className="text-emerald-600 font-bold">{stats.wasteReduction}</div>
        <div className="text-sm text-gray-500">Waste Cut</div>
      </div>
      <div>
        <div className="text-emerald-600 font-bold">{stats.profitIncrease}</div>
        <div className="text-sm text-gray-500">Profit Up</div>
      </div>
      <div>
        <div className="text-emerald-600 font-bold">{stats.roi}</div>
        <div className="text-sm text-gray-500">ROI</div>
      </div>
    </div>
  </div>
);

const IntegrationFeature = ({ title, description }) => (
  <div className="flex items-start">
    <Shield className="w-6 h-6 text-emerald-400 mr-3 mt-1" />
    <div>
      <h4 className="text-xl font-semibold mb-1">{title}</h4>
      <p className="text-emerald-100">{description}</p>
    </div>
  </div>
);

const PricingCard = ({ title, price, period, features, recommended, delay }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={delay}
    className={`relative p-8 rounded-2xl ${
      recommended 
        ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 text-white transform scale-105' 
        : 'bg-white shadow-xl'
    }`}
  >
    {recommended && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-yellow-400 text-emerald-900 px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </span>
      </div>
    )}
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <div className="text-3xl font-bold mb-1">{price}</div>
    <div className="text-sm mb-6 opacity-80">{period}</div>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <ArrowRight className="w-5 h-5 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <button className={`w-full py-3 rounded-lg mt-8 transition-colors ${
      recommended 
        ? 'bg-white text-emerald-600 hover:bg-emerald-50' 
        : 'bg-emerald-600 text-white hover:bg-emerald-700'
    }`}>
      Get Started
    </button>
  </div>
);

export default RetailerLanding; 