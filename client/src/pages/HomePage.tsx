import { Link } from "wouter";
import { Sparkles, Search, Calendar, ChevronRight, ArrowRight, Send, User, CheckCircle2, MessageSquare } from "lucide-react";
import { useBundles } from "@/hooks/use-bundles";
import { Navbar } from "@/components/Navbar";
import { BundleCard } from "@/components/BundleCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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
    "How does home collection work?",
    "Tell me about the full body checkup"
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Redesigned to match provided image */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.1),transparent_50%)]">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-slate-900 tracking-tight">
              Smart Lab Tests, <span className="text-blue-600">Just for You</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 mb-12 font-medium">
              AI-Driven Health Test Booking in Dubai
            </p>

            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-white rounded-[2rem] p-2 shadow-xl border border-slate-100">
                <div className="flex-1 flex items-center px-6">
                  <Search className="w-5 h-5 text-slate-400 mr-4" />
                  <input 
                    type="text" 
                    placeholder="What test are you looking for?"
                    className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium h-12"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-[1.5rem] transition-all shadow-lg hover:shadow-blue-500/25">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Wave-like Background (Simulated with Blur) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
           <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
           <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-[100px] mix-blend-multiply" />
        </div>
      </section>

      {/* Feature Grid - Redesigned to match image cards */}
      <section className="relative z-20 -mt-8 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: "🤖", 
              label: 'AI-Powered Matching', 
              desc: 'Personalized test recommendations tailored to your needs.',
              bg: 'bg-blue-50/50'
            },
            { 
              icon: "🏠", 
              label: 'At-Home or In-Lab', 
              desc: 'Book home visits or lab appointments at top clinics.',
              bg: 'bg-indigo-50/50'
            },
            { 
              icon: "🏥", 
              label: 'Top Lab Aggregator', 
              desc: 'Compare top labs & get best deals instantly.',
              bg: 'bg-teal-50/50'
            },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className={`p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-white/50 backdrop-blur-sm flex flex-col items-center text-center group transition-all duration-300 ${item.bg}`}
            >
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-3">{item.label}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps Section - Simplified & Modern */}
      <section className="py-24 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-16 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-slate-200 hidden md:block" />
          Get Started in 3 Easy Steps
          <div className="h-px w-12 bg-slate-200 hidden md:block" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {[
            { icon: MessageSquare, title: 'Answer a Few Questions', color: 'text-blue-500' },
            { icon: Sparkles, title: 'Get Matched to Tests', color: 'text-teal-500' },
            { icon: Calendar, title: 'Book Your Appointment', color: 'text-rose-500' },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-slate-50 ${step.color}`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{step.title}</h3>
              <div className="w-8 h-1 bg-slate-100 rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Category Selection - Matching Image Cards with Photos */}
      <section className="py-24 container mx-auto px-4 bg-slate-50/50 rounded-[3rem] border border-slate-100/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Find the Right Test, Fast & Easy</h2>
          <p className="text-slate-500 font-medium">Advanced AI Recommendations for Your Health</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'Full Body Checkup', sub: 'Complete health screening', img: fullBodyImg, color: 'from-blue-500/10 to-blue-600/5' },
             { title: "Women's Wellness", sub: 'Hormone & PCOS Panels', img: womenWellnessImg, color: 'from-rose-500/10 to-rose-600/5' },
             { title: 'Heart & Cholesterol', sub: 'Cardiac Risk Assessments', img: heartHealthImg, color: 'from-orange-500/10 to-orange-600/5' },
           ].map((cat, i) => (
             <motion.div 
               key={i}
               whileHover={{ scale: 1.02 }}
               className="relative h-64 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-lg"
             >
               <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-90`} />
               <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-white/80 via-white/40 to-transparent">
                 <h3 className="text-2xl font-bold text-slate-900 mb-1">{cat.title}</h3>
                 <p className="text-slate-600 font-medium">{cat.sub}</p>
               </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Trust Section - Styled like image footer */}
      <section className="py-24 container mx-auto px-4 text-center">
        <h3 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm mb-12">Trusted by Dubai's Leading Labs</h3>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Simulate logos with text styles for speed, but rounded to look like logos */}
           {[
             { name: 'Medcare', color: 'text-rose-600' },
             { name: 'NMC', color: 'text-blue-700' },
             { name: 'Al Borg', color: 'text-emerald-600' },
             { name: 'Prime', color: 'text-blue-800' },
             { name: 'Aster', color: 'text-green-600' }
           ].map((lab, i) => (
             <div key={i} className="text-2xl font-black font-display flex items-center gap-2">
               <div className={`w-8 h-8 rounded-lg bg-current opacity-20 ${lab.color}`} />
               <span className={lab.color}>{lab.name}</span>
             </div>
           ))}
        </div>

        <div className="mt-20">
          <Link href="/ai-discovery">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-12 rounded-[1.5rem] text-xl shadow-2xl shadow-blue-500/40 hover:-translate-y-1 transition-all flex items-center gap-3 mx-auto">
              Get Started Now <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
          <p className="mt-6 text-slate-400 font-medium">Quick, Reliable & Confidential</p>
        </div>
      </section>

      {/* Health AI Assistant Chat - Keep as requested */}
      <section className="py-24 bg-slate-50/30">
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
            className="bg-white rounded-[3rem] shadow-2xl shadow-blue-200/30 border border-slate-100 overflow-hidden flex flex-col h-[600px]"
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
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-blue-500" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">How can I help you today?</h4>
                  <p className="text-slate-500 mb-8 max-w-sm font-medium">
                    Ask me about symptoms, tests, or how our home collection service works.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {suggestedQuestions.map((q, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSend(q)}
                        className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
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
                    <div className={`max-w-[85%] p-5 rounded-[2rem] shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none font-medium'
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
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex gap-1.5">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-8 bg-white border-t border-slate-100">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="relative flex items-center gap-4"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a health question..."
                  className="flex-1 h-14 pl-8 pr-20 bg-slate-50 border-none rounded-[1.5rem] text-slate-700 placeholder:text-slate-400 font-medium focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isChatLoading}
                  className="absolute right-2 w-11 h-11 bg-blue-600 text-white rounded-[1rem] flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                Private & Secure AI Health Guidance
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer / Copyright */}
      <footer className="py-12 text-center text-slate-400 text-sm font-medium border-t border-slate-50">
        <p>© 2026 MediConnect Health. All rights reserved.</p>
      </footer>
    </div>
  );
}
