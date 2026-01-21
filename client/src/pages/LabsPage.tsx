import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Building2, MapPin, Star, Clock, Home, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const labs = [
  { 
    id: 1, 
    name: "Prime Diagnostics", 
    logo: '🏥',
    location: "Dubai Healthcare City", 
    rating: 4.8, 
    reviews: 2847,
    turnaroundTime: '24 hours',
    homeCollection: true,
    accreditation: ['CAP', 'JCI', 'MOH'],
  },
  { 
    id: 2, 
    name: "HealthFirst Labs", 
    logo: '🔬',
    location: "Multiple locations (15+)", 
    rating: 4.9, 
    reviews: 3521,
    turnaroundTime: '24-48 hours',
    homeCollection: true,
    accreditation: ['CAP', 'ISO 15189', 'MOH'],
  },
  { 
    id: 3, 
    name: "MediCare Diagnostics", 
    logo: '⚕️',
    location: "Jumeirah, Dubai Marina", 
    rating: 4.7, 
    reviews: 1956,
    turnaroundTime: '48 hours',
    homeCollection: true,
    accreditation: ['JCI', 'MOH'],
  },
  { 
    id: 4, 
    name: "QuickTest Pro", 
    logo: '🩺',
    location: "Downtown Dubai", 
    rating: 4.6, 
    reviews: 1234,
    turnaroundTime: '24 hours',
    homeCollection: false,
    accreditation: ['ISO 15189', 'MOH'],
  },
];

export default function LabsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden" data-testid="labs-page">
      {/* Background decorative waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="labsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z" fill="url(#labsGrad)" />
          <path d="M0,200 Q300,150 600,200 T1200,200 L1200,0 L0,0 Z" fill="url(#labsGrad)" opacity="0.5" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-100/30 to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mb-6" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="page-title">
              Our Partner Labs
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              We partner with the most accredited and trusted laboratories in the UAE to ensure accurate results and safe handling of your samples.
            </p>
          </motion.div>

          {/* Labs Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {labs.map((lab, index) => (
              <motion.div 
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                data-testid={`lab-card-${lab.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {lab.logo}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {lab.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">{lab.location}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-gray-900">{lab.rating}</span>
                        <span className="text-gray-400 text-sm">({lab.reviews.toLocaleString()})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {lab.turnaroundTime}
                      </div>
                      {lab.homeCollection && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                          <Home className="w-3.5 h-3.5" />
                          Home Collection
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {lab.accreditation.map((acc, i) => (
                        <span 
                          key={i}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
                        >
                          <Shield className="w-3 h-3" />
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-xl font-semibold hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 group/btn"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Become a Partner Lab</h2>
              <p className="text-gray-600 mb-6">
                Join our network of trusted laboratories and reach thousands of customers across the UAE.
              </p>
              <Link href="/lab/login">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg h-12 px-8 rounded-xl font-semibold">
                  Partner With Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
