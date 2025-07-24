import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";
import { CheckCircle, Mail, ArrowRight, Clock } from "lucide-react";

export default function EmailConfirmation() {
  const [, setLocation] = useLocation();
  const [countdown, setCountdown] = useState(5);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get user email from quote request result
    const quoteResult = sessionStorage.getItem('quoteRequestResult');
    if (quoteResult) {
      const result = JSON.parse(quoteResult);
      setUserEmail(result.email || "your email");
    }

    // Start countdown to redirect to customer portal
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setLocation('/customer-portal');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setLocation]);

  const handleContinueToPortal = () => {
    setLocation('/customer-portal');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Account Created Successfully! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Welcome to Enerwise! Your renewable energy journey starts now.
            </p>
          </div>

          {/* Email Confirmation Card */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Mail className="w-6 h-6 text-blue-600" />
                Check Your Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 font-medium mb-2">
                  We've sent a confirmation email to:
                </p>
                <p className="text-blue-700 font-semibold text-lg">
                  {userEmail}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Check your inbox</p>
                    <p className="text-gray-600 text-sm">Look for an email from Enerwise (check spam folder too)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Click the confirmation link</p>
                    <p className="text-gray-600 text-sm">This secures your account and activates your portal access</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Access your customer portal</p>
                    <p className="text-gray-600 text-sm">Track your quotes and communicate with installers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auto-redirect notice and manual button */}
          <div className="text-center">
            <div className="bg-green-600 text-white rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Clock className="w-5 h-5" />
                <p className="font-medium">
                  Automatically redirecting to your customer portal in {countdown} seconds...
                </p>
              </div>
              <p className="text-green-100 text-sm">
                You can start exploring your portal while waiting for email confirmation
              </p>
            </div>
            
            <Button
              onClick={handleContinueToPortal}
              size="lg"
              className="bg-energy-green hover:bg-green-600 px-8 py-3 text-lg font-medium"
            >
              Continue to Customer Portal
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-gray-500 text-sm mt-3">
              Don't worry - you can confirm your email anytime from your portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}