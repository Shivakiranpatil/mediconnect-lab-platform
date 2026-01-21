import { MessageCircle, FileSearch, Calendar, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string };

interface StepsProps {
  onNavigate: (page: Page) => void;
}

const steps = [
  {
    icon: MessageCircle,
    title: 'Answer a Few Questions',
    description: 'Tell us about your health goals',
    color: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    gradient: 'from-blue-400 to-blue-600',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBjb25zdWx0YXRpb258ZW58MXx8fHwxNzY4MzIyOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: FileSearch,
    title: 'Get Matched to Tests',
    description: 'AI recommends the right tests',
    color: 'bg-purple-500',
    lightBg: 'bg-purple-50',
    gradient: 'from-purple-400 to-purple-600',
    image: 'https://images.unsplash.com/photo-1767716134786-92b647b12846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMEFJfGVufDF8fHx8MTc2ODM5MzEyMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Calendar,
    title: 'Book Your Appointment',
    description: 'Choose time & location',
    color: 'bg-pink-500',
    lightBg: 'bg-pink-50',
    gradient: 'from-pink-400 to-pink-600',
    image: 'https://images.unsplash.com/photo-1765896387377-e293914d1e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaGVhbHRoY2FyZSUyMG51cnNlfGVufDF8fHx8MTc2ODM4NTIyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function Steps({ onNavigate }: StepsProps) {
  return (
    <div className="px-4 py-8 sm:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mb-6 animate-pulse-slow" />
          <h2 className="text-4xl font-bold text-gray-900">
            Get Started in 3 Easy Steps
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="relative text-center group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Card with image */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 mb-6 animate-fade-in">
                  {/* Image */}
                  <div className="h-48 overflow-hidden relative">
                    <ImageWithFallback
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                    
                    {/* Badge number */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-gray-900 shadow-xl text-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon Container */}
                  <div className="relative -mt-8 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl relative z-10`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button after steps */}
        <div className="max-w-2xl mx-auto text-center mt-8 sm:mt-12">
          <button 
            onClick={() => onNavigate({ name: 'discover' })}
            className="group px-8 sm:px-10 py-3 sm:py-4 bg-blue-600 text-white rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          <p className="text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6">
            Quick, Reliable & Confidential
          </p>

          {/* Disclaimer */}
          <div className="mt-[20px] sm:mt-12 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-100 px-[14px] py-[16px] mr-[0px] mb-[0px] ml-[0px]">
            <p className="text-xs text-gray-600">
              ⚠️ Educational only. Not medical advice. Confirm with a licensed clinician/lab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}