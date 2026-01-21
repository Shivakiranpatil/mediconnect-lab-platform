import { Link } from "wouter";
import { 
  Sparkles, Search, Calendar, ArrowRight, Send, 
  CheckCircle2, MessageSquare, Microscope, Home as HomeIcon,
  Shield, Clock, Star, Phone, MapPin, ChevronRight,
  Heart, Activity, Beaker, Users, Zap, Bot
} from "lucide-react";
import { useBundles } from "@/hooks/use-bundles";
import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import fullBodyImg from "@assets/stock_images/professional_medical_5f834d8f.jpg";
import womenWellnessImg from "@assets/stock_images/middle_eastern_woman_c8937e09.jpg";
import heartHealthImg from "@assets/stock_images/heart_health_cardiov_fa509467.jpg";

export default function HomePage() {
  const { data: bundles, isLoading } = useBundles();
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startConversation = async () => {
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Home Chat" })
      });
      const data = await res.json();
      setConversationId(data.id);
      return data.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isChatLoading) return;
    
    let currentId = conversationId;
    if (!currentId) {
      currentId = await startConversation();
    }
    if (!currentId) return;

    const userMsg = { role: 'user' as const, content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch(`/api/conversations/${currentId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text })
      });

      if (!response.body) throw new Error("No response body");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = { role: 'assistant' as const, content: "" };
      setMessages(prev => [...prev, assistantMsg]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                assistantMsg.content += data.content;
                setMessages(prev => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1] = { ...assistantMsg };
                  return newMsgs;
                });
              }
            } catch (e) {
              // Ignore partial JSON
            }
          }
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsChatLoading(false);
    }
  };

  const suggestedQuestions = [
    "What tests do I need for fatigue?",
    "Recommend a full body checkup",
    "How does home collection work?"
  ];

  const testBundles = [
    { id: '1', name: 'Essential Health Checkup', tests: 6, price: 399, originalPrice: 599, popular: true, icon: Activity },
    { id: '2', name: 'Advanced Heart Health', tests: 4, price: 299, originalPrice: 449, popular: false, icon: Heart },
    { id: '3', name: "Women's Wellness Panel", tests: 6, price: 599, originalPrice: 899, popular: true, icon: Users },
    { id: '4', name: "Men's Vitality Panel", tests: 6, price: 549, originalPrice: 799, popular: false, icon: Zap },
    { id: '5', name: 'Energy & Fatigue Panel', tests: 6, price: 449, originalPrice: 649, popular: false, icon: Beaker },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden" data-testid="home-page">
      <Navbar />

      {/* Hero Section - Blue-Purple Gradient Theme */}
      <section className="relative pt-24 pb-32 overflow-hidden" data-testid="hero-section">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl" />
          
          {/* Floating Medical Icons */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-32 right-[15%] w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center"
          >
            <Heart className="w-8 h-8 text-white/80" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-48 left-[10%] w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center"
          >
            <Microscope className="w-7 h-7 text-white/80" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute bottom-32 right-[8%] w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center"
          >
            <Activity className="w-6 h-6 text-white/80" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center pt-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-xl rounded-full mb-8" data-testid="hero-badge">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-white/90 text-sm font-semibold">AI-Powered Health Discovery</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight" data-testid="hero-title">
                Smart Lab Tests,
                <br />
                <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  Just for You
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto" data-testid="hero-subtitle">
                Discover the right health tests with AI guidance. Book home collection or lab visits across Dubai & UAE.
              </p>

              {/* AI Search Bar */}
              <div className="max-w-2xl mx-auto" data-testid="search-bar">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500" />
                  <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl">
                    <div className="flex-1 flex items-center px-5">
                      <Bot className="w-6 h-6 text-indigo-500 mr-4" />
                      <input 
                        type="text" 
                        placeholder="Ask AI: 'What tests for fatigue?' or 'Heart checkup'"
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium h-14 text-lg"
                        data-testid="input-hero-search"
                      />
                    </div>
                    <Link href="/ai-discovery">
                      <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2" data-testid="button-ask-ai">
                        <Sparkles className="w-5 h-5" />
                        Ask AI
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-8" data-testid="quick-suggestions">
                {['Full Body Checkup', 'Vitamin Deficiency', 'Thyroid Test', 'Diabetes Screen'].map((pill, i) => (
                  <Link href="/ai-discovery" key={i}>
                    <button className="px-5 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-xl text-white/90 rounded-full text-sm font-medium transition-all border border-white/20" data-testid={`pill-${pill.toLowerCase().replace(/\s/g, '-')}`}>
                      {pill}
                    </button>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 70C1200 65 1320 55 1380 50L1440 45V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative z-20 -mt-4" data-testid="features-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: Bot, 
                label: 'AI-Powered Matching', 
                desc: 'Get personalized test recommendations based on your symptoms and health goals.',
                gradient: 'from-indigo-500 to-purple-500'
              },
              { 
                icon: HomeIcon, 
                label: 'Home Sample Collection', 
                desc: 'Professional phlebotomists visit your home. No clinic visits needed.',
                gradient: 'from-cyan-500 to-blue-500'
              },
              { 
                icon: Microscope, 
                label: 'Compare Top Labs', 
                desc: 'Access prices from 4+ accredited labs. Choose what works for you.',
                gradient: 'from-emerald-500 to-teal-500'
              },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                data-testid={`feature-card-${i}`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-3">{item.label}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50" data-testid="how-it-works-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-500 text-lg">Get started in 3 simple steps</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-teal-200" />
              
              {[
                { step: '1', icon: MessageSquare, title: 'Tell Us Your Needs', desc: 'Answer a few questions about your health goals or symptoms', color: 'indigo' },
                { step: '2', icon: Sparkles, title: 'Get AI Recommendations', desc: 'Our AI matches you with the right tests from top labs', color: 'purple' },
                { step: '3', icon: Calendar, title: 'Book & Collect', desc: 'Choose home collection or visit a lab. Results in 24-48hrs', color: 'teal' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                  data-testid={`step-${item.step}`}
                >
                  <div className={`w-28 h-28 rounded-3xl bg-${item.color}-50 flex items-center justify-center mb-6 relative shadow-lg shadow-${item.color}-100/50`}>
                    <item.icon className={`w-12 h-12 text-${item.color}-600`} />
                    <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${item.color}-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 text-xl mb-2">{item.title}</h3>
                  <p className="text-slate-500 max-w-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Test Bundles Section */}
      <section className="py-20 bg-slate-50" data-testid="bundles-section">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Popular Test Bundles</h2>
              <p className="text-slate-500 text-lg">Comprehensive health packages at best prices</p>
            </div>
            <Link href="/ai-discovery">
              <button className="mt-4 md:mt-0 text-indigo-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all" data-testid="button-view-all-bundles">
                View All Bundles <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testBundles.slice(0, 3).map((bundle, i) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-all group"
                data-testid={`bundle-card-${bundle.id}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <bundle.icon className="w-6 h-6 text-white" />
                  </div>
                  {bundle.popular && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">Popular</span>
                  )}
                </div>
                
                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">{bundle.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{bundle.tests} tests included</p>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-slate-900">AED {bundle.price}</span>
                  <span className="text-slate-400 line-through text-sm">AED {bundle.originalPrice}</span>
                  <span className="text-emerald-600 text-sm font-semibold">
                    Save {Math.round((1 - bundle.price / bundle.originalPrice) * 100)}%
                  </span>
                </div>

                <Link href={`/bundles/${bundle.id}`}>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3" data-testid={`button-view-bundle-${bundle.id}`}>
                    View Details
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards with Images */}
      <section className="py-20" data-testid="categories-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Browse by Category</h2>
            <p className="text-slate-500 text-lg">Find tests for your specific health needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Full Body Checkup', sub: 'Complete Health Screening', img: fullBodyImg, color: 'from-indigo-600/90 to-blue-600/90' },
              { title: "Women's Wellness", sub: 'Hormone & Wellness Panels', img: womenWellnessImg, color: 'from-rose-600/90 to-pink-600/90' },
              { title: 'Heart & Cardiac', sub: 'Cardiovascular Assessments', img: heartHealthImg, color: 'from-red-600/90 to-orange-600/90' },
            ].map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer shadow-xl"
                data-testid={`category-card-${i}`}
              >
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color}`} />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-1">{cat.title}</h3>
                  <p className="text-white/80">{cat.sub}</p>
                  <div className="mt-4 flex items-center gap-2 text-white/90 font-medium">
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Assistant Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white" data-testid="chat-section">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
              <Bot className="w-4 h-4 text-indigo-600" />
              <span className="text-indigo-600 text-sm font-semibold">Powered by AI</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Health AI Assistant</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Get instant answers about symptoms, tests, and personalized recommendations. Available 24/7.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl shadow-indigo-200/30 border border-slate-100 overflow-hidden flex flex-col h-[550px]"
            data-testid="chat-container"
          >
            {/* Chat Header */}
            <div className="p-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">MediConnect AI</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm text-white/80">Online now</span>
                </div>
              </div>
              <Link href="/ai-discovery">
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors" data-testid="button-open-full-chat">
                  Open Full Chat
                </button>
              </Link>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50"
              data-testid="chat-messages"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-indigo-500" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">How can I help you today?</h4>
                  <p className="text-slate-500 mb-8 max-w-md">
                    I can help you find the right tests, explain symptoms, and guide you through booking.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {suggestedQuestions.map((q, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSend(q)}
                        className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
                        data-testid={`suggested-question-${i}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-bl-md shadow-sm'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isChatLoading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-sm border border-slate-100 flex gap-1.5">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-5 bg-white border-t border-slate-100">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your health question..."
                    className="w-full h-12 px-5 bg-slate-100 border-none rounded-xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all"
                    data-testid="input-chat"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={!input.trim() || isChatLoading}
                  className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg disabled:opacity-50 transition-all"
                  data-testid="button-send-chat"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Shield className="w-3 h-3" />
                <span>Your data is private and secure</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section - Partner Labs */}
      <section className="py-20" data-testid="trust-section">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 font-semibold uppercase tracking-widest text-sm mb-10">
            Trusted Partner Laboratories
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {[
              { name: 'Prime Diagnostics', accent: 'text-blue-600' },
              { name: 'HealthFirst Labs', accent: 'text-emerald-600' },
              { name: 'MediCare Diagnostics', accent: 'text-indigo-600' },
              { name: 'QuickTest Pro', accent: 'text-purple-600' },
            ].map((lab, i) => (
              <div key={i} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <div className={`w-10 h-10 rounded-xl bg-current opacity-10 ${lab.accent}`} />
                <span className={`text-xl font-bold ${lab.accent}`}>{lab.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-500">
            {[
              { icon: Shield, label: 'CAP Accredited' },
              { icon: CheckCircle2, label: 'JCI Certified' },
              { icon: Clock, label: '24-48hr Results' },
              { icon: Star, label: '4.8 Rating' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="w-5 h-5 text-indigo-500" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600" data-testid="cta-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Start with our AI discovery to find the perfect tests for you. Home collection available across Dubai & UAE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai-discovery">
              <Button className="bg-white text-indigo-600 hover:bg-slate-100 font-bold py-6 px-10 rounded-xl text-lg shadow-xl" data-testid="button-cta-start">
                <Sparkles className="w-5 h-5 mr-2" />
                Start AI Discovery
              </Button>
            </Link>
            <Link href="/labs">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold py-6 px-10 rounded-xl text-lg" data-testid="button-cta-browse">
                Browse All Tests
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 text-white" data-testid="footer">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Beaker className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MediConnect</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                AI-powered health test discovery and booking platform serving Dubai & UAE.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/ai-discovery" className="hover:text-white transition-colors">AI Discovery</Link></li>
                <li><Link href="/labs" className="hover:text-white transition-colors">Partner Labs</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Popular Tests</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Full Body Checkup</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Thyroid Panel</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vitamin D Test</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+971 4 123 4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Dubai, UAE</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>© 2026 MediConnect Health. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
