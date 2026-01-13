import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAiQuestions, useAiRecommend } from "@/hooks/use-ai";
import { ArrowLeft, X, Check, Target, ClipboardList, Calendar, MapPin, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const icons: Record<string, any> = {
  target: Target,
  "clipboard-list": ClipboardList,
  calendar: Calendar,
  "map-pin": MapPin,
};

export default function AIDiscoveryPage() {
  const [, navigate] = useLocation();
  const { data: questions, isLoading } = useAiQuestions();
  const recommendMutation = useAiRecommend();
  
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Sort questions by sortOrder
  const sortedQuestions = questions?.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)) || [];
  const currentQuestion = sortedQuestions[step];
  
  const progress = sortedQuestions.length > 0 ? ((step + 1) / sortedQuestions.length) * 100 : 0;

  const handleSelect = (value: any) => {
    if (!currentQuestion) return;

    if (currentQuestion.questionType === 'multi') {
      const current = (answers[currentQuestion.questionKey] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [currentQuestion.questionKey]: updated });
    } else {
      setAnswers({ ...answers, [currentQuestion.questionKey]: value });
      // Auto advance for single choice after a brief delay
      if (step < sortedQuestions.length - 1) {
        setTimeout(() => setStep(s => s + 1), 300);
      }
    }
  };

  const handleNext = async () => {
    if (step < sortedQuestions.length - 1) {
      setStep(s => s + 1);
    } else {
      // Submit
      try {
        const result = await recommendMutation.mutateAsync(answers);
        // Store recommendations in localStorage or state management to pass to results page
        // For simplicity, we'll assume the results page can refetch or we pass state via router (wouter doesn't support state passing easily)
        // We'll use localStorage for this demo
        localStorage.setItem('ai_recommendations', JSON.stringify(result.recommendations));
        navigate("/ai-results");
      } catch (error) {
        console.error("Failed to get recommendations", error);
      }
    }
  };

  const QuestionIcon = currentQuestion?.icon ? icons[currentQuestion.icon] || Target : Target;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!currentQuestion) return null;

  const currentAnswer = answers[currentQuestion.questionKey];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-200 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-600 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-40 h-16">
        <div className="container max-w-2xl mx-auto px-4 h-full flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => step > 0 ? setStep(s => s - 1) : navigate("/")}>
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Button>
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
            Step {step + 1} of {sortedQuestions.length}
          </span>
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <X className="w-5 h-5 text-slate-600" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pt-32 pb-32 px-4 container max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center shadow-inner">
                <QuestionIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-3xl font-display font-bold text-slate-900 mb-3">
                {currentQuestion.questionText}
              </h1>
              {currentQuestion.helperText && (
                <p className="text-lg text-slate-500">
                  {currentQuestion.helperText}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {(currentQuestion.options as any[]).map((option: any, idx: number) => {
                const value = typeof option === 'string' ? option : option.value;
                const label = typeof option === 'string' ? option : option.label;
                const isSelected = currentQuestion.questionType === 'multi'
                  ? (currentAnswer as string[] || []).includes(value)
                  : currentAnswer === value;

                return (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleSelect(value)}
                    className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left flex items-center justify-between group ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-white bg-white hover:border-blue-200 hover:shadow-lg shadow-sm'
                    }`}
                  >
                    <span className={`font-medium text-lg ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                      {label}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-300 group-hover:border-blue-300'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 pb-8 z-40">
        <div className="container max-w-2xl mx-auto">
          <Button 
            onClick={handleNext}
            disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0) || recommendMutation.isPending}
            className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            {recommendMutation.isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : step === sortedQuestions.length - 1 ? (
              "See Recommendations"
            ) : (
              <span className="flex items-center gap-2">Continue <ChevronRight className="w-5 h-5" /></span>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}
