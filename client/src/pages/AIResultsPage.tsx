import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, AlertTriangle, CheckCircle2, ArrowLeft, Activity, Heart, Zap, Users, Beaker } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const bundleIcons: Record<string, any> = {
  'activity': Activity,
  'heart': Heart,
  'zap': Zap,
  'users': Users,
  'beaker': Beaker,
};

export default function AIResultsPage() {
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('ai_recommendations');
    if (data) {
      setRecommendations(JSON.parse(data));
    }
  }, []);

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden" data-testid="no-recommendations">
        {/* Background decorative waves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="noResultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <path d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z" fill="url(#noResultGrad)" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <Navbar />
          <div className="flex items-center justify-center min-h-[60vh] px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-md"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">No Recommendations Yet</h1>
              <p className="text-gray-600 mb-6">Complete the AI Discovery flow to get personalized test recommendations.</p>
              <Link href="/ai-discovery">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg h-12 px-8 rounded-xl font-semibold">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start AI Discovery
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden" data-testid="ai-results-page">
      {/* Background decorative waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="resultsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z" fill="url(#resultsGrad)" />
          <path d="M0,200 Q300,150 600,200 T1200,200 L1200,0 L0,0 Z" fill="url(#resultsGrad)" opacity="0.5" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-100/30 to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <div className="text-center py-12 sm:py-16 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Personalized Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Based on your responses, our AI has curated these packages specifically for your health profile.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Recommendations */}
            <div className="lg:col-span-2 space-y-6">
              {recommendations.map((bundle, idx) => {
                const IconComponent = bundleIcons[bundle.icon] || Activity;
                return (
                  <motion.div
                    key={bundle.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 overflow-hidden relative group"
                    data-testid={`result-card-${bundle.id}`}
                  >
                    {idx === 0 && (
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500" />
                    )}
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {idx === 0 && (
                            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-bold uppercase tracking-wide">
                              Best Match
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 bg-gradient-to-br ${bundle.gradient || 'from-blue-500 to-blue-600'} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {bundle.name}
                            </h3>
                            <p className="text-gray-500 mt-1">{bundle.description}</p>
                          </div>
                        </div>
                        
                        {bundle.reason && (
                          <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 text-blue-800 text-sm leading-relaxed flex gap-3">
                            <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            {bundle.reason}
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Home Collection Included
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                            Results in 24-48 hours
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-56 flex flex-col justify-between bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                        <div>
                          <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-1">Total Price</p>
                          <div className="text-3xl font-bold text-gray-900 mb-1">AED {bundle.basePrice || bundle.price}</div>
                          <p className="text-xs text-gray-400 mb-4">Inc. VAT & all fees</p>
                        </div>
                        <Link href={`/bundles/${bundle.id}`}>
                          <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Why these tests?</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Our AI analyzes thousands of clinical protocols to match your symptoms, age, and lifestyle with the most relevant biomarkers.
                </p>
                <div className="h-px bg-gray-100 my-4" />
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Disclaimer:</strong> This is for educational purposes only and does not constitute medical advice. Please consult with a healthcare professional.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 shadow-lg text-white"
              >
                <h3 className="font-bold mb-2">Need help choosing?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Chat with our AI assistant for personalized guidance.
                </p>
                <Link href="/ai-discovery">
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Ask AI Again
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
