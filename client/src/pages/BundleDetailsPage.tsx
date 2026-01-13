import { useRoute } from "wouter";
import { useBundle } from "@/hooks/use-bundles";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Check, Clock, Home, Building2, ShieldCheck, ArrowRight, Activity } from "lucide-react";

export default function BundleDetailsPage() {
  const [, params] = useRoute("/bundles/:id");
  const { data: bundle, isLoading } = useBundle(params?.id || "");

  if (isLoading) return <div className="min-h-screen bg-slate-50 animate-pulse" />;
  if (!bundle) return <div>Not Found</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
              <Activity className="w-4 h-4" />
              {bundle.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
              {bundle.name}
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              {bundle.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
               <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                   <Clock className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900 mb-1">24-48 Hour Results</h3>
                 <p className="text-sm text-slate-500">Digital report sent to your email</p>
               </div>
               <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                   <ShieldCheck className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900 mb-1">Accredited Labs</h3>
                 <p className="text-sm text-slate-500">Processed by certified partners</p>
               </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">What's Included</h2>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-12">
              <ul className="space-y-4">
                {(bundle.tags as string[] || ["Complete Blood Count", "Lipid Profile", "Liver Function"]).map((tag, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sticky Card */}
          <div className="w-full lg:w-[400px]">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <p className="text-slate-500 font-medium mb-1">Total Package Price</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-slate-900">AED {bundle.basePrice}</span>
                <span className="text-slate-400">/ person</span>
              </div>

              <div className="space-y-4 mb-8">
                <Button variant="outline" className="w-full h-14 justify-between px-6 text-base hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                  <span className="flex items-center gap-2"><Home className="w-4 h-4" /> Home Collection</span>
                  <span className="text-xs font-bold uppercase bg-slate-100 px-2 py-1 rounded">Free</span>
                </Button>
                <Button variant="outline" className="w-full h-14 justify-between px-6 text-base">
                  <span className="flex items-center gap-2"><Building2 className="w-4 h-4" /> Lab Visit</span>
                </Button>
              </div>

              <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 rounded-xl">
                Book Now
              </Button>
              
              <p className="text-xs text-center text-slate-400 mt-4">
                No payment required until appointment confirmation
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
