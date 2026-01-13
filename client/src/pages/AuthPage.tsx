import { useState } from "react";
import { useLocation } from "wouter";
import { useLogin, useRegister } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
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

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-display font-bold mb-6">Your Health,<br/>Simplified.</h1>
          <p className="text-xl text-blue-50 max-w-md leading-relaxed">
            Join thousands of users who trust MediConnect for their lab testing needs. AI-powered, convenient, and secure.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8">
        <motion.div 
          key={isLogin ? 'login' : 'register'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">{isLogin ? "Welcome Back" : "Create Account"}</h2>
            <p className="text-slate-500 mt-2">
              {isLogin ? "Enter your credentials to access your account" : "Sign up to start your health journey"}
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input {...form.register("username")} id="username" placeholder="johndoe" className="h-12 rounded-xl" />
                {form.formState.errors.username && (
                  <p className="text-sm text-red-500">{String(form.formState.errors.username.message)}</p>
                )}
              </div>
              
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name (Optional)</Label>
                  <Input {...form.register("name")} id="name" placeholder="John Doe" className="h-12 rounded-xl" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input {...form.register("password")} id="password" type="password" className="h-12 rounded-xl" />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">{String(form.formState.errors.password.message)}</p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                form.reset();
              }}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
