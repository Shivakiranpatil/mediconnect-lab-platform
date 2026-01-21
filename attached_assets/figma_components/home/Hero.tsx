import { Search, Sparkles, ArrowRight, Mic } from 'lucide-react';
import { useState } from 'react';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string };

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleAIClick = () => {
    onNavigate({ name: 'discover' });
  };

  const handleSearch = () => {
    onNavigate({ name: 'discover' });
  };

  const handleSuggestionClick = () => {
    onNavigate({ name: 'discover' });
  };

  const handleVoiceInput = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Voice input is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Could not capture voice. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const suggestions = [
    { icon: '💊', text: 'Routine health checkup', gradient: 'from-blue-400 to-blue-500' },
    { icon: '❤️', text: 'Heart health screening', gradient: 'from-red-400 to-red-500' },
    { icon: '⚡', text: 'Energy and fatigue tests', gradient: 'from-amber-400 to-amber-500' },
    { icon: '🩺', text: 'Women\'s health panel', gradient: 'from-pink-400 to-pink-500' },
  ];

  return (
    <div className="text-center px-4 sm:px-6 pt-8 sm:pt-12 pb-12 sm:pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          Smart Lab Tests, <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Just for You
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 md:mb-16">
          AI-Driven Health Test Booking in Dubai
        </p>

        {/* Main Search Bar - Responsive */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="relative bg-white rounded-2xl sm:rounded-full shadow-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-[0_25px_80px_rgba(59,130,246,0.5)] transition-all duration-500 group">
            <Search className="absolute left-4 sm:left-6 top-6 sm:top-1/2 sm:-translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-blue-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <input
              type="text"
              placeholder="Search for Sugar, Vitamin D..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-12 sm:pl-16 pr-4 sm:pr-4 py-4 sm:py-6 pb-20 sm:pb-4 md:pr-56 text-base sm:text-lg rounded-2xl sm:rounded-full focus:outline-none bg-transparent placeholder:text-gray-400"
            />
            <div className="absolute left-4 right-4 bottom-2 sm:right-2 sm:left-auto sm:top-1/2 sm:-translate-y-1/2 flex flex-row sm:flex-row items-center justify-center sm:justify-end gap-2">
              <button
                onClick={handleVoiceInput}
                className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-3 ${
                  isListening 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
                    : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                } text-white rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 group`}
              >
                <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-125 transition-transform duration-300" />
                <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice'}</span>
              </button>
              <button
                onClick={handleAIClick}
                className="flex-1 sm:flex-initial px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-base font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 group"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
                Ask AI
              </button>
            </div>
          </div>
        </div>

        {/* Quick Search Section */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-10">
          <div className="text-left mb-3 ml-0 sm:ml-2">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              Quick Search:
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-start">
            {[
              'Blood Sugar (HbA1c)',
              'Cholesterol Profile',
              'Vitamin D Levels',
              'Full Body Check',
              'Iron Deficiency',
              'Thyroid Function',
              'Liver Function',
              'Kidney Function'
            ].map((item, index) => (
              <button
                key={index}
                onClick={handleSuggestionClick}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Smaller Suggestion Buttons */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={handleSuggestionClick}
              style={{ animationDelay: `${index * 100}ms` }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white border border-gray-200 hover:border-blue-400 rounded-lg transition-all duration-300 text-left group shadow-sm hover:shadow-md transform hover:scale-105 animate-fade-in"
            >
              <div className={`w-6 h-6 bg-gradient-to-br ${suggestion.gradient} rounded-md flex items-center justify-center text-sm transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {suggestion.icon}
              </div>
              <span className="text-xs font-medium text-gray-600 flex-1 group-hover:text-blue-600 transition-colors">
                {suggestion.text}
              </span>
              <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}