import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyAssessmentSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { PropertyAssessmentInput } from "@shared/schema";
import { MapPin, Zap, ArrowRight, Loader2, Shield, Clock, PhoneOff, HelpCircle, Lock, Eye, CheckCircle2 } from "lucide-react";

interface AddressFormProps {
  onSuccess?: (result: any) => void;
}

export default function AddressForm({ onSuccess }: AddressFormProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<PropertyAssessmentInput>({
    resolver: zodResolver(propertyAssessmentSchema),
    defaultValues: {
      address: "",
    },
  });

  const assessmentMutation = useMutation({
    mutationFn: async (data: PropertyAssessmentInput) => {
      const response = await apiRequest("POST", "/api/assessment", data);
      return response.json();
    },
    onSuccess: (result) => {
      if (onSuccess) {
        onSuccess(result);
      } else {
        // Store result and navigate to energy options page
        sessionStorage.setItem('assessmentResult', JSON.stringify(result));
        setLocation('/energy-options');
      }
    },
    onError: (error) => {
      toast({
        title: "Assessment Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PropertyAssessmentInput) => {
    assessmentMutation.mutate(data);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Modern Form Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {/* Address Input */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="address" className="text-sm sm:text-base font-medium text-gray-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-energy-green" />
                Property Address
              </Label>
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
                        <li>• We never share your address with third parties</li>
                        <li>• Used only for accurate renewable energy calculations</li>
                        <li>• Secure encryption protects all your data</li>
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
                        🔒 Your data is safe with us. Secure and confidential.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative">
              <Input
                {...form.register("address")}
                id="address"
                placeholder="Enter your full address"
                className="w-full h-12 sm:h-14 text-sm sm:text-base border-gray-200 rounded-xl focus:border-energy-green focus:ring-energy-green/20 pl-4 pr-4 transition-all duration-200"
              />
            </div>
            {form.formState.errors.address && (
              <p className="text-red-500 text-sm mt-2">{form.formState.errors.address.message}</p>
            )}
          </div>
          
          {/* Modern CTA Button */}
          <Button 
            type="submit"
            disabled={assessmentMutation.isPending}
            className="w-full h-14 sm:h-16 bg-gradient-to-r from-energy-green to-green-600 hover:from-energy-dark hover:to-green-700 text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100"
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
        </form>
      </div>

      {/* Modern Trust Badges */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-energy-green" />
          <span className="font-medium">100% Free & Secure</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-energy-green" />
          <span className="font-medium">Results in 30 seconds</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <PhoneOff className="w-4 h-4 text-energy-green" />
          <span className="font-medium">No sales calls</span>
        </div>
      </div>
    </div>
  );
}
