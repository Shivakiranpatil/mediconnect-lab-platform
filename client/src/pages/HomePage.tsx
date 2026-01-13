import { Link } from "wouter";
import { Sparkles, Search, Calendar, FileText, ChevronRight, ArrowRight } from "lucide-react";
import { useBundles } from "@/hooks/use-bundles";
import { Navbar } from "@/components/Navbar";
import { BundleCard } from "@/components/BundleCard";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: bundles, isLoading } = useBundles();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 z-0" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-300/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-8 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by 10,000+ families in UAE
            </span>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight">
              Your Health Journey <br />
              <span className="text-blue-100">Starts Here.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-50 mb-10 max-w-2xl font-light leading-relaxed">
              AI-powered test recommendations, convenient home collection, and results you can actually understand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/ai-discovery">
                <button className="h-14 px-8 rounded-2xl bg-white text-blue-600 font-bold text-lg hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Find My Tests
                </button>
              </Link>
              <Link href="/tests">
                <button className="h-14 px-8 rounded-2xl bg-blue-700/50 backdrop-blur-md border border-white/20 text-white font-semibold text-lg hover:bg-blue-700/70 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  Browse All Packages
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats or Decorative Elements could go here */}
      </section>

      {/* Quick Actions */}
      <section className="relative z-20 -mt-16 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Sparkles, label: 'AI Discovery', desc: 'Personalized plan', color: 'from-violet-500 to-purple-500', href: '/ai-discovery' },
            { icon: Search, label: 'Browse Tests', desc: 'Explore all packages', color: 'from-blue-500 to-cyan-500', href: '/tests' },
            { icon: Calendar, label: 'Book Now', desc: 'Schedule collection', color: 'from-teal-500 to-emerald-500', href: '/book' },
            { icon: FileText, label: 'My Reports', desc: 'View results', color: 'from-orange-500 to-amber-500', href: '/dashboard' },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 cursor-pointer border border-white"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{item.label}</h3>
                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Bundles */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Popular Health Packages</h2>
            <p className="text-lg text-slate-500 max-w-xl">
              Curated comprehensive health checks chosen by thousands of customers in Dubai and Abu Dhabi.
            </p>
          </div>
          <Link href="/tests">
            <button className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
              View All Packages <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundles?.filter(b => b.isPopular).slice(0, 6).map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-12">Trusted by leading healthcare providers</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholders for logos */}
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} className="h-12 w-32 bg-slate-200 rounded-lg animate-pulse" />
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
