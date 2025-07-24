import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import UserAssistancePopup from "@/components/user-assistance-popup";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

import Results from "@/pages/results";
import Education from "@/pages/education";
import Learn from "@/pages/learn";
import HowItWorks from "@/pages/how-it-works";
import Partners from "@/pages/partners";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Solutions from "@/pages/solutions";
import MeetOrla from "@/pages/meet-orla";
import PrivacyPolicy from "@/pages/privacy-policy";
import Terms from "@/pages/terms";
import CookiePolicy from "@/pages/cookie-policy";
import DataProtection from "@/pages/data-protection";
import CookieBanner from "@/components/cookie-banner";
import CustomerPortal from "@/pages/customer-portal";
import InstallerPortal from "@/pages/installer-portal";
import CustomerAuth from "@/pages/customer-auth";
import InstallerAuth from "@/pages/installer-auth";
import DetailedAssessment from "@/pages/detailed-assessment";
import ComprehensivePlan from "@/pages/comprehensive-plan";
import APITest from "@/pages/api-test";
import APIDiagnostics from "@/pages/api-diagnostics";
import QuickStart from "@/pages/quick-start";
import QuoteRequest from "@/pages/quote-request";
import EnergyOptions from "@/pages/energy-options";
import ROIDisclaimer from "@/pages/roi-disclaimer";
import Accessibility from "@/pages/accessibility";
import Pricing from "@/pages/pricing";
import Complaints from "@/pages/complaints";
import EmailConfirmation from "@/pages/email-confirmation";
import VerifyEmail from "@/pages/verify-email";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quick-start" component={QuickStart} />
      <Route path="/energy-options" component={EnergyOptions} />
      <Route path="/quote-request" component={QuoteRequest} />
      <Route path="/email-confirmation" component={EmailConfirmation} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/how-it-works" component={HowItWorks} />

      <Route path="/results" component={Results} />
      <Route path="/education" component={Education} />
      <Route path="/learn" component={Learn} />
      <Route path="/partners" component={Partners} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/meet-orla" component={MeetOrla} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/terms-of-service" component={Terms} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/data-protection" component={DataProtection} />
      <Route path="/customer-portal" component={CustomerPortal} />
      <Route path="/installer-portal" component={InstallerPortal} />
      <Route path="/customer/auth" component={CustomerAuth} />
      <Route path="/installer/auth" component={InstallerAuth} />
      <Route path="/installer-auth" component={InstallerAuth} />
      <Route path="/detailed-assessment" component={DetailedAssessment} />
      <Route path="/comprehensive-plan" component={ComprehensivePlan} />
      <Route path="/api-test" component={APITest} />
      <Route path="/api-diagnostics" component={APIDiagnostics} />
      <Route path="/test-apis" component={APIDiagnostics} />
      <Route path="/roi-disclaimer" component={ROIDisclaimer} />
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/complaints" component={Complaints} />
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
        <CookieBanner />
        <UserAssistancePopup />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
