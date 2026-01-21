import { Link } from "wouter";
import { 
  Search, Sparkles, ArrowRight, Mic, Bot, Home as HomeIcon, 
  TrendingUp, MessageCircle, FileSearch, Calendar, Activity,
  Heart, Zap, Facebook, Twitter, Instagram, Linkedin,
  Mail, Phone, MapPin, Send, Loader2
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

import fullBodyImg from "@assets/stock_images/professional_medical_5f834d8f.jpg";
import womenWellnessImg from "@assets/stock_images/middle_eastern_woman_c8937e09.jpg";
import heartHealthImg from "@assets/stock_images/heart_health_cardiov_fa509467.jpg";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast({ title: "Not Supported", description: "Voice input is not supported in your browser.", variant: "destructive" });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      setSearchQuery(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast({ title: "Error", description: "Could not capture voice.", variant: "destructive" });
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const quickSearches = [
    'Blood Sugar (HbA1c)',
    'Cholesterol Profile',
    'Vitamin D Levels',
    'Full Body Check',
    'Iron Deficiency',
    'Thyroid Function',
    'Liver Function',
    'Kidney Function'
  ];

  const suggestions = [
    { icon: '💊', text: 'Routine health checkup', gradient: 'from-blue-400 to-blue-500' },
    { icon: '❤️', text: 'Heart health screening', gradient: 'from-red-400 to-red-500' },
    { icon: '⚡', text: 'Energy and fatigue tests', gradient: 'from-amber-400 to-amber-500' },
    { icon: '🩺', text: "Women's health panel", gradient: 'from-pink-400 to-pink-500' },
  ];

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Matching',
      description: 'Personalized test recommendations tailored to your needs.',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
      image: fullBodyImg,
    },
    {
      icon: HomeIcon,
      title: 'At-Home or In-Lab',
      description: 'Book home visits or lab appointments at top clinics.',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500',
      image: womenWellnessImg,
    },
    {
      icon: TrendingUp,
      title: 'Top Lab Aggregator',
      description: 'Compare top labs & get best deals instantly.',
      bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100',
      iconBg: 'bg-pink-500',
      image: heartHealthImg,
    },
  ];

  const steps = [
    {
      icon: MessageCircle,
      title: 'Answer a Few Questions',
      description: 'Tell us about your health goals',
      gradient: 'from-blue-400 to-blue-600',
      image: fullBodyImg,
    },
    {
      icon: FileSearch,
      title: 'Get Matched to Tests',
      description: 'AI recommends the right tests',
      gradient: 'from-purple-400 to-purple-600',
      image: womenWellnessImg,
    },
    {
      icon: Calendar,
      title: 'Book Your Appointment',
      description: 'Choose time & location',
      gradient: 'from-pink-400 to-pink-600',
      image: heartHealthImg,
    },
  ];

  const bundles = [
    {
      title: 'Full Body Checkup',
      subtitle: 'Complete health screening',
      icon: Activity,
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-100 to-blue-200',
      image: fullBodyImg,
    },
    {
      title: "Women's Wellness",
      subtitle: 'Hormone & PCOS Panels',
      icon: Heart,
      gradient: 'from-pink-400 to-pink-600',
      bgGradient: 'from-pink-100 to-pink-200',
      image: womenWellnessImg,
    },
    {
      title: 'Heart & Cholesterol',
      subtitle: 'Cardiac Risk Assessment',
      icon: Zap,
      gradient: 'from-red-400 to-red-600',
      bgGradient: 'from-red-100 to-red-200',
      image: heartHealthImg,
    },
  ];

  const partners = [
    { name: 'MEDICLINIC', logo: '🏥' },
    { name: 'NMC Healthcare', logo: '🏨' },
    { name: 'Al Borg', logo: '🔬' },
    { name: 'Prime Health', logo: '💊' },
    { name: 'ASTER', logo: '🩺' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: Twitter, color: 'hover:bg-sky-500' },
    { name: 'Instagram', icon: Instagram, color: 'hover:bg-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, color: 'hover:bg-blue-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden" data-testid="home-page">
      {/* Background decorative waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z" fill="url(#grad1)" />
          <path d="M0,200 Q300,150 600,200 T1200,200 L1200,0 L0,0 Z" fill="url(#grad1)" opacity="0.5" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-100/30 to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="text-center px-4 sm:px-6 pt-8 sm:pt-12 pb-12 sm:pb-16" data-testid="hero-section">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight" data-testid="hero-title">
              Smart Lab Tests, <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Just for You
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 md:mb-16" data-testid="hero-subtitle">
              AI-Driven Health Test Booking in Dubai
            </p>

            {/* Main Search Bar */}
            <div className="max-w-4xl mx-auto mb-6 sm:mb-8" data-testid="search-container">
              <div className="relative bg-white rounded-2xl sm:rounded-full shadow-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-[0_25px_80px_rgba(59,130,246,0.5)] transition-all duration-500 group">
                <Search className="absolute left-4 sm:left-6 top-6 sm:top-1/2 sm:-translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-blue-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <input
                  type="text"
                  placeholder="Search for Sugar, Vitamin D..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 sm:pl-16 pr-4 sm:pr-4 py-4 sm:py-6 pb-20 sm:pb-4 md:pr-56 text-base sm:text-lg rounded-2xl sm:rounded-full focus:outline-none bg-transparent placeholder:text-gray-400"
                  data-testid="input-search"
                />
                <div className="absolute left-4 right-4 bottom-2 sm:right-2 sm:left-auto sm:top-1/2 sm:-translate-y-1/2 flex flex-row sm:flex-row items-center justify-center sm:justify-end gap-2">
                  <button
                    onClick={handleVoiceInput}
                    className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-3 ${
                      isListening 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
                        : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                    } text-white rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 group`}
                    data-testid="button-voice"
                  >
                    <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-125 transition-transform duration-300" />
                    <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice'}</span>
                  </button>
                  <Link href="/ai-discovery">
                    <button
                      className="flex-1 sm:flex-initial px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-base font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 group"
                      data-testid="button-ask-ai"
                    >
                      <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
                      Ask AI
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Search Section */}
            <div className="max-w-4xl mx-auto mb-6 sm:mb-10" data-testid="quick-search">
              <div className="text-left mb-3 ml-0 sm:ml-2">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Quick Search:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-start">
                {quickSearches.map((item, index) => (
                  <Link href="/ai-discovery" key={index}>
                    <button
                      className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                      data-testid={`quick-search-${index}`}
                    >
                      {item}
                    </button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Suggestion Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 max-w-4xl mx-auto" data-testid="suggestions">
              {suggestions.map((suggestion, index) => (
                <Link href="/ai-discovery" key={index}>
                  <button
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white border border-gray-200 hover:border-blue-400 rounded-lg transition-all duration-300 text-left group shadow-sm hover:shadow-md transform hover:scale-105"
                    data-testid={`suggestion-${index}`}
                  >
                    <div className={`w-6 h-6 bg-gradient-to-br ${suggestion.gradient} rounded-md flex items-center justify-center text-sm transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      {suggestion.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-600 flex-1 group-hover:text-blue-600 transition-colors">
                      {suggestion.text}
                    </span>
                    <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 py-6 sm:py-12" data-testid="features-section">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.05 }}
                  className={`${feature.bgColor} rounded-xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer group relative`}
                  data-testid={`feature-card-${index}`}
                >
                  {/* Image */}
                  <div className="h-32 sm:h-48 overflow-hidden relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-8 relative">
                    <div className="absolute top-4 right-4 w-16 h-16 bg-white/30 rounded-full blur-xl" />
                    <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/30 rounded-full blur-xl" />
                    
                    <div className="relative">
                      <div className={`w-10 h-10 sm:w-16 sm:h-16 ${feature.iconBg} rounded-lg sm:rounded-2xl mb-2 sm:mb-4 flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                        <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Steps Section */}
        <section className="px-4 py-8 sm:py-16" data-testid="steps-section">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mb-6" />
              <h2 className="text-4xl font-bold text-gray-900">
                Get Started in 3 Easy Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300" />
              
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative text-center group"
                    data-testid={`step-${index + 1}`}
                  >
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 mb-6">
                      {/* Image */}
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                        
                        {/* Badge number */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-gray-900 shadow-xl text-lg">
                          {index + 1}
                        </div>
                      </div>

                      {/* Icon Container */}
                      <div className="relative -mt-8 mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl relative z-10`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-6 pb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="max-w-2xl mx-auto text-center mt-8 sm:mt-12">
              <Link href="/ai-discovery">
                <button className="group px-8 sm:px-10 py-3 sm:py-4 bg-blue-600 text-white rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3" data-testid="button-get-started">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </Link>
              <p className="text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6">
                Quick, Reliable & Confidential
              </p>

              {/* Disclaimer */}
              <div className="mt-6 sm:mt-12 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs text-gray-600">
                  ⚠️ Educational only. Not medical advice. Confirm with a licensed clinician/lab.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Test Bundles Section */}
        <section className="px-4 py-8 sm:py-16 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent" data-testid="bundles-section">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                Find the Right Test, Fast & Easy
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Advanced AI Recommendations for Your Health
              </p>
              <Link href="/ai-discovery">
                <button className="mt-3 sm:mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline" data-testid="button-view-bundles">
                  View All Test Bundles →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
              {bundles.map((bundle, index) => {
                const Icon = bundle.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl sm:rounded-3xl overflow-hidden relative group cursor-pointer hover:shadow-2xl transition-all duration-500 border border-gray-100"
                    data-testid={`bundle-card-${index}`}
                  >
                    {/* Image with overlay */}
                    <div className="h-36 sm:h-56 overflow-hidden relative">
                      <img
                        src={bundle.image}
                        alt={bundle.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${bundle.bgGradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
                      
                      {/* Floating icon */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                        <div className={`w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br ${bundle.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                          <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-blue-600 transition-colors">
                        {bundle.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                        {bundle.subtitle}
                      </p>

                      <Link href="/ai-discovery">
                        <button className={`w-full py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r ${bundle.gradient} text-white rounded-lg sm:rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2`}>
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          Learn More
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="px-4 py-16" data-testid="partners-section">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Trusted by <span className="text-blue-600">Dubai's</span> Leading Labs
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
                  data-testid={`partner-${index}`}
                >
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {partner.logo}
                  </div>
                  <div className="text-xs font-semibold text-gray-700 text-center group-hover:text-blue-600 transition-colors">
                    {partner.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300 relative overflow-hidden mt-8 sm:mt-20" data-testid="footer">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {/* Brand Section */}
                <div className="col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 group cursor-pointer">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/20">
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-lg sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      MediConnect
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 leading-relaxed max-w-xs">
                    AI-powered lab test discovery and booking platform for Dubai, UAE. Get personalized health test recommendations in minutes.
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <a href="tel:+97141234567" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors group">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span>+971 4 123 4567</span>
                    </a>
                    <a href="mailto:support@mediconnect.ae" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors group">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span className="hidden sm:inline">support@mediconnect.ae</span>
                      <span className="sm:hidden">Email Support</span>
                    </a>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex gap-2 sm:gap-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href="#"
                          aria-label={social.name}
                          className={`w-9 h-9 sm:w-11 sm:h-11 bg-gray-800/50 backdrop-blur rounded-lg sm:rounded-xl flex items-center justify-center ${social.color} hover:scale-110 hover:-translate-y-1 transition-all duration-300 group border border-gray-700 hover:border-transparent shadow-lg`}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Company Links */}
                <div>
                  <h3 className="text-white font-semibold mb-2.5 sm:mb-4 text-xs sm:text-base">Company</h3>
                  <ul className="space-y-1.5 sm:space-y-2.5">
                    {['About Us', 'How It Works', 'Careers', 'Blog', 'Press'].map((link) => (
                      <li key={link}>
                        <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tests Links */}
                <div>
                  <h3 className="text-white font-semibold mb-2.5 sm:mb-4 text-xs sm:text-base">Tests & Bundles</h3>
                  <ul className="space-y-1.5 sm:space-y-2.5">
                    {['Browse All Tests', 'Test Bundles', "Women's Health", "Men's Health", 'Blood Sugar Guide'].map((link) => (
                      <li key={link}>
                        <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Partners Links */}
                <div>
                  <h3 className="text-white font-semibold mb-2.5 sm:mb-4 text-xs sm:text-base">For Partners</h3>
                  <ul className="space-y-1.5 sm:space-y-2.5">
                    <li><Link href="/lab" className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">Lab Partner Portal</Link></li>
                    <li><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">Become a Partner</a></li>
                    <li><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">Partner Benefits</a></li>
                    <li><Link href="/admin" className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">Admin Portal</Link></li>
                  </ul>
                </div>

                {/* Support Links */}
                <div>
                  <h3 className="text-white font-semibold mb-2.5 sm:mb-4 text-xs sm:text-base">Support</h3>
                  <ul className="space-y-1.5 sm:space-y-2.5">
                    {['Help Center', 'FAQs', 'Contact Support', 'Privacy Policy', 'Terms of Service'].map((link) => (
                      <li key={link}>
                        <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-300">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-6 sm:pt-8 border-t border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-gray-400">
                    © 2026 MediConnect. All rights reserved.
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm text-gray-400">Dubai Healthcare City, UAE</span>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-4 sm:mt-6 p-3 sm:p-5 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl sm:rounded-2xl border border-blue-800/30 backdrop-blur">
                  <p className="text-xs text-gray-400 text-center leading-relaxed">
                    <span className="text-amber-400 font-semibold">⚠️ Important Notice:</span> This platform is for educational purposes only and does not provide medical advice, diagnosis, or treatment. 
                    All test recommendations are non-clinical suggestions. Please consult with a licensed healthcare professional or contact your chosen lab directly to confirm test appropriateness for your specific health needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
