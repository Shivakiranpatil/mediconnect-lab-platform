import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLogin, useRegister } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, ArrowLeft, Heart, Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  name: z.string().optional(),
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const form = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        await loginMutation.mutateAsync(data);
      } else {
        await registerMutation.mutateAsync(data);
      }
      navigate("/");
      toast({
        title: "Success",
        description: isLogin ? "Welcome back!" : "Account created successfully!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  const features = [
    { icon: Heart, text: "AI-Powered Test Matching" },
    { icon: Shield, text: "Secure & Confidential" },
    { icon: Clock, text: "Results in 24-48 Hours" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden" data-testid="auth-page">
      {/* Background decorative waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="authGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z" fill="url(#authGrad1)" />
          <path d="M0,200 Q300,150 600,200 T1200,200 L1200,0 L0,0 Z" fill="url(#authGrad1)" opacity="0.5" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-100/30 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Back button */}
        <div className="px-4 sm:px-6 py-4">
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium text-sm">Back to Home</span>
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 pb-8">
          <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Side - Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:flex flex-col justify-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/25">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Smart Lab Tests, <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Just for You
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Join thousands of users who trust MediConnect for their lab testing needs in Dubai.
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-700">{feature.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div 
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center"
            >
              <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="text-center mb-8">
                  <div className="lg:hidden w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm">
                    {isLogin ? "Enter your credentials to access your account" : "Sign up to start your health journey"}
                  </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-700">Username</Label>
                      <Input 
                        {...form.register("username")} 
                        id="username" 
                        placeholder="johndoe" 
                        className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        data-testid="input-username"
                      />
                      {form.formState.errors.username && (
                        <p className="text-sm text-red-500">{String(form.formState.errors.username.message)}</p>
                      )}
                    </div>
                    
                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">Full Name (Optional)</Label>
                        <Input 
                          {...form.register("name")} 
                          id="name" 
                          placeholder="John Doe" 
                          className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          data-testid="input-name"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700">Password</Label>
                      <Input 
                        {...form.register("password")} 
                        id="password" 
                        type="password" 
                        className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        data-testid="input-password"
                      />
                      {form.formState.errors.password && (
                        <p className="text-sm text-red-500">{String(form.formState.errors.password.message)}</p>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    disabled={isLoading}
                    data-testid="button-submit"
                  >
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      form.reset();
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                    data-testid="button-toggle-auth"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
