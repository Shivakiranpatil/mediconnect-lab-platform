import { Activity, Heart, Zap } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string };

interface TestBundlesProps {
  onNavigate: (page: Page) => void;
}

const bundles = [
  {
    title: 'Full Body Checkup',
    subtitle: 'Complete health screening',
    icon: Activity,
    gradient: 'from-blue-400 to-blue-600',
    bgGradient: 'from-blue-100 to-blue-200',
    image: 'https://images.unsplash.com/photo-1663354863388-9ced5806543a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMHRlc3R8ZW58MXx8fHwxNzY4Mzk3MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: "Women's Wellness",
    subtitle: 'Hormone & PCOS Panels',
    icon: Heart,
    gradient: 'from-pink-400 to-pink-600',
    bgGradient: 'from-pink-100 to-pink-200',
    image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRvY3RvciUyMGhlYWx0aHxlbnwxfHx8fDE3NjgzOTcxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Heart & Cholesterol',
    subtitle: 'Cardiac Risk Assessment',
    icon: Zap,
    gradient: 'from-red-400 to-red-600',
    bgGradient: 'from-red-100 to-red-200',
    image: 'https://images.unsplash.com/photo-1762939079730-23708c0dd337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGhlYWx0aCUyMGNhcmRpb2xvZ3l8ZW58MXx8fHwxNzY4MzE4NTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function TestBundles({ onNavigate }: TestBundlesProps) {
  return (
    <div className="px-4 py-8 sm:py-16 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Find the Right Test, Fast & Easy
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Advanced AI Recommendations for Your Health
          </p>
          <button 
            onClick={() => onNavigate({ name: 'bundles' })}
            className="mt-3 sm:mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline"
          >
            View All Test Bundles →
          </button>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
          {bundles.map((bundle, index) => {
            const Icon = bundle.icon;
            return (
              <div
                key={index}
                style={{ animationDelay: `${index * 200}ms` }}
                className="bg-white rounded-xl sm:rounded-3xl overflow-hidden relative group cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-500 animate-fade-in border border-gray-100"
              >
                {/* Image with overlay */}
                <div className="h-36 sm:h-56 overflow-hidden relative">
                  <ImageWithFallback
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

                  {/* CTA Button */}
                  <button className={`w-full py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r ${bundle.gradient} text-white rounded-lg sm:rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}