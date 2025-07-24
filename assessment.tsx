import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AddressForm from "@/components/address-form";
import { UKAddressInput } from "@/components/UKAddressInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Assessment() {
  const [, setLocation] = useLocation();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  const handleAddressSelect = (address: string, validated: boolean) => {
    setSelectedAddress(address);
    setIsValidated(validated);
  };

  const handleProceed = () => {
    if (selectedAddress && isValidated) {
      // Create assessment result with the selected address
      const result = {
        address: selectedAddress,
        timestamp: new Date().toISOString(),
        validated: true
      };
      sessionStorage.setItem('assessmentResult', JSON.stringify(result));
      setLocation('/detailed-assessment');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-energy-light to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Your Renewable Energy Assessment
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter your UK property address to receive instant recommendations for solar panels, 
              battery storage, heat pumps, and EV chargers tailored to your home.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Property Assessment</CardTitle>
              <p className="text-center text-gray-600">
                Start with your exact UK address for the most accurate assessment
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <UKAddressInput 
                onAddressSelect={handleAddressSelect}
                placeholder="Enter your full UK address..."
              />
              
              {selectedAddress && isValidated && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Selected Property:</h3>
                    <p className="text-green-800">{selectedAddress}</p>
                  </div>
                  
                  <button
                    onClick={handleProceed}
                    className="w-full bg-energy-green text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    Start Professional Assessment
                  </button>
                </div>
              )}

              {selectedAddress && !isValidated && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    Please ensure your address includes a house number and postcode for the most accurate solar analysis.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-energy-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-white"></i>
                </div>
                <h3 className="font-semibold mb-2">100% Free</h3>
                <p className="text-gray-600 text-sm">No hidden costs or commitments</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-energy-amber rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-clock text-white"></i>
                </div>
                <h3 className="font-semibold mb-2">Instant Results</h3>
                <p className="text-gray-600 text-sm">Get your assessment in seconds</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-user-shield text-white"></i>
                </div>
                <h3 className="font-semibold mb-2">Privacy Protected</h3>
                <p className="text-gray-600 text-sm">Your data is secure and private</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
