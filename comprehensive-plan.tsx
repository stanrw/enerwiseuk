import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sun, 
  Battery, 
  Thermometer, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Shield,
  Leaf,
  Home,
  Calculator,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import type { AssessmentResult } from "@/lib/types";

export default function ComprehensivePlan() {
  const [, setLocation] = useLocation();
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<string>("all");

  useEffect(() => {
    const storedResult = sessionStorage.getItem('assessmentResult');
    if (storedResult) {
      setAssessmentResult(JSON.parse(storedResult));
    } else {
      setLocation('/');
    }
  }, [setLocation]);

  if (!assessmentResult) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-energy-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your renewable energy plan...</p>
        </div>
      </div>
    );
  }

  const { assessment, enhancedData } = assessmentResult;

  // Check data quality and show appropriate warnings
  const dataQuality = enhancedData?.dataQuality || assessment.dataQuality;
  const isHighConfidence = dataQuality?.confidence >= 67;
  const hasRealData = dataQuality?.dataSources?.some(source => 
    source.includes("EPC") || source.includes("Google Solar") || source.includes("Smart Meter")
  );

  // Calculate totals for all systems
  const totalSavings = parseInt(assessment.totalSavings) || 0;
  const totalCost = parseInt(assessment.totalCost) || 0;
  const paybackYears = parseFloat(assessment.paybackPeriod) || 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-energy-light via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
              <CheckCircle className="w-4 h-4 mr-2" />
              Assessment Complete
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Complete <span className="text-energy-green">Renewable Energy Plan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on your property analysis for <span className="font-semibold text-energy-green">{assessment.address}</span>
            </p>
            
            {/* Data Quality Indicator */}
            {dataQuality && (
              <div className={`mt-6 mx-auto max-w-md rounded-lg p-4 ${
                isHighConfidence 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-amber-50 border border-amber-200'
              }`}>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isHighConfidence ? 'bg-green-500' : 'bg-amber-500'
                  }`}></div>
                  <span className={`text-sm font-semibold ${
                    isHighConfidence ? 'text-green-700' : 'text-amber-700'
                  }`}>
                    {isHighConfidence 
                      ? `${Math.round(dataQuality.confidence)}% Confidence - Real Property Data` 
                      : `${Math.round(dataQuality.confidence)}% Confidence - Limited Data Available`
                    }
                  </span>
                </div>
                {dataQuality.dataSources && (
                  <p className={`text-xs text-center ${
                    isHighConfidence ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    Sources: {dataQuality.dataSources.join(', ')}
                  </p>
                )}
                {dataQuality.warning && (
                  <p className="text-xs text-center text-amber-600 mt-1 font-medium">
                    ⚠️ {dataQuality.warning}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-energy-green/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-energy-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">£{totalSavings.toLocaleString()}</div>
                <div className="text-gray-600">Annual Savings</div>
              </CardContent>
            </Card>
            
            <Card className="border-energy-green/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-energy-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{paybackYears} years</div>
                <div className="text-gray-600">Payback Period</div>
              </CardContent>
            </Card>
            
            <Card className="border-energy-green/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-energy-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{assessment.carbonSavings || 2.5}t</div>
                <div className="text-gray-600">CO₂ Saved/Year</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Action Buttons - Get Quote */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-energy-green to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Get personalised quotes from trusted MCS-certified installers in your area. 
              Our platform automatically matches you with the best installers for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-energy-green hover:bg-gray-50 px-8 py-3"
                asChild
              >
                <Link href="/quote-request">Get My Quotes</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-3"
                asChild
              >
                <Link href="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Recommendations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="solar" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="solar" className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                Solar Panels
              </TabsTrigger>
              <TabsTrigger value="battery" className="flex items-center gap-2">
                <Battery className="w-4 h-4" />
                Battery Storage
              </TabsTrigger>
              <TabsTrigger value="heatpump" className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                Heat Pump
              </TabsTrigger>
              <TabsTrigger value="ev" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                EV Charger
              </TabsTrigger>
            </TabsList>

            {/* Solar Panel Recommendations */}
            <TabsContent value="solar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-energy-green" />
                    Solar Panel System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Recommended System Size</span>
                        <span className="font-semibold">{assessment.solarRecommendations?.recommendedSize || "4.2kW"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Annual Generation</span>
                        <span className="font-semibold">{assessment.solarRecommendations?.annualGeneration || "3,780kWh"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Installation Cost</span>
                        <span className="font-semibold">£{assessment.solarRecommendations?.estimatedCost?.toLocaleString() || "6,500"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Annual Savings</span>
                        <span className="font-semibold text-energy-green">£{assessment.solarRecommendations?.estimatedSavings?.toLocaleString() || "1,200"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payback Period</span>
                        <span className="font-semibold">{assessment.solarRecommendations?.paybackPeriod || "5.4"} years</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
                        <ul className="space-y-1 text-sm text-green-700">
                          <li>• Reduce electricity bills by up to 70%</li>
                          <li>• Earn money from excess energy export</li>
                          <li>• Increase property value by £10,000+</li>
                          <li>• 25-year manufacturer warranty</li>
                        </ul>
                      </div>
                      <Badge className="bg-energy-green text-white">
                        {assessment.solarRecommendations?.suitabilityScore || 85}% Suitability Score
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Battery Storage Recommendations */}
            <TabsContent value="battery" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="w-5 h-5 text-energy-green" />
                    Battery Storage System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Recommended Capacity</span>
                        <span className="font-semibold">{assessment.batteryRecommendations?.recommendedCapacity || "9.5kWh"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Energy Independence</span>
                        <span className="font-semibold">{assessment.batteryRecommendations?.energyIndependence || "65%"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Installation Cost</span>
                        <span className="font-semibold">£{assessment.batteryRecommendations?.estimatedCost?.toLocaleString() || "7,500"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Annual Savings</span>
                        <span className="font-semibold text-energy-green">£{assessment.batteryRecommendations?.estimatedSavings?.toLocaleString() || "850"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payback Period</span>
                        <span className="font-semibold">{assessment.batteryRecommendations?.paybackPeriod || "8.8"} years</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Key Benefits</h4>
                        <ul className="space-y-1 text-sm text-blue-700">
                          <li>• Store excess solar energy for later use</li>
                          <li>• Backup power during outages</li>
                          <li>• Optimize energy usage patterns</li>
                          <li>• 10-year warranty included</li>
                        </ul>
                      </div>
                      <Badge className="bg-blue-600 text-white">
                        {assessment.batteryRecommendations?.suitabilityScore || 78}% Suitability Score
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Heat Pump Recommendations */}
            <TabsContent value="heatpump" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-energy-green" />
                    Heat Pump System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Recommended Type</span>
                        <span className="font-semibold">{assessment.heatPumpRecommendations?.recommendedType || "Air Source"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">System Capacity</span>
                        <span className="font-semibold">{assessment.heatPumpRecommendations?.capacity || "10kW"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Installation Cost</span>
                        <span className="font-semibold">£{assessment.heatPumpRecommendations?.estimatedCost?.toLocaleString() || "12,000"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Annual Savings</span>
                        <span className="font-semibold text-energy-green">£{assessment.heatPumpRecommendations?.estimatedSavings?.toLocaleString() || "1,400"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payback Period</span>
                        <span className="font-semibold">{assessment.heatPumpRecommendations?.paybackPeriod || "8.5"} years</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">Key Benefits</h4>
                        <ul className="space-y-1 text-sm text-orange-700">
                          <li>• Up to 400% efficiency vs gas boilers</li>
                          <li>• Eligible for £5,000 BUS grant</li>
                          <li>• Reduces carbon footprint by 75%</li>
                          <li>• 7-year manufacturer warranty</li>
                        </ul>
                      </div>
                      <Badge className="bg-orange-600 text-white">
                        {assessment.heatPumpRecommendations?.suitabilityScore || 72}% Suitability Score
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* EV Charger Recommendations */}
            <TabsContent value="ev" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-energy-green" />
                    EV Charger Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Recommended Type</span>
                        <span className="font-semibold">{assessment.evChargerRecommendations?.recommendedType || "7kW Smart Charger"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Charging Speed</span>
                        <span className="font-semibold">{"25 miles per hour"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Installation Cost</span>
                        <span className="font-semibold">£{assessment.evChargerRecommendations?.estimatedCost?.toLocaleString() || "1,200"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Annual Savings</span>
                        <span className="font-semibold text-energy-green">£{assessment.evChargerRecommendations?.estimatedSavings?.toLocaleString() || "800"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Grant Available</span>
                        <span className="font-semibold text-energy-green">£350 OZEV Grant</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Key Benefits</h4>
                        <ul className="space-y-1 text-sm text-purple-700">
                          <li>• Charge at home convenience</li>
                          <li>• Smart scheduling with solar power</li>
                          <li>• 80% cheaper than public charging</li>
                          <li>• 3-year warranty included</li>
                        </ul>
                      </div>
                      <Badge className="bg-purple-600 text-white">
                        {assessment.evChargerRecommendations?.suitabilityScore || 92}% Suitability Score
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Get Quotes CTA */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-energy-green to-green-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Your Renewable Energy Journey?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Get competitive quotes from MCS-certified installers in your area
                </p>
                <Button 
                  onClick={() => setLocation('/customer-portal')}
                  className="bg-white text-energy-green hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                >
                  Get Personalised Quotes
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}