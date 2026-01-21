import { Bot, Home as HomeIcon, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Matching',
    description: 'Personalized test recommendations tailored to your needs.',
    accent: 'from-blue-400 to-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    iconBg: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1767716134786-92b647b12846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMEFJfGVufDF8fHx8MTc2ODM5MzEyMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: HomeIcon,
    title: 'At-Home or In-Lab',
    description: 'Book home visits or lab appointments at top clinics.',
    accent: 'from-green-400 to-green-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
    iconBg: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1765896387377-e293914d1e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaGVhbHRoY2FyZSUyMG51cnNlfGVufDF8fHx8MTc2ODM4NTIyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: TrendingUp,
    title: 'Top Lab Aggregator',
    description: 'Compare top labs & get best deals instantly.',
    accent: 'from-pink-400 to-pink-600',
    bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100',
    iconBg: 'bg-pink-500',
    image: 'https://images.unsplash.com/photo-1663354863388-9ced5806543a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMHRlc3R8ZW58MXx8fHwxNzY4Mzk3MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function Features() {
  return (
    <div className="px-4 sm:px-6 py-6 sm:py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              style={{ animationDelay: `${index * 150}ms` }}
              className={`${feature.bgColor} rounded-xl sm:rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer group relative animate-fade-in`}
            >
              {/* Image */}
              <div className="h-32 sm:h-48 overflow-hidden relative">
                <ImageWithFallback
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-8 relative">
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-white/30 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/30 rounded-full blur-xl" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-16 sm:h-16 ${feature.iconBg} rounded-lg sm:rounded-2xl mb-2 sm:mb-4 flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}