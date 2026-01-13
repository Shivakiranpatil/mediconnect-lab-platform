import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import AuthPage from "@/pages/AuthPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import LabLoginPage from "@/pages/LabLoginPage";
import AIDiscoveryPage from "@/pages/AIDiscoveryPage";
import AIResultsPage from "@/pages/AIResultsPage";
import BundleDetailsPage from "@/pages/BundleDetailsPage";
import LabsPage from "@/pages/LabsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin" component={AdminLoginPage} />
      <Route path="/lab" component={LabLoginPage} />
      <Route path="/ai-discovery" component={AIDiscoveryPage} />
      <Route path="/ai-results" component={AIResultsPage} />
      <Route path="/tests" component={HomePage} /> {/* Reuse Home for now */}
      <Route path="/bundles/:id" component={BundleDetailsPage} />
      <Route path="/labs" component={LabsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
