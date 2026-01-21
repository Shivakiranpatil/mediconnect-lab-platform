import { Heart, Activity, Zap, Users, TrendingUp, Shield, ArrowRight, Check } from 'lucide-react';

const bundles = [
  {
    id: 1,
    name: 'Essential Health Check',
    description: 'Perfect for routine checkups and overall health monitoring',
    icon: Activity,
    tests: 25,
    price: 299,
    popular: true,
    color: 'from-blue-500 to-blue-600',
    bgGlow: 'group-hover:shadow-blue-500/20',
  },
  {
    id: 2,
    name: 'Heart Health Panel',
    description: 'Comprehensive cardiovascular and cholesterol screening',
    icon: Heart,
    tests: 18,
    price: 450,
    popular: false,
    color: 'from-red-500 to-red-600',
    bgGlow: 'group-hover:shadow-red-500/20',
  },
  {
    id: 3,
    name: 'Energy & Vitality',
    description: 'Check for deficiencies causing fatigue and low energy',
    icon: Zap,
    tests: 22,
    price: 399,
    popular: true,
    color: 'from-amber-500 to-amber-600',
    bgGlow: 'group-hover:shadow-amber-500/20',
  },
  {
    id: 4,
    name: 'Women\'s Health',
    description: 'Hormone balance, fertility, and wellness markers',
    icon: Shield,
    tests: 28,
    price: 549,
    popular: false,
    color: 'from-pink-500 to-pink-600',
    bgGlow: 'group-hover:shadow-pink-500/20',
  },
  {
    id: 5,
    name: 'Diabetes Care',
    description: 'Monitor blood sugar, HbA1c, and related markers',
    icon: TrendingUp,
    tests: 15,
    price: 349,
    popular: false,
    color: 'from-green-500 to-green-600',
    bgGlow: 'group-hover:shadow-green-500/20',
  },
  {
    id: 6,
    name: 'Family Bundle',
    description: 'Essential tests for the whole family at a special rate',
    icon: Users,
    tests: 20,
    price: 899,
    popular: true,
    color: 'from-purple-500 to-purple-600',
    bgGlow: 'group-hover:shadow-purple-500/20',
  },
];

export function RecommendedBundles() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Popular test bundles
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Curated by healthcare professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive test packages designed to give you complete health insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {bundles.map((bundle) => {
            const Icon = bundle.icon;
            return (
              <div
                key={bundle.id}
                className={`group bg-white rounded-3xl p-6 shadow-sm hover:shadow-2xl ${bundle.bgGlow} transition-all duration-300 border border-gray-100 relative overflow-hidden cursor-pointer hover:-translate-y-2`}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Popular badge with animation */}
                {bundle.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-semibold shadow-lg animate-pulse-slow flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    Popular
                  </div>
                )}
                
                <div className="relative">
                  {/* Icon with glow effect */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${bundle.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg relative`}>
                    <Icon className="w-8 h-8 text-white" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${bundle.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {bundle.name}
                  </h3>
                  <p className="text-gray-600 mb-5 text-sm leading-relaxed min-h-[40px]">
                    {bundle.description}
                  </p>

                  {/* Tests count with icon */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="font-medium">{bundle.tests} tests</span>
                    </div>
                    <div className="flex-1" />
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-0.5">Starting from</div>
                      <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        AED {bundle.price}
                      </span>
                    </div>
                  </div>

                  {/* CTA buttons with animations */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-xl group/btn flex items-center justify-center gap-2">
                      Book now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm font-semibold">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all button */}
        <div className="text-center">
          <button className="group/view px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 font-semibold inline-flex items-center gap-3">
            View all test bundles
            <ArrowRight className="w-5 h-5 group-hover/view:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}