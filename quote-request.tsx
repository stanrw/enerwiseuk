import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import { CheckCircle, ArrowRight, Calendar, DollarSign, Users, Zap, Mail, MessageSquare, Shield } from "lucide-react";
import { z } from "zod";

const quoteRequestSchema = z.object({
  // Contact Information
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"), 
  email: z.string().email("Valid email required"),

  
  // Project Details - systems come from previous selection
  systems: z.array(z.string()).optional(),
  budgetComfortable: z.string().min(1, "Budget comfort level required"),
  financingInterest: z.string().optional(),
  systemAdjustment: z.string().optional(),
  timeline: z.string().min(1, "Timeline required"),
  priority: z.string().min(1, "Priority required"),
  
  // Contact Preferences
  contactMethods: z.array(z.string()).min(1, "Select at least one contact method"),

  additionalNotes: z.string().optional(),
  
  // Privacy
  marketingConsent: z.boolean(),
  termsAccepted: z.boolean().refine(val => val === true, "Must accept terms")
});

type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export default function QuoteRequest() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [combinedSavings, setCombinedSavings] = useState<any>(null);

  useEffect(() => {
    // Load assessment data and selected systems from session storage
    const saved = sessionStorage.getItem('assessmentResult');
    const systems = sessionStorage.getItem('selectedSystems');
    const savings = sessionStorage.getItem('combinedSavings');
    
    if (saved) {
      setAssessmentData(JSON.parse(saved));
    }
    if (systems) {
      setSelectedSystems(JSON.parse(systems));
    }
    if (savings) {
      setCombinedSavings(JSON.parse(savings));
    }
  }, []);

  const form = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",

      systems: [],
      budgetComfortable: "",
      financingInterest: "",
      systemAdjustment: "",
      timeline: "",
      priority: "",
      contactMethods: [],

      additionalNotes: "",
      marketingConsent: false,
      termsAccepted: false
    }
  });

  // Update form systems when selectedSystems changes
  useEffect(() => {
    if (selectedSystems.length > 0) {
      form.setValue('systems', selectedSystems);
    }
  }, [selectedSystems, form]);

  const quoteRequestMutation = useMutation({
    mutationFn: async (data: QuoteRequestInput) => {
      const response = await apiRequest("POST", "/api/quote-request", {
        ...data,
        assessmentId: assessmentData?.assessment?.id,
        address: assessmentData?.assessment?.address || assessmentData?.property?.address || assessmentData?.address || "Property address from assessment"
      });
      return response.json();
    },
    onSuccess: (result) => {
      toast({
        title: "Quote Request Submitted!",
        description: "We're matching you with the best installers in your area.",
      });
      // Store result and navigate to email confirmation
      const resultWithEmail = { ...result, email: form.getValues('email') };
      sessionStorage.setItem('quoteRequestResult', JSON.stringify(resultWithEmail));
      setLocation('/email-confirmation');
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuoteRequestInput) => {
    console.log('Assessment data:', assessmentData);
    console.log('Selected systems:', selectedSystems);
    
    // Include selected systems from previous page
    const formData = {
      ...data,
      systems: selectedSystems
    };
    quoteRequestMutation.mutate(formData);
  };



  const budgetComfortOptions = [
    "Yes, this budget works perfectly for me",
    "It's a stretch but manageable if I can spread the cost",
    "Too expensive - I'd like to explore smaller systems",
    "Too expensive - I need financing options",
    "I'd prefer to see alternative solutions"
  ];

  const financingOptions = [
    "0% APR finance (if available)",
    "Low-rate finance options",
    "Government grants and schemes",
    "Lease/PPA arrangements",
    "Not interested in financing"
  ];

  const systemAdjustmentOptions = [
    "Keep the full system as recommended",
    "Start with solar panels only, add batteries later",
    "Reduce the number of solar panels",
    "Focus on the most cost-effective options only",
    "Let installers suggest the best value approach"
  ];

  const timelineOptions = [
    "As soon as possible",
    "Within 3 months",
    "3-6 months",
    "6-12 months",
    "Just exploring options"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4 mr-2" />
              Perfect! Your energy plan is ready
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Let's Get You <span className="text-energy-green">Connected</span>
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-6">
              Brilliant news! We've found amazing MCS-certified installers near you who are excited to help. 
              Just share a few details and we'll have them compete for your business with the best prices.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                No obligation quotes
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                MCS-certified installers only
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Free to compare
              </div>
            </div>
          </div>

          {/* Selected Plan Summary */}
          {combinedSavings && (
            <Card className="border-energy-green/20 mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-center">Your Selected Energy Plan</h3>
                <div className="grid md:grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-2xl font-bold text-energy-green">
                      £{combinedSavings.cost.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Investment</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-energy-green">
                      £{combinedSavings.savings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Annual Savings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-energy-green">
                      {combinedSavings.payback.toFixed(1)} years
                    </div>
                    <div className="text-sm text-gray-600">Payback Period</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Selected Systems:</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedSystems.map(system => (
                      <span key={system} className="bg-energy-green/10 text-energy-green px-3 py-1 rounded-full text-sm capitalize">
                        {system === 'heatpump' ? 'Heat Pump' : system === 'ev' ? 'EV Charger' : system}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Contact Information */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="w-6 h-6 text-energy-green" />
                  How can installers reach you?
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Just the basics so trusted installers can send you quotes and arrange site visits.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-800 font-medium">What's your first name?</Label>
                    <Input
                      {...form.register("firstName")}
                      id="firstName"
                      placeholder="e.g. Sarah"
                      className="mt-2 border-green-200 focus:border-green-400 focus:ring-green-200"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-800 font-medium">And your last name?</Label>
                    <Input
                      {...form.register("lastName")}
                      id="lastName"
                      placeholder="e.g. Johnson"
                      className="mt-2 border-green-200 focus:border-green-400 focus:ring-green-200"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-800 font-medium">Email for quotes and updates</Label>
                    <Input
                      {...form.register("email")}
                      id="email"
                      type="email"
                      placeholder="e.g. sarah.johnson@gmail.com"
                      className="mt-2 border-green-200 focus:border-green-400 focus:ring-green-200"
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll email you quotes and important updates</p>
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* Project Preferences */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="w-6 h-6 text-blue-600" />
                  Tell us about your project
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Help installers understand exactly what you're looking for so they can give you the most accurate quotes.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                


                {/* Budget Comfort Level */}
                {combinedSavings && (
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-xl mb-6 border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Here's what your plan looks like financially:
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-white/60 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-700">£{combinedSavings.cost.toLocaleString()}</div>
                        <div className="text-sm text-gray-700">Investment needed</div>
                      </div>
                      <div className="text-center bg-white/60 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-700">£{combinedSavings.savings.toLocaleString()}</div>
                        <div className="text-sm text-gray-700">You'll save annually</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 text-center">
                      💡 Financing options can make renewable energy investments very affordable
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="budgetComfortable" className="text-gray-800 font-medium text-lg">How does this investment feel to you?</Label>
                  <p className="text-sm text-gray-600 mb-3">Be honest - installers can adjust their quotes to match your situation</p>
                  <Select onValueChange={(value) => form.setValue("budgetComfortable", value)}>
                    <SelectTrigger className="mt-2 border-blue-200 focus:border-blue-400 focus:ring-blue-200">
                      <SelectValue placeholder="Tell us how you feel about the estimated investment" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetComfortOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.budgetComfortable && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.budgetComfortable.message}</p>
                  )}
                </div>

                {/* Financing Interest */}
                <div>
                  <Label htmlFor="financingInterest">Financing Options (optional)</Label>
                  <Select onValueChange={(value) => form.setValue("financingInterest", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select financing options you'd like to explore" />
                    </SelectTrigger>
                    <SelectContent>
                      {financingOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 mt-1">
                    Many installers offer 0% APR finance and government grants are available
                  </p>
                </div>

                {/* System Adjustment */}
                <div>
                  <Label htmlFor="systemAdjustment">System Preferences (optional)</Label>
                  <Select onValueChange={(value) => form.setValue("systemAdjustment", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Would you like to adjust the recommended system?" />
                    </SelectTrigger>
                    <SelectContent>
                      {systemAdjustmentOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 mt-1">
                    Installers can customise systems to match your budget and priorities
                  </p>
                </div>

                {/* Timeline */}
                <div>
                  <Label htmlFor="timeline">Project Timeline *</Label>
                  <Select onValueChange={(value) => form.setValue("timeline", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="When would you like to start?" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelineOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.timeline && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.timeline.message}</p>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <Label className="text-base font-medium">What's most important to you? *</Label>
                  <RadioGroup
                    onValueChange={(value) => form.setValue("priority", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cost" id="cost" />
                      <Label htmlFor="cost">Best price</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quality" id="quality" />
                      <Label htmlFor="quality">Highest quality installation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="speed" id="speed" />
                      <Label htmlFor="speed">Fastest installation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="service" id="service" />
                      <Label htmlFor="service">Best customer service</Label>
                    </div>
                  </RadioGroup>
                  {form.formState.errors.priority && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.priority.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-energy-green" />
                  Contact Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div>
                  <Label className="text-base font-medium">How would you like installers to contact you? *</Label>
                  <div className="space-y-2 mt-2">
                    {[
                      { id: 'email', label: 'Email', icon: Mail },

                      { id: 'portal', label: 'Through Enerwise portal only', icon: MessageSquare }
                    ].map(method => (
                      <div key={method.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={method.id}
                          onCheckedChange={(checked) => {
                            const current = form.getValues("contactMethods");
                            if (checked) {
                              form.setValue("contactMethods", [...current, method.id]);
                            } else {
                              form.setValue("contactMethods", current.filter(m => m !== method.id));
                            }
                          }}
                        />
                        <method.icon className="w-4 h-4 text-gray-600" />
                        <Label htmlFor={method.id}>{method.label}</Label>
                      </div>
                    ))}
                  </div>
                  {form.formState.errors.contactMethods && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.contactMethods.message}</p>
                  )}
                </div>



                <div>
                  <Label htmlFor="additionalNotes">Additional Notes (optional)</Label>
                  <Textarea
                    {...form.register("additionalNotes")}
                    id="additionalNotes"
                    placeholder="Any specific requirements or questions..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Terms */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Shield className="w-6 h-6 text-purple-600" />
                  Just a couple of quick confirmations
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  We take your privacy seriously and only share your details with trusted, MCS-certified installers.
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketingConsent"
                    onCheckedChange={(checked) => form.setValue("marketingConsent", !!checked)}
                    className="border-purple-300 data-[state=checked]:bg-purple-600"
                  />
                  <Label htmlFor="marketingConsent" className="text-sm text-gray-700 leading-relaxed">
                    Yes, I'd love occasional updates about renewable energy tips and money-saving opportunities 
                    <span className="text-purple-600 font-medium"> (completely optional)</span>
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="termsAccepted"
                    onCheckedChange={(checked) => form.setValue("termsAccepted", !!checked)}
                    className="border-purple-300 data-[state=checked]:bg-purple-600"
                  />
                  <Label htmlFor="termsAccepted" className="text-sm text-gray-700 leading-relaxed">
                    I'm happy for Enerwise to connect me with trusted installers and I've read the{" "}
                    <Link href="/terms-of-service" className="text-purple-600 hover:underline font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-purple-600 hover:underline font-medium">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {form.formState.errors.termsAccepted && (
                  <p className="text-red-500 text-sm">{form.formState.errors.termsAccepted.message}</p>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="text-center bg-gradient-to-r from-green-500 to-green-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">🎉 You're almost there!</h3>
              <p className="text-green-100 mb-6 max-w-md mx-auto">
                Hit the button below and we'll instantly connect you with the best installers in your area. 
                They're ready to compete for your business!
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={quoteRequestMutation.isPending}
                className="bg-white text-green-700 hover:bg-gray-50 font-bold px-12 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {quoteRequestMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-700 mr-2"></div>
                    Connecting you with installers...
                  </>
                ) : (
                  <>
                    Get My Free Quotes Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
              <div className="mt-6 space-y-2">
                <p className="text-green-100 text-sm font-medium">
                  ✅ Quotes within 24 hours  ✅ No obligation  ✅ 100% free service
                </p>
                <p className="text-green-200 text-xs">
                  Start your renewable energy journey with professional guidance
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}