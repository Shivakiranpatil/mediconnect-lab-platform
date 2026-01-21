import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Sparkles, Send, ArrowLeft, Loader2, Activity, Heart, Zap, Users, Beaker } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  bundles?: TestBundle[];
}

interface TestBundle {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  icon: string;
  gradient: string;
}

const bundleIcons: Record<string, any> = {
  'activity': Activity,
  'heart': Heart,
  'zap': Zap,
  'users': Users,
  'beaker': Beaker,
};

const testBundles: TestBundle[] = [
  {
    id: 'essential-health',
    name: 'Essential Health Checkup',
    description: 'Complete preventive health screening with 40+ parameters',
    price: 399,
    originalPrice: 599,
    icon: 'activity',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    id: 'heart-health',
    name: 'Advanced Heart Health',
    description: 'Comprehensive cardiac risk assessment and cholesterol panel',
    price: 299,
    originalPrice: 449,
    icon: 'heart',
    gradient: 'from-red-500 to-red-600',
  },
  {
    id: 'womens-wellness',
    name: "Women's Wellness Panel",
    description: 'Hormone balance, PCOS screening, and fertility markers',
    price: 599,
    originalPrice: 899,
    icon: 'users',
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    id: 'mens-vitality',
    name: "Men's Vitality Panel",
    description: 'Testosterone, prostate health, and energy optimization',
    price: 549,
    originalPrice: 799,
    icon: 'zap',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    id: 'energy-fatigue',
    name: 'Energy & Fatigue Panel',
    description: 'Vitamin deficiencies, thyroid function, and metabolic markers',
    price: 449,
    originalPrice: 649,
    icon: 'beaker',
    gradient: 'from-amber-500 to-amber-600',
  },
];

export default function AIDiscoveryPage() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm here to help you find the right lab tests for your health needs. 👋\n\nWhat brings you here today? (For example: routine checkup, feeling fatigued, monitoring a condition, or something else)"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startConversation = async () => {
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "AI Discovery Chat" })
      });
      const data = await res.json();
      setConversationId(data.id);
      return data.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getRecommendedBundles = (allText: string): TestBundle[] => {
    const lowerText = allText.toLowerCase();
    const recommended: TestBundle[] = [];
    
    if (lowerText.includes('woman') || lowerText.includes('female') || lowerText.includes('pcos') || 
        lowerText.includes('period') || lowerText.includes('menstrual') || lowerText.includes('hormone')) {
      const bundle = testBundles.find(b => b.id === 'womens-wellness');
      if (bundle) recommended.push(bundle);
    }
    
    if (lowerText.includes('man') || lowerText.includes('male') || lowerText.includes('prostate') || 
        lowerText.includes('testosterone') || lowerText.includes('libido')) {
      const bundle = testBundles.find(b => b.id === 'mens-vitality');
      if (bundle) recommended.push(bundle);
    }
    
    if (lowerText.includes('heart') || lowerText.includes('cholesterol') || lowerText.includes('diabetes') || 
        lowerText.includes('blood pressure') || lowerText.includes('cardiac')) {
      const bundle = testBundles.find(b => b.id === 'heart-health');
      if (bundle) recommended.push(bundle);
    }
    
    if (lowerText.includes('tired') || lowerText.includes('fatigue') || lowerText.includes('energy') || 
        lowerText.includes('weak') || lowerText.includes('exhausted') || lowerText.includes('vitamin')) {
      const bundle = testBundles.find(b => b.id === 'energy-fatigue');
      if (bundle) recommended.push(bundle);
    }
    
    if (lowerText.includes('routine') || lowerText.includes('checkup') || lowerText.includes('general') || 
        lowerText.includes('preventive') || lowerText.includes('annual') || lowerText.includes('full body')) {
      const bundle = testBundles.find(b => b.id === 'essential-health');
      if (bundle) recommended.push(bundle);
    }
    
    if (recommended.length < 2) {
      const essential = testBundles.find(b => b.id === 'essential-health');
      if (essential && !recommended.includes(essential)) {
        recommended.push(essential);
      }
    }
    
    return recommended.slice(0, 3);
  };

  const getRuleBasedResponse = (userInput: string, qCount: number): Message => {
    if (qCount === 0) {
      return {
        role: 'assistant',
        content: "Thank you for sharing! 🙏\n\nHave you been diagnosed with any medical conditions? (Such as diabetes, high blood pressure, PCOS, thyroid issues, or others - or just type 'none')"
      };
    } else if (qCount === 1) {
      return {
        role: 'assistant',
        content: "Got it, thanks! 📋\n\nWhat's your age range?\n• 18-30 years\n• 31-45 years\n• 46-60 years\n• 60+ years"
      };
    } else if (qCount === 2) {
      return {
        role: 'assistant',
        content: "Perfect! 📍\n\nWhere would you prefer to have your sample collected?\n• Home visit (our phlebotomist comes to you)\n• Lab visit (you come to our partner labs)\n• Either works for me"
      };
    } else {
      const allText = messages.map(m => m.content).join(' ') + ' ' + userInput;
      const recommendedBundles = getRecommendedBundles(allText);
      
      return {
        role: 'assistant',
        content: "Based on what you've shared, here are test bundles commonly chosen by others with similar needs:\n\n✨ Click on any bundle below to see full details and book!\n\nRemember, these are discovery suggestions. Please consult your healthcare provider for personalized medical advice.",
        bundles: recommendedBundles
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Use rule-based responses for the discovery flow
    const response = getRuleBasedResponse(input, questionCount);
    
    // Simulate slight delay for natural feel
    setTimeout(() => {
      setMessages(prev => [...prev, response]);
      setQuestionCount(prev => prev + 1);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50" data-testid="ai-discovery-page">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium text-sm sm:text-base">Back</span>
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900 text-sm sm:text-base">AI Discovery</span>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-32" data-testid="chat-container">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 sm:mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 sm:px-6 py-3 sm:py-4 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500">AI Assistant</span>
                  </div>
                )}
                <div className="whitespace-pre-line text-sm sm:text-base">{message.content}</div>

                {/* Bundle Cards */}
                {message.bundles && message.bundles.length > 0 && (
                  <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                    {message.bundles.map(bundle => {
                      const IconComponent = bundleIcons[bundle.icon] || Activity;
                      return (
                        <motion.div
                          key={bundle.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => navigate(`/bundles/${bundle.id}`)}
                          className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 hover:border-blue-400 rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-lg group"
                          data-testid={`bundle-card-${bundle.id}`}
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${bundle.gradient} rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 shadow-md`}>
                              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                                {bundle.name}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">{bundle.description}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                  <span className="text-lg sm:text-2xl font-bold text-blue-600">AED {bundle.price}</span>
                                  <span className="text-xs sm:text-sm text-gray-400 line-through ml-2">AED {bundle.originalPrice}</span>
                                </div>
                                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-6"
          >
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <span className="text-gray-600">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg" data-testid="chat-input-area">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your answer here..."
              className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
              disabled={isLoading}
              data-testid="input-chat"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold shadow-lg"
              data-testid="button-send"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            💡 This is a discovery tool, not medical advice. Always consult healthcare professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
