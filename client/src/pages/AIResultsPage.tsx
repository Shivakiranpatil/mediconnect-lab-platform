import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BundleCard } from "@/components/BundleCard";
import { Button } from "@/components/ui/button";

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
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="text-2xl font-bold mb-4">No recommendations found</h1>
          <Link href="/ai-discovery">
            <Button>Start AI Discovery</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <div className="bg-gradient-to-br from-blue-600 to-teal-500 pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Your Personalized Plan</h1>
          <p className="text-xl text-blue-50 opacity-90 max-w-xl mx-auto">
            Based on your responses, our AI has curated these packages specifically for your health profile.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 pb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {recommendations.map((bundle, idx) => (
              <motion.div
                key={bundle.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 overflow-hidden relative"
              >
                {idx === 0 && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500" />
                )}
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {idx === 0 && (
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wide">
                          Best Match
                        </span>
                      )}
                      <h3 className="text-2xl font-bold text-slate-900">{bundle.name}</h3>
                    </div>
                    
                    {bundle.reason && (
                      <div className="mb-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-sm leading-relaxed flex gap-3">
                        <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        {bundle.reason}
                      </div>
                    )}
                    
                    <p className="text-slate-500 mb-6">{bundle.description}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Home Collection Included
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Results in 24-48 hours
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-64 flex flex-col justify-between bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div>
                      <p className="text-sm text-slate-400 uppercase font-bold tracking-wider mb-1">Total Price</p>
                      <div className="text-3xl font-bold text-slate-900 mb-1">AED {bundle.basePrice}</div>
                      <p className="text-xs text-slate-400 mb-6">Inc. VAT & all fees</p>
                    </div>
                    <Link href={`/bundles/${bundle.id}`}>
                      <Button className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Why these tests?</h3>
              <p className="text-slate-500 text-sm mb-4">
                Our AI analyzes thousands of clinical protocols to match your symptoms, age, and lifestyle with the most relevant biomarkers.
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Disclaimer:</strong> This is for educational purposes only and does not constitute medical advice. Please consult with a healthcare professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
