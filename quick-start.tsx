import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Header from "@/components/header";
import { UKAddressInput } from "@/components/UKAddressInput";
import { CheckCircle, ArrowRight, Home, Zap, Sun, Battery, Thermometer } from "lucide-react";

export default function QuickStart() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const handleAddressSubmit = (submittedAddress: string) => {
    setAddress(submittedAddress);
    setStep(2);
  };

  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
    if (type === "explore") {
      // Run assessment for explorers and go to comprehensive plan
      runAssessment(address);
    } else {
      setStep(3);
    }
  };

  const runAssessment = async (propertyAddress: string) => {
    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: propertyAddress })
      });
      const result = await response.json();
      sessionStorage.setItem('assessmentResult', JSON.stringify(result));
      window.location.href = '/comprehensive-plan';
    } catch (error) {
      console.error('Assessment failed:', error);
      // Fallback to comprehensive plan with address
      window.location.href = `/comprehensive-plan?address=${encodeURIComponent(propertyAddress)}`;
    }
  };

  const handleInterestSelect = (interest: string) => {
    const newInterests = interests.includes(interest) 
      ? interests.filter(i => i !== interest)
      : [...interests, interest];
    setInterests(newInterests);
  };

  const handleProceed = () => {
    // Run assessment with specific interests and go to comprehensive plan
    runAssessmentWithInterests(address, interests);
  };

  const runAssessmentWithInterests = async (propertyAddress: string, userInterests: string[]) => {
    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          address: propertyAddress,
          interests: userInterests // Pass user interests to focus recommendations
        })
      });
      const result = await response.json();
      // Store both assessment and user preferences
      sessionStorage.setItem('assessmentResult', JSON.stringify(result));
      sessionStorage.setItem('userInterests', JSON.stringify(userInterests));
      window.location.href = '/comprehensive-plan';
    } catch (error) {
      console.error('Assessment failed:', error);
      // Fallback to comprehensive plan with data
      sessionStorage.setItem('userInterests', JSON.stringify(userInterests));
      window.location.href = `/comprehensive-plan?address=${encodeURIComponent(propertyAddress)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-energy-green text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > i ? <CheckCircle className="w-5 h-5" /> : i}
                </div>
                {i < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > i ? 'bg-energy-green' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Address Input */}
          {step === 1 && (
            <Card className="border-energy-green/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Home className="w-12 h-12 text-energy-green mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    What's your property address?
                  </h2>
                  <p className="text-gray-600">
                    We'll analyze your property's renewable energy potential
                  </p>
                </div>
                
                <UKAddressInput
                  onAddressSelect={handleAddressSubmit}
                  placeholder="Enter your full address"
                  className="mb-6"
                />
                
                <div className="text-center text-sm text-gray-500">
                  <p>🔒 Your data is secure and only used for energy analysis</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: User Type Selection */}
          {step === 2 && (
            <Card className="border-energy-green/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Zap className="w-12 h-12 text-energy-green mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    How can we help you today?
                  </h2>
                  <p className="text-gray-600">
                    Choose the option that best describes your situation
                  </p>
                </div>
                
                <RadioGroup value={userType} onValueChange={handleUserTypeSelect} className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="explore" id="explore" />
                    <Label htmlFor="explore" className="flex-1 cursor-pointer">
                      <div className="font-medium">Show me what's possible</div>
                      <div className="text-sm text-gray-600">I want to explore all renewable energy options for my property</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="specific" id="specific" />
                    <Label htmlFor="specific" className="flex-1 cursor-pointer">
                      <div className="font-medium">I know what I want</div>
                      <div className="text-sm text-gray-600">I have specific renewable energy solutions in mind</div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Specific Interests */}
          {step === 3 && (
            <Card className="border-energy-green/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    What interests you?
                  </h2>
                  <p className="text-gray-600">
                    Select all renewable energy solutions you'd like to explore
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { id: 'solar', icon: Sun, label: 'Solar Panels', desc: 'Generate clean electricity' },
                    { id: 'battery', icon: Battery, label: 'Battery Storage', desc: 'Store energy for later use' },
                    { id: 'heatpump', icon: Thermometer, label: 'Heat Pump', desc: 'Efficient heating & cooling' },
                    { id: 'ev', icon: Zap, label: 'EV Charger', desc: 'Charge electric vehicles' }
                  ].map(({ id, icon: Icon, label, desc }) => (
                    <div
                      key={id}
                      onClick={() => handleInterestSelect(id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        interests.includes(id)
                          ? 'border-energy-green bg-green-50'
                          : 'border-gray-200 hover:border-energy-green/50'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mb-2 ${
                        interests.includes(id) ? 'text-energy-green' : 'text-gray-600'
                      }`} />
                      <div className="font-medium text-gray-900">{label}</div>
                      <div className="text-sm text-gray-600">{desc}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleProceed}
                    disabled={interests.length === 0}
                    className="bg-energy-green hover:bg-green-600"
                  >
                    Get My Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}