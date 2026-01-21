import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, ArrowLeft, Loader2 } from 'lucide-react';
import { bundles, type TestBundle } from '../data/tests';

type Page = 
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'bundles' }
  | { name: 'bundle-detail'; bundleId: string }
  | { name: 'test-detail'; testId: string };

interface DiscoverProps {
  onNavigate: (page: Page) => void;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  bundles?: TestBundle[];
}

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE'; // User needs to replace this

const SYSTEM_PROMPT = `You are a friendly, helpful AI assistant for a lab test discovery platform in Dubai, UAE. You help users find the right lab tests based on their health needs.

CRITICAL SAFETY RULES:
1. You are a NON-CLINICAL discovery tool ONLY
2. You CANNOT diagnose conditions
3. You CANNOT interpret lab results or values
4. You CANNOT provide medical advice
5. Always recommend users consult healthcare professionals for medical decisions

YOUR ROLE:
- Guide users through a 4-question discovery flow
- Recommend test bundles as "commonly chosen by others with similar needs"
- Never use clinical language like "you need this test" - instead say "commonly chosen" or "often selected"

QUESTION FLOW (Ask ONE question at a time):
1. "What brings you here today?" (Intent: routine checkup, specific symptoms, monitoring, etc.)
2. "Have you been diagnosed with any medical conditions?" (Diabetes, hypertension, PCOS, etc.)
3. "What's your age range?" (18-30, 31-45, 46-60, 60+)
4. "Where would you prefer sample collection?" (Home visit, Lab visit, Either)

After collecting answers, recommend 2-3 test bundles from this list:
- Essential Health Checkup (General health, preventive care)
- Advanced Heart Health (Heart disease risk, cholesterol, diabetes)
- Women's Wellness Panel (Hormones, PCOS, fertility, women 20+)
- Men's Vitality Panel (Testosterone, prostate, energy, men 30+)
- Energy & Fatigue Panel (Vitamin deficiencies, thyroid, fatigue)

RESPONSE FORMAT:
- Be warm, conversational, and supportive
- Keep responses under 80 words
- After question 4, respond with: "Based on what you've shared, here are test bundles commonly chosen by others with similar needs:" then list 2-3 bundles with brief explanations
- Always end recommendations with: "Remember, these are discovery suggestions. Please consult your healthcare provider for personalized medical advice."

Start by greeting the user warmly and asking question 1.`;

export function Discover({ onNavigate }: DiscoverProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm here to help you find the right lab tests for your health needs. 👋\n\nWhat brings you here today? (For example: routine checkup, feeling fatigued, monitoring a condition, or something else)"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [questionCount, setQuestionCount] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setQuestionCount(prev => prev + 1);

    try {
      // Check if API key is set
      if (OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
        // Fallback: Rule-based responses
        const response = getRuleBasedResponse(input, questionCount);
        setMessages(prev => [...prev, response]);
        setIsLoading(false);
        return;
      }

      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: input }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiContent = data.choices[0].message.content;

      // Check if this is the final recommendation (after 4 questions)
      let assistantMessage: Message = {
        role: 'assistant',
        content: aiContent
      };

      // If AI is recommending bundles, add them to the message
      if (questionCount >= 3 && aiContent.toLowerCase().includes('commonly chosen')) {
        assistantMessage.bundles = getRecommendedBundles(messages, input);
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      // Fallback to rule-based
      const response = getRuleBasedResponse(input, questionCount);
      setMessages(prev => [...prev, response]);
    }

    setIsLoading(false);
  };

  const getRuleBasedResponse = (userInput: string, qCount: number): Message => {
    const lowerInput = userInput.toLowerCase();

    // Question progression
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
      // After 4 questions, provide recommendations
      const recommendedBundles = getRecommendedBundles(messages, userInput);
      
      return {
        role: 'assistant',
        content: "Based on what you've shared, here are test bundles commonly chosen by others with similar needs:\n\n✨ Click on any bundle below to see full details and book!\n\nRemember, these are discovery suggestions. Please consult your healthcare provider for personalized medical advice.",
        bundles: recommendedBundles
      };
    }
  };

  const getRecommendedBundles = (msgs: Message[], latestInput: string): TestBundle[] => {
    // Extract user context from messages
    const allText = msgs.map(m => m.content).join(' ').toLowerCase() + ' ' + latestInput.toLowerCase();
    
    const recommended: TestBundle[] = [];
    
    // Rule-based matching
    if (allText.includes('woman') || allText.includes('female') || allText.includes('pcos') || 
        allText.includes('period') || allText.includes('menstrual') || allText.includes('hormone')) {
      const womensBundle = bundles.find(b => b.id === 'womens-wellness');
      if (womensBundle) recommended.push(womensBundle);
    }
    
    if (allText.includes('man') || allText.includes('male') || allText.includes('prostate') || 
        allText.includes('testosterone') || allText.includes('libido')) {
      const mensBundle = bundles.find(b => b.id === 'mens-vitality');
      if (mensBundle) recommended.push(mensBundle);
    }
    
    if (allText.includes('heart') || allText.includes('cholesterol') || allText.includes('diabetes') || 
        allText.includes('blood pressure') || allText.includes('cardiac')) {
      const heartBundle = bundles.find(b => b.id === 'heart-health');
      if (heartBundle) recommended.push(heartBundle);
    }
    
    if (allText.includes('tired') || allText.includes('fatigue') || allText.includes('energy') || 
        allText.includes('weak') || allText.includes('exhausted') || allText.includes('vitamin')) {
      const energyBundle = bundles.find(b => b.id === 'energy-fatigue');
      if (energyBundle) recommended.push(energyBundle);
    }
    
    if (allText.includes('routine') || allText.includes('checkup') || allText.includes('general') || 
        allText.includes('preventive') || allText.includes('annual')) {
      const essentialBundle = bundles.find(b => b.id === 'essential-health');
      if (essentialBundle) recommended.push(essentialBundle);
    }
    
    // If less than 2 recommendations, add Essential Health
    if (recommended.length < 2) {
      const essentialBundle = bundles.find(b => b.id === 'essential-health');
      if (essentialBundle && !recommended.includes(essentialBundle)) {
        recommended.push(essentialBundle);
      }
    }
    
    // Return top 3
    return recommended.slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate({ name: 'home' })}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm sm:text-base">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900 text-sm sm:text-base">AI Discovery</span>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-32">
        {messages.map((message, index) => (
          <div
            key={index}
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
                  {message.bundles.map(bundle => (
                    <div
                      key={bundle.id}
                      onClick={() => onNavigate({ name: 'bundle-detail', bundleId: bundle.id })}
                      className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 hover:border-blue-400 rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-lg group"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${bundle.gradient} rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 shadow-md`}>
                          {bundle.icon}
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start mb-6">
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <span className="text-gray-600">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
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
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold shadow-lg"
            >
              <Send className="w-5 h-5" />
              Send
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