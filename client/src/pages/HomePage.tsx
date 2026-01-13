import { Link } from "wouter";
import { Sparkles, Search, Calendar, ChevronRight, ArrowRight, Send, User } from "lucide-react";
import { useBundles } from "@/hooks/use-bundles";
import { Navbar } from "@/components/Navbar";
import { BundleCard } from "@/components/BundleCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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
    "How does home collection work?",
    "Tell me about the full body checkup"
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 z-0" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-300/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-8 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by 10,000+ families in UAE
            </span>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight">
              Your Health Journey <br />
              <span className="text-blue-100">Starts Here.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-50 mb-10 max-w-2xl font-light leading-relaxed">
              AI-powered test recommendations, convenient home collection, and results you can actually understand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/ai-discovery">
                <button className="h-14 px-8 rounded-2xl bg-white text-blue-600 font-bold text-lg hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Find My Tests
                </button>
              </Link>
              <Link href="/tests">
                <button className="h-14 px-8 rounded-2xl bg-blue-700/50 backdrop-blur-md border border-white/20 text-white font-semibold text-lg hover:bg-blue-700/70 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  Browse All Packages
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="relative z-20 -mt-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: Sparkles, label: 'AI Discovery', desc: 'Personalized plan', color: 'from-violet-500 to-purple-500', href: '/ai-discovery' },
            { icon: Search, label: 'Browse Tests', desc: 'Explore all packages', color: 'from-blue-500 to-cyan-500', href: '/tests' },
            { icon: Calendar, label: 'Book Now', desc: 'Schedule collection', color: 'from-teal-500 to-emerald-500', href: '/book' },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 cursor-pointer border border-white"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{item.label}</h3>
                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Bundles */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Popular Health Packages</h2>
            <p className="text-lg text-slate-500 max-w-xl">
              Curated comprehensive health checks chosen by thousands of customers in Dubai and Abu Dhabi.
            </p>
          </div>
          <Link href="/tests">
            <button className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
              View All Packages <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundles?.filter(b => b.isPopular).slice(0, 6).map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        )}
      </section>

      {/* Health AI Assistant Chat */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Health AI Assistant</h2>
            <p className="text-lg text-slate-500">
              Get instant answers to your health questions and personalized test recommendations.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-200/50 border border-slate-100 overflow-hidden flex flex-col h-[600px]"
          >
            {/* Chat Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-teal-500 text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Health Assistant</h3>
                <p className="text-xs text-blue-50">Online • Always here to help</p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-blue-500" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">How can I help you today?</h4>
                  <p className="text-slate-500 mb-8 max-w-sm">
                    Ask me about symptoms, tests, or how our home collection service works.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {suggestedQuestions.map((q, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSend(q)}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
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
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-3xl ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 shadow-md border border-slate-100 rounded-tl-none'
                    }`}>
                      <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
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
                  <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-md border border-slate-100 flex gap-1">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-white border-t border-slate-100">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="relative flex items-center gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a health question..."
                  className="flex-1 h-14 pl-6 pr-16 bg-slate-50 border-none rounded-2xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isChatLoading}
                  className="absolute right-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="mt-4 text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                🔒 Private & Secure • AI-Powered Health Guidance
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-12">Trusted by leading healthcare providers</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholders for logos */}
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} className="h-12 w-32 bg-slate-200 rounded-lg animate-pulse" />
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
