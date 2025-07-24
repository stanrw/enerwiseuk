import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { UKAddressInput } from "./UKAddressInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Home, ArrowRight, Loader2, HelpCircle, Shield, Eye, Lock, CheckCircle2, PhoneOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  const assessmentMutation = useMutation({
    mutationFn: async (address: string) => {
      const response = await apiRequest("POST", "/api/assessment", { address });
      return response.json();
    },
    onSuccess: (result) => {
      // Store result and navigate to energy options page
      sessionStorage.setItem('assessmentResult', JSON.stringify(result));
      setLocation('/energy-options');
    },
    onError: (error) => {
      toast({
        title: "Assessment Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAddressSelect = (address: string, validated: boolean) => {
    setSelectedAddress(address);
    setIsValidated(validated);
  };

  const handleProceed = () => {
    if (selectedAddress && isValidated) {
      assessmentMutation.mutate(selectedAddress);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-energy-light via-white to-green-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/20 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Main Hero Content */}
        <div className="text-center mb-16 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Professional renewable energy assessment
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Save your pocket,
            <span className="block text-energy-green">and the planet.</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            Get instant renewable energy recommendations tailored to your home.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-energy-green font-semibold mb-8 max-w-3xl mx-auto">
            Find out what you could save now:
          </p>
        </div>

        {/* Enhanced Assessment Form */}
        <div className="space-y-6 sm:space-y-8">
          {/* Modern Form Container */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="space-y-6 sm:space-y-8">
              {/* Address Input */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="address" className="text-sm sm:text-base font-medium text-gray-900 flex items-center gap-2">
                    <Home className="w-4 h-4 text-energy-green" />
                    Property Address
                  </label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-energy-green text-xs flex items-center gap-1 h-auto px-2 py-1">
                        <HelpCircle className="w-3 h-3" />
                        <span>Why do we need your address?</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-energy-green" />
                          Why We Need Your Address
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-blue-600" />
                            What We Analyse
                          </h4>
                          <ul className="space-y-1 text-gray-700 ml-6">
                            <li>• Roof size and orientation for solar panels</li>
                            <li>• Local sunshine levels and weather patterns</li>
                            <li>• Property type for heat pump suitability</li>
                            <li>• Government grants available in your area</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-green-600" />
                            Your Privacy & Security
                          </h4>
                          <ul className="space-y-1 text-gray-700 ml-6">
                            <li>• Your address is used only for energy analysis calculations</li>
                            <li>• We use trusted APIs (Google, UK Government) for property data</li>
                            <li>• Never shared with sales companies or marketers</li>
                            <li>• You control who can contact you about quotes</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-energy-green" />
                            Benefits for You
                          </h4>
                          <ul className="space-y-1 text-gray-700 ml-6">
                            <li>• Accurate savings calculations for your property</li>
                            <li>• Recommendations tailored to your specific roof</li>
                            <li>• Local installer matching in your area</li>
                            <li>• Government incentive information for your postcode</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-green-800 text-xs font-medium">
                            🔒 Your data is safe with us. Full privacy protection guaranteed.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="relative">
                  <UKAddressInput
                    onAddressSelect={handleAddressSelect}
                    placeholder="Enter your full address"
                    className="w-full h-12 sm:h-14 text-sm sm:text-base border-gray-200 rounded-xl focus:border-energy-green focus:ring-energy-green/20 pl-4 pr-4 transition-all duration-200"
                    showValidationIcon={false}
                  />
                </div>
              </div>
              
              {/* Modern CTA Button */}
              <Button 
                onClick={handleProceed}
                disabled={!selectedAddress || !isValidated || assessmentMutation.isPending}
                className="w-full h-14 sm:h-16 bg-gradient-to-r from-energy-green to-green-600 hover:from-energy-dark hover:to-green-700 text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {assessmentMutation.isPending ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analysing Property...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span>Get My Free Renewable Energy Plan</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Modern Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-energy-green" />
              <span className="font-medium">100% Free & Secure</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-energy-green" />
              <span className="font-medium">Results in 30 seconds</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <PhoneOff className="w-4 h-4 text-energy-green" />
              <span className="font-medium">No sales calls</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}