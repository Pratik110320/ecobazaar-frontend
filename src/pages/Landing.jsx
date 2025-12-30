import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiShoppingBag,
  FiPackage,
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiCheck,
  FiArrowRight,
  FiStar,
  FiHeart,
  FiShield,
} from 'react-icons/fi';
import { TbLeaf, TbRecycle, TbPlant2, TbWorld } from 'react-icons/tb';

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const features = [
    {
      icon: <TbLeaf className="w-8 h-8" />,
      title: 'Carbon Tracking',
      description: 'Monitor and reduce your environmental footprint with every purchase',
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Verified Products',
      description: 'Every product is verified for sustainability and eco-friendliness',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <TbRecycle className="w-8 h-8" />,
      title: 'Sustainable Sellers',
      description: 'Connect with businesses committed to environmental responsibility',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Impact Dashboard',
      description: 'Track your positive environmental impact over time',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Users', icon: <FiUsers /> },
    { value: '50K+', label: 'Eco Products', icon: <FiPackage /> },
    { value: '100K+', label: 'Trees Saved', icon: <TbPlant2 /> },
    { value: '500+', label: 'Verified Sellers', icon: <FiAward /> },
  ];

  const benefits = [
    'Transparent carbon footprint for every product',
    'Support sustainable businesses and practices',
    'Earn rewards for eco-friendly choices',
    'Community of conscious consumers',
    'Real-time environmental impact tracking',
    'Verified eco-certifications',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl blur-lg opacity-60"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-xl">
                  <TbLeaf className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  EcoBazaar
                </h1>
                <p className="text-xs text-gray-500 font-medium">Sustainable Shopping</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-6 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:shadow-lg transition shadow-emerald-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-6">
                <TbWorld className="w-5 h-5" />
                Join the Green Revolution
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Shop Sustainably,
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
                Live Responsibly
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Discover eco-friendly products with transparent carbon footprints. Make
              conscious choices that benefit both you and our planet.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all shadow-lg shadow-emerald-200 flex items-center gap-2"
              >
                Start Shopping Green
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:shadow-lg transition border-2 border-gray-200 hover:border-emerald-300"
              >
                Explore Products
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose EcoBazaar?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make sustainable shopping easy, transparent, and rewarding
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity"></div>
                <div className="relative p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-emerald-300 transition-all h-full">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-teal-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Make Every Purchase Count
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of conscious consumers making a real difference through their
                shopping choices.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mt-0.5">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-emerald-400 via-teal-500 to-green-500 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <TbLeaf className="w-32 h-32 mx-auto mb-6 opacity-80" />
                    <h3 className="text-3xl font-bold mb-4">Your Impact Matters</h3>
                    <p className="text-lg opacity-90">
                      Track your carbon savings and environmental contributions
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl opacity-30"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 p-12 text-center text-white shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join EcoBazaar today and start your journey towards sustainable living
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="group px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:shadow-2xl transition-all flex items-center gap-2"
                >
                  Create Free Account
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition border-2 border-white/30"
                >
                  Sign In
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                  <TbLeaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">EcoBazaar</h3>
              </div>
              <p className="text-sm leading-relaxed">
                Making sustainable shopping accessible to everyone, one purchase at a time.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/register" className="hover:text-emerald-400 transition">
                    Browse Products
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-emerald-400 transition">
                    Become a Seller
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-emerald-400 transition">
                    Track Impact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2024 EcoBazaar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
