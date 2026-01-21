import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Check, Clock, Home, Building2, ShieldCheck, ArrowLeft, Activity, Sparkles, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const bundleData: Record<string, any> = {
  'essential-health': {
    id: 'essential-health',
    name: 'Essential Health Checkup',
    description: 'Complete health screening for overall wellness and preventive care. This comprehensive package includes all major health markers to give you a complete picture of your health status.',
    category: 'General Health',
    price: 399,
    originalPrice: 580,
    icon: '💊',
    gradient: 'from-blue-500 to-blue-600',
    tests: ['Complete Blood Count (CBC)', 'Lipid Panel', 'HbA1c (Blood Sugar)', 'Liver Function Test', 'Kidney Function Test', 'Vitamin D'],
    idealFor: ['Annual health checkups', 'Adults 18+ years', 'Preventive health monitoring', 'First-time comprehensive screening'],
  },
  'heart-health': {
    id: 'heart-health',
    name: 'Advanced Heart Health',
    description: 'Comprehensive cardiovascular risk assessment and monitoring. Perfect for those with family history of heart disease or looking to optimize heart health.',
    category: 'Heart Health',
    price: 299,
    originalPrice: 440,
    icon: '❤️',
    gradient: 'from-red-500 to-red-600',
    tests: ['Lipid Panel', 'HbA1c', 'Complete Blood Count', 'Kidney Function Test'],
    idealFor: ['Family history of heart disease', 'High cholesterol or blood pressure', 'Adults over 40', 'Diabetes patients'],
  },
  'womens-wellness': {
    id: 'womens-wellness',
    name: "Women's Wellness Panel",
    description: "Complete health package designed specifically for women. Includes hormone balance testing, PCOS screening, and fertility markers.",
    category: "Women's Health",
    price: 599,
    originalPrice: 850,
    icon: '🩺',
    gradient: 'from-pink-500 to-pink-600',
    tests: ['Female Hormone Panel', 'Thyroid Profile', 'Complete Blood Count', 'Vitamin D', 'Iron Studies', 'Vitamin B12'],
    idealFor: ['Women 20+ years', 'Menstrual irregularities', 'PCOS screening', 'Fertility planning', 'Hormonal imbalance symptoms'],
  },
  'mens-vitality': {
    id: 'mens-vitality',
    name: "Men's Vitality Panel",
    description: "Comprehensive health assessment for men including hormone testing, prostate health markers, and energy optimization biomarkers.",
    category: "Men's Health",
    price: 549,
    originalPrice: 780,
    icon: '💪',
    gradient: 'from-indigo-500 to-indigo-600',
    tests: ['Testosterone Total & Free', 'PSA (Prostate)', 'Thyroid Profile', 'Complete Blood Count', 'Lipid Panel', 'Vitamin D'],
    idealFor: ['Men 30+ years', 'Low energy or fatigue', 'Decreased libido', 'Muscle mass concerns', 'Prostate health monitoring'],
  },
  'energy-fatigue': {
    id: 'energy-fatigue',
    name: 'Energy & Fatigue Panel',
    description: 'Identify nutritional deficiencies causing tiredness and low energy. This panel checks all major vitamins, minerals, and metabolic markers.',
    category: 'Energy & Wellness',
    price: 449,
    originalPrice: 640,
    icon: '⚡',
    gradient: 'from-amber-500 to-amber-600',
    tests: ['Thyroid Profile', 'Vitamin D', 'Vitamin B12', 'Iron Studies', 'Complete Blood Count', 'HbA1c'],
    idealFor: ['Chronic fatigue', 'Low energy levels', 'Poor concentration', 'Suspected vitamin deficiencies', 'Dietary concerns'],
  },
};

export default function BundleDetailsPage() {
  const [, params] = useRoute("/bundles/:id");
  const bundleId = params?.id || "";
  
  const bundle = bundleData[bundleId];

  if (!bundle) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative" data-testid="bundle-not-found">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Bundle Not Found</h1>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden" data-testid="bundle-details-page">
      {/* Background decorative waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bundleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z" fill="url(#bundleGrad)" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-100/30 to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Back button */}
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium text-sm">Back to Home</span>
            </button>
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${bundle.gradient} text-white text-sm font-bold mb-6 shadow-lg`}>
                <span className="text-lg">{bundle.icon}</span>
                {bundle.category}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="bundle-title">
                {bundle.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-10 leading-relaxed" data-testid="bundle-description">
                {bundle.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-green-600 mb-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">24-48 Hour Results</h3>
                  <p className="text-sm text-gray-500">Digital report sent to your email</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Accredited Labs</h3>
                  <p className="text-sm text-gray-500">Processed by certified partners</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                <ul className="space-y-4">
                  {bundle.tests.map((test: string, i: number) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="font-medium">{test}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ideal For</h2>
              <div className="flex flex-wrap gap-2">
                {bundle.idealFor.map((item: string, i: number) => (
                  <span 
                    key={i}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Sticky Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full lg:w-[380px]"
            >
              <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
                <p className="text-gray-500 font-medium mb-1">Total Package Price</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">AED {bundle.price}</span>
                  <span className="text-lg text-gray-400 line-through">AED {bundle.originalPrice}</span>
                </div>
                <div className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6">
                  Save AED {bundle.originalPrice - bundle.price}
                </div>

                <div className="space-y-3 mb-6">
                  <button className="w-full h-14 flex items-center justify-between px-5 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-colors group">
                    <span className="flex items-center gap-3 text-gray-700 font-medium">
                      <Home className="w-5 h-5 text-blue-600" />
                      Home Collection
                    </span>
                    <span className="text-xs font-bold uppercase bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
                  </button>
                  <button className="w-full h-14 flex items-center justify-between px-5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 transition-colors group">
                    <span className="flex items-center gap-3 text-gray-700 font-medium">
                      <Building2 className="w-5 h-5 text-gray-500" />
                      Lab Visit
                    </span>
                  </button>
                </div>

                <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 rounded-xl transition-all" data-testid="button-book-now">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                  No payment required until appointment confirmation
                </p>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs text-gray-600 text-center">
                    ⚠️ This is for educational purposes only. Please consult with a healthcare professional.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
