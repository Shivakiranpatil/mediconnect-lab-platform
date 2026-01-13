import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Beaker, Lock, User } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LabLoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "labadmin",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await apiRequest("POST", "/api/auth/login", data);
      return res.json();
    },
    onSuccess: (user) => {
      if (user.role !== 'lab_admin') {
        toast({
          title: "Access Denied",
          description: "This portal is for lab partners only.",
          variant: "destructive",
        });
        return;
      }
      queryClient.setQueryData(["/api/auth/me"], user);
      setLocation("/lab/dashboard");
      toast({
        title: "Welcome, Lab Partner",
        description: "Successfully logged into the lab management portal.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20 flex justify-center">
        <Card className="w-full max-w-md rounded-[2rem] shadow-2xl border-none">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-600">
              <Beaker className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-display font-bold text-slate-900">Lab Portal</CardTitle>
            <CardDescription className="text-slate-500 font-medium pt-2">
              Management portal for laboratory partners
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit((data) => loginMutation.mutate(data))} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-bold text-slate-700 ml-1">Username</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    {...form.register("username")}
                    id="username"
                    placeholder="labadmin" 
                    className="h-14 pl-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-teal-500 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-bold text-slate-700 ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    {...form.register("password")}
                    id="password"
                    type="password"
                    placeholder="••••••••" 
                    className="h-14 pl-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-teal-500 font-medium"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={loginMutation.isPending}
                className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/25 transition-all text-lg"
              >
                {loginMutation.isPending ? "Signing in..." : "Login to Lab Portal"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
