import { Navbar } from "@/components/Navbar";
import { Building2, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for UI demonstration
const labs = [
  { id: 1, name: "City BioLab", location: "Dubai - Business Bay", rating: 4.8, reviews: 1240 },
  { id: 2, name: "HealthPlus Diagnostics", location: "Abu Dhabi - Al Reem", rating: 4.9, reviews: 850 },
  { id: 3, name: "MediCare Labs", location: "Sharjah - Al Nahda", rating: 4.6, reviews: 540 },
];

export default function LabsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Our Partner Labs</h1>
          <p className="text-xl text-slate-500">
            We partner with the most accredited and trusted laboratories in the UAE to ensure accurate results and safe handling of your samples.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labs.map((lab) => (
            <div key={lab.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{lab.name}</h3>
              
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                {lab.location}
              </div>

              <div className="flex items-center gap-1 mb-6">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-slate-900">{lab.rating}</span>
                <span className="text-slate-400">({lab.reviews} reviews)</span>
              </div>

              <Button variant="outline" className="w-full">View Details</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
