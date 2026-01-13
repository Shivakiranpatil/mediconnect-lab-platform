import { Link } from "wouter";
import { type Bundle } from "@shared/schema";
import { 
  Heart, 
  Activity, 
  Zap, 
  Thermometer, 
  Flower, 
  Shield, 
  Scan, 
  Users, 
  Scale, 
  Home, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";

const icons: Record<string, any> = {
  heart: Heart,
  activity: Activity,
  zap: Zap,
  thermometer: Thermometer,
  flower: Flower,
  shield: Shield,
  scan: Scan,
  users: Users,
  scale: Scale,
  home: Home,
  "shield-check": ShieldCheck,
};

const colors: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  red: "bg-red-50 text-red-600 border-red-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  pink: "bg-pink-50 text-pink-600 border-pink-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  slate: "bg-slate-50 text-slate-600 border-slate-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
  teal: "bg-teal-50 text-teal-600 border-teal-100",
  gold: "bg-yellow-50 text-yellow-600 border-yellow-100",
};

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  const Icon = icons[bundle.icon || "activity"] || Activity;
  const colorClass = colors[bundle.color || "blue"] || colors.blue;

  return (
    <Link href={`/bundles/${bundle.id}`} className="block h-full cursor-pointer">
      <div className="group relative h-full bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        
        {bundle.isPopular && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
            Popular
          </div>
        )}

        <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 border`}>
          <Icon className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {bundle.name}
        </h3>
        
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">
          {bundle.shortDescription || bundle.description}
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-slate-50 pt-4">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Starting from</p>
            <p className="text-2xl font-bold text-slate-900">AED {bundle.basePrice}</p>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
