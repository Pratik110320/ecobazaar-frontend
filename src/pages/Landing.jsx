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
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600">
                <TbLeaf className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 tracking-tight font-display">
                  EcoBazaar
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-full font-medium text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-full font-medium text-sm text-white bg-gray-900 hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8 flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-medium text-sm border border-emerald-100">
                <TbWorld className="w-4 h-4" />
                Join the Green Revolution
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight font-display tracking-tight"
            >
              Shop Sustainably,
              <br />
              <span className="text-emerald-600 relative">
                Live Responsibly
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
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
                className="group px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/20 hover:shadow-gray-900/30 active:scale-95 flex items-center gap-2"
              >
                Start Shopping Green
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition border border-gray-200 hover:border-gray-300"
              >
                Explore Products
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 rounded-3xl bg-gray-50 border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-emerald-600 mb-4 shadow-sm border border-gray-100">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display tracking-tight">
              Why Choose EcoBazaar?
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
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
                <div className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-100 transition-all duration-300 h-full">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gray-50 text-gray-900 mb-6 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display tracking-tight">
                Make Every Purchase Count
              </h2>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed font-light">
                Join thousands of conscious consumers making a real difference through their
                shopping choices.
              </p>

              <div className="space-y-5">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <FiCheck className="w-3.5 h-3.5 text-emerald-600" />
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
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10">
                <div className="aspect-square bg-emerald-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                  <div className="text-center text-white p-12 relative z-10">
                    <TbLeaf className="w-24 h-24 mx-auto mb-8 text-emerald-400" />
                    <h3 className="text-4xl font-bold mb-4 font-display">Your Impact Matters</h3>
                    <p className="text-xl text-emerald-100/80 font-light">
                      Track your carbon savings and environmental contributions
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10"></div>
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-emerald-900 p-16 text-center text-white shadow-2xl shadow-emerald-900/20"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-10 text-emerald-100/80 max-w-2xl mx-auto font-light">
                Join EcoBazaar today and start your journey towards sustainable living
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="group px-8 py-4 bg-white text-emerald-900 font-bold rounded-full hover:bg-emerald-50 transition-all shadow-xl shadow-black/10 flex items-center gap-2"
                >
                  Create Free Account
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-transparent text-white font-bold rounded-full hover:bg-white/10 transition border border-white/20"
                >
                  Sign In
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-emerald-200/80">
                <div className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-400" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <TbLeaf className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-display">EcoBazaar</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Making sustainable shopping accessible to everyone, one purchase at a time.
              </p>
            </div>

            <div>
              <h4 className="text-gray-900 font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <Link to="/register" className="hover:text-emerald-600 transition-colors">
                    Browse Products
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-emerald-600 transition-colors">
                    Become a Seller
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-emerald-600 transition-colors">
                    Track Impact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>&copy; 2024 EcoBazaar. All rights reserved.</p>
            <div className="flex items-center gap-6">
               <a href="#" className="hover:text-gray-600 transition-colors">Twitter</a>
               <a href="#" className="hover:text-gray-600 transition-colors">Instagram</a>
               <a href="#" className="hover:text-gray-600 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
