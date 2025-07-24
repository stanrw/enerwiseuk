import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Sun, 
  Battery, 
  Thermometer, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Info,
  CheckCircle2,
  Plus,
  Calculator,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
  Leaf,
  Home,
  Activity,
  HelpCircle,
  Lock,
  Shield,
  Eye,
  Calendar,
  CreditCard,
  Award,
  Receipt,
  Banknote,
  Gift,
  BarChart3
} from "lucide-react";

export default function EnergyOptions() {
  const [, setLocation] = useLocation();
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [buttonPosition, setButtonPosition] = useState({ bottom: 24 });
  const [smartMeterNumber, setSmartMeterNumber] = useState("");
  const [showSmartMeterInput, setShowSmartMeterInput] = useState(false);
  const [recalculating, setRecalculating] = useState(false);
  const [expandedSystem, setExpandedSystem] = useState<string | null>(null);

  useEffect(() => {
    const result = sessionStorage.getItem('assessmentResult');
    if (result) {
      setAssessmentResult(JSON.parse(result));
    } else {
      setLocation('/');
    }
  }, [setLocation]);

  // Handle footer boundary detection for floating button
  useEffect(() => {
    if (selectedSystems.length === 0) return;

    let animationId: number;
    
    const updateButtonPosition = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const buttonHeight = 72;
      const safetyGap = 45; // Minimal gap for maximum accessibility
      const normalPosition = 24;
      const screenHeight = window.innerHeight;
      
      // Calculate how much of the footer is visible from the bottom
      const footerVisibleHeight = Math.max(0, screenHeight - footerRect.top);
      
      // Only adjust position when footer starts becoming visible
      if (footerVisibleHeight > 0) {
        // Calculate required bottom position to maintain safe distance
        const requiredPosition = footerVisibleHeight + safetyGap;
        setButtonPosition({ bottom: Math.max(normalPosition, requiredPosition) });
      } else {
        // Footer not visible, use normal position
        setButtonPosition({ bottom: normalPosition });
      }
    };

    const handleScroll = () => {
      if (animationId) cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(updateButtonPosition);
    };

    // Initial position
    updateButtonPosition();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [selectedSystems.length]);

  if (!assessmentResult) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-energy-green mx-auto mb-4"></div>
          <p className="text-gray-800 font-medium">Analysing your property...</p>
        </div>
      </div>
    );
  }

  const { assessment } = assessmentResult;

  const systemOptions = [
    {
      id: 'solar',
      name: 'Solar Panels',
      icon: Sun,
      description: 'Generate clean electricity from sunlight',
      cost: assessment.solarRecommendation?.cost || 0,
      savings: assessment.solarRecommendation?.annualSavings || 0,
      payback: assessment.solarRecommendation?.paybackPeriod || 0,
      explanation: 'Solar panels convert sunlight into electricity for your home. Any excess energy can be sold back to the grid for income.',
      recommended: assessment.solarRecommendation?.recommended || false,
      benefits: [
        'Reduce electricity bills by 50-90%',
        'Earn money from excess energy sold to grid',
        'Increase property value by £14,000+',
        '25-year manufacturer warranty'
      ],
      details: {
        panels: `${assessment.solarRecommendation?.specifications?.panelCount || 8} high-efficiency panels`,
        capacity: `${assessment.solarRecommendation?.specifications?.capacity || '4.0 kWp'} system`,
        generation: `${assessment.solarRecommendation?.specifications?.annualGeneration || '3,658 kWh'} per year`,
        warranty: '25 years performance, 12 years product',
        installation: `${Math.ceil((assessment.solarRecommendation?.specifications?.panelCount || 8) / 4)} day installation`
      },
      environmentalImpact: {
        co2Saved: assessment.solarRecommendation?.carbonSavings || 841,
        treesEquivalent: Math.round((assessment.solarRecommendation?.carbonSavings || 841) / 20)
      }
    },
    {
      id: 'battery',
      name: 'Battery Storage',
      icon: Battery,
      description: 'Store energy for when you need it most',
      cost: assessment.batteryRecommendation?.cost || 0,
      savings: assessment.batteryRecommendation?.annualSavings || 0,
      payback: assessment.batteryRecommendation?.paybackPeriod || 0,
      explanation: 'Battery storage saves your solar energy for evening use and provides backup power during outages.',
      recommended: assessment.batteryRecommendation?.recommended || false,
      benefits: [
        'Use solar energy even after sunset',
        'Backup power during outages',
        'Reduce grid dependency by 85%',
        'Time-of-use tariff optimization'
      ],
      details: {
        batteries: `${assessment.batteryRecommendation?.specifications?.batteryCount || 1} battery unit`,
        capacity: `${assessment.batteryRecommendation?.specifications?.capacity || '10 kWh'} storage`,
        efficiency: `${assessment.batteryRecommendation?.specifications?.efficiency || '95%'} round-trip efficiency`,
        cycles: `${assessment.batteryRecommendation?.specifications?.cycles || '6,000+'} charge cycles`,
        warranty: `${assessment.batteryRecommendation?.specifications?.warranty || '10 years'} warranty`
      },
      environmentalImpact: {
        co2Saved: assessment.batteryRecommendation?.carbonSavings || 2760,
        treesEquivalent: Math.round((assessment.batteryRecommendation?.carbonSavings || 2760) / 20)
      }
    },
    {
      id: 'heatpump',
      name: 'Heat Pump',
      icon: Thermometer,
      description: 'Efficient heating and cooling system',
      cost: assessment.heatPumpRecommendation?.cost || 0,
      savings: assessment.heatPumpRecommendation?.annualSavings || 0,
      payback: assessment.heatPumpRecommendation?.paybackPeriod || 0,
      explanation: 'Heat pumps extract heat from outside air to warm your home - 3x more efficient than gas boilers.',
      recommended: assessment.heatPumpRecommendation?.recommended || false,
      benefits: [
        '300% more efficient than gas boilers',
        'Provides both heating and cooling',
        'Up to £7,500 government grant available',
        'No gas safety checks required'
      ],
      details: {
        system: `${assessment.heatPumpRecommendation?.specifications?.type || 'Air Source Heat Pump'}`,
        capacity: `${assessment.heatPumpRecommendation?.specifications?.capacity || '10.164 kW'} heating capacity`,
        efficiency: `${assessment.heatPumpRecommendation?.specifications?.efficiency || 'COP 3.8'} efficiency rating`,
        installation: `${assessment.heatPumpRecommendation?.specifications?.installationDays || '2-3'} day installation`,
        warranty: `${assessment.heatPumpRecommendation?.specifications?.warranty || '7 years'} full warranty`
      },
      environmentalImpact: {
        co2Saved: assessment.heatPumpRecommendation?.carbonSavings || 6422,
        treesEquivalent: Math.round((assessment.heatPumpRecommendation?.carbonSavings || 6422) / 20)
      }
    },
    {
      id: 'ev',
      name: 'EV Charger',
      icon: Zap,
      description: 'Fast, convenient home charging',
      cost: assessment.evChargerRecommendation?.cost || 0,
      savings: assessment.evChargerRecommendation?.annualSavings || 0,
      payback: assessment.evChargerRecommendation?.paybackPeriod || 0,
      explanation: 'Home EV charging costs 70% less than public charging and can use your solar energy.',
      recommended: assessment.evChargerRecommendation?.recommended || false,
      benefits: [
        'Charge overnight at low rates',
        '70% cheaper than public charging',
        'Smart scheduling with solar panels',
        'Government grants up to £350 available'
      ],
      details: {
        charger: `${assessment.evChargerRecommendation?.specifications?.chargerType || '1 x Smart EV Charger'}`,
        power: `${assessment.evChargerRecommendation?.specifications?.power || '7.4kW (32A)'} charging speed`,
        connector: `${assessment.evChargerRecommendation?.specifications?.connector || 'Type 2 Universal'} connector`,
        features: `${assessment.evChargerRecommendation?.specifications?.smartFeatures || 'App control, scheduling'}`,
        installation: `${assessment.evChargerRecommendation?.specifications?.installationTime || 'Half day'} installation`
      },
      environmentalImpact: {
        co2Saved: assessment.evChargerRecommendation?.carbonSavings || 1200,
        treesEquivalent: Math.round((assessment.evChargerRecommendation?.carbonSavings || 1200) / 20)
      }
    }
  ];

  const handleSystemToggle = (systemId: string) => {
    setSelectedSystems(prev => 
      prev.includes(systemId) 
        ? prev.filter(id => id !== systemId)
        : [...prev, systemId]
    );
  };

  const calculateCombinedSavings = () => {
    if (selectedSystems.length === 0) return { cost: 0, savings: 0, payback: 0 };
    
    const selectedOptions = systemOptions.filter(option => selectedSystems.includes(option.id));
    const totalCost = selectedOptions.reduce((sum, option) => sum + (Number(option.cost) || 0), 0);
    const totalSavings = selectedOptions.reduce((sum, option) => sum + (Number(option.savings) || 0), 0);
    const payback = totalSavings > 0 ? Math.round(totalCost / totalSavings * 10) / 10 : 0; // Round to 1 decimal
    
    return { 
      cost: Math.round(totalCost), 
      savings: Math.round(totalSavings), 
      payback: Math.max(0, payback) // Ensure no negative values
    };
  };

  const combinedSavings = calculateCombinedSavings();
  
  console.log('Energy Options Debug:');
  console.log('selectedSystems:', selectedSystems);
  console.log('combinedSavings:', combinedSavings);
  console.log('assessment data:', assessment);

  const handleAddSmartMeter = async () => {
    if (!smartMeterNumber.trim()) return;
    
    setRecalculating(true);
    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          address: assessment.address,
          smartMeterNumber: smartMeterNumber.trim()
        })
      });
      const result = await response.json();
      setAssessmentResult(result);
      sessionStorage.setItem('assessmentResult', JSON.stringify(result));
      setShowSmartMeterInput(false);
      setSmartMeterNumber("");
    } catch (error) {
      console.error('Smart meter update failed:', error);
    } finally {
      setRecalculating(false);
    }
  };

  const handleSubmitPlan = () => {
    if (selectedSystems.length === 0) return;
    
    // Store selected systems and navigate to quote request
    sessionStorage.setItem('selectedSystems', JSON.stringify(selectedSystems));
    sessionStorage.setItem('combinedSavings', JSON.stringify(combinedSavings));
    setLocation('/quote-request');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-energy-light via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Property Analysed
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-energy-green">Energy Solutions</span>
          </h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8 font-medium">
            Select the options that interest you for <span className="font-semibold text-energy-green">{assessment.address}</span>
          </p>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-800">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  <span className="font-medium text-sm sm:text-base">{assessment.property?.address || assessment.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  <span className="text-sm sm:text-base">{assessment.property?.propertyType || 'Semi-detached house'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm sm:text-base">EPC Rating: {assessment.property?.epcRating || 'D'}</span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-sm text-gray-600">Overall Suitability</div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">
                  {(() => {
                    const solar = assessment.solarRecommendation?.suitabilityScore || 75;
                    const battery = assessment.batteryRecommendation?.suitabilityScore || 70;
                    const heatPump = assessment.heatPumpRecommendation?.suitabilityScore || 65;
                    const evCharger = assessment.evChargerRecommendation?.suitabilityScore || 80;
                    const average = (solar + battery + heatPump + evCharger) / 4;
                    return Math.round(average);
                  })()}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Annual Savings */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 sm:p-5 border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm sm:text-base font-medium text-gray-900">Total Annual Savings</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  £{selectedSystems.length > 0 ? Math.round(combinedSavings.savings || 0).toLocaleString() : '2,000'}
                </div>
                <div className="text-xs sm:text-sm text-gray-700">
                  Up to £{selectedSystems.length > 0 ? Math.round((combinedSavings.savings || 0) * 25).toLocaleString() : '50,000'} over 25 years
                </div>
              </div>

              {/* CO2 Reduction */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-5 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="w-5 h-5 text-blue-600" />
                  <span className="text-sm sm:text-base font-medium text-gray-900">CO₂ Reduction</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {(() => {
                    if (selectedSystems.length === 0) return '8.6';
                    const totalCO2 = systemOptions
                      .filter(s => selectedSystems.includes(s.id))
                      .reduce((sum, s) => sum + (s.environmentalImpact?.co2Saved || 0), 0);
                    return (totalCO2 / 1000).toFixed(1);
                  })()}t
                </div>
                <div className="text-xs sm:text-sm text-gray-700">
                  Per year - equivalent to {(() => {
                    if (selectedSystems.length === 0) return '191';
                    const totalCO2 = systemOptions
                      .filter(s => selectedSystems.includes(s.id))
                      .reduce((sum, s) => sum + (s.environmentalImpact?.co2Saved || 0), 0);
                    return Math.round(totalCO2 / 45);
                  })()} trees
                </div>
              </div>

              {/* EPC Improvement */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 sm:p-5 border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="text-sm sm:text-base font-medium text-gray-900">EPC Improvement</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {assessment.property?.epcRating || 'D'} → {
                    selectedSystems.includes('solar') && selectedSystems.includes('heatpump') ? 'A+' : 
                    selectedSystems.includes('solar') || selectedSystems.includes('heatpump') ? 'B' : 
                    selectedSystems.length > 0 ? 'C' : 'D'
                  }
                </div>
                <div className="text-xs sm:text-sm text-gray-700">
                  Increases property value by 6-7%
                </div>
              </div>

              {/* Payback Period */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 sm:p-5 border border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="text-sm sm:text-base font-medium text-gray-900">Payback Period</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {selectedSystems.length > 0 ? `${combinedSavings.payback}` : '8.5'} years
                </div>
                <div className="text-xs sm:text-sm text-gray-700">
                  Time to recover investment
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Meter Section */}
      <section className="bg-gradient-to-br from-energy-light via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Compact Expandable Smart Meter Section */}
          <div className="max-w-4xl mx-auto mb-8">
            {!showSmartMeterInput ? (
              <div 
                onClick={() => setShowSmartMeterInput(true)}
                className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 cursor-pointer hover:bg-blue-100 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-900 font-medium">Want more accurate estimates?</span>
                  </div>
                  <span className="text-blue-600 font-medium text-sm">
                    Connect smart meter →
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Get More Accurate Estimates</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowSmartMeterInput(false);
                      setSmartMeterNumber('');
                    }}
                    className="text-gray-500 hover:text-gray-700 text-lg"
                  >
                    ×
                  </Button>
                </div>
                
                <p className="text-gray-600 text-lg mb-6 max-w-2xl">
                  Connect your smart meter for personalised recommendations based on your actual energy usage patterns.
                </p>
                <p className="text-blue-600 font-medium mb-8">
                  Optional - you can skip this step and still get excellent recommendations.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-base font-medium text-gray-700 mb-3 block">
                          Smart Meter Number (MPAN/MPRN)
                        </label>
                        <Input
                          placeholder="Enter your 13-digit meter number"
                          value={smartMeterNumber}
                          onChange={(e) => setSmartMeterNumber(e.target.value)}
                          className="w-full h-14 text-base"
                          maxLength={13}
                        />
                        <p className="text-sm text-gray-600 mt-2">
                          Found on your electricity bill or meter display
                        </p>
                      </div>
                      
                      <div className="flex space-x-3 pt-2">
                        <Button
                          onClick={handleAddSmartMeter}
                          disabled={recalculating || smartMeterNumber.length !== 13}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex-1 h-12"
                        >
                          {recalculating ? "Analysing..." : "Get Personalised Estimates"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowSmartMeterInput(false);
                            setSmartMeterNumber('');
                          }}
                          className="h-12 px-6"
                        >
                          Skip for now
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Section */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-4">Why connect your smart meter?</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-blue-900 font-semibold mb-1">More Accurate Savings</p>
                        <p className="text-blue-800 text-sm">Based on your actual usage patterns, not generic estimates</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-green-900 font-semibold mb-1">Right-Sized Systems</p>
                        <p className="text-green-800 text-sm">Solar panels and batteries perfectly matched to your home</p>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <p className="text-amber-900 font-semibold mb-1">Smart Recommendations</p>
                        <p className="text-amber-800 text-sm">Optimal tariffs and usage times for maximum savings</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 flex items-start">
                        <Lock className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                        Your data stays private and secure. Used only for calculations, never shared with installers.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Clear Skip Button at Bottom */}
                <div className="mt-8 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowSmartMeterInput(false);
                      setSmartMeterNumber('');
                    }}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-medium text-base px-8 py-3"
                  >
                    Skip for now
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Energy Options - Modern Grid Layout */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Choose What's Right for Your Home
            </h2>
            <p className="text-gray-800 max-w-xl mx-auto font-medium">
              Simply tick the systems you're interested in and we'll connect you with trusted local installers
            </p>
          </div>

          {/* Visual Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedSystems.includes(option.id);
              
              return (
                <Card 
                  key={option.id}
                  className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    isSelected 
                      ? 'ring-3 ring-energy-green bg-gradient-to-br from-green-50 to-white shadow-lg' 
                      : 'hover:shadow-xl bg-white'
                  }`}
                  onClick={() => handleSystemToggle(option.id)}
                >
                  {/* Recommended Badge */}
                  {option.recommended && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        <Star className="w-3 h-3 inline mr-1" />
                        Popular
                      </div>
                    </div>
                  )}
                  
                  {/* Selection Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-energy-green border-energy-green text-white' 
                        : 'border-gray-300 bg-white'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Icon and Title */}
                    <div className="text-center mb-4">
                      <div className={`inline-flex p-4 rounded-2xl mb-3 ${
                        isSelected 
                          ? 'bg-energy-green text-white' 
                          : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600'
                      }`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {option.name}
                      </h3>
                      <p className="text-sm text-gray-800 leading-relaxed font-medium">
                        {option.description}
                      </p>
                    </div>

                    {/* Key Stats */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-gray-900 font-medium">Annual Savings:</span>
                        <span className="font-bold text-green-600">£{option.savings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-gray-900 font-medium">System Cost:</span>
                        <span className="font-bold text-gray-900">£{option.cost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-gray-900 font-medium">Payback:</span>
                        <span className="font-bold text-blue-600">{option.payback.toFixed(1)} years</span>
                      </div>
                    </div>

                    {/* What You Get */}
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="text-xs font-bold text-blue-900 mb-1">What You Get:</div>
                      <div className="text-sm text-blue-900 font-medium">
                        {option.id === 'solar' && `${assessment.solarRecommendation?.specifications?.panelCount || 8} panels • ${assessment.solarRecommendation?.specifications?.annualGeneration || '3,658 kWh'}/year`}
                        {option.id === 'battery' && `${assessment.batteryRecommendation?.specifications?.batteryCount || 1} battery • ${assessment.batteryRecommendation?.specifications?.capacity || '10 kWh'} storage`}
                        {option.id === 'heatpump' && `Complete system • ${assessment.heatPumpRecommendation?.specifications?.capacity || '10.164 kW'} capacity`}
                        {option.id === 'ev' && `Smart charger • ${assessment.evChargerRecommendation?.specifications?.power || '7.4kW'} charging`}
                      </div>
                    </div>

                    {/* Environmental Impact */}
                    <div className="flex items-center justify-center text-center p-2 bg-green-50 rounded-lg">
                      <Leaf className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm font-bold text-green-900">
                        {option.environmentalImpact.co2Saved}kg CO₂ saved/year
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Benefits Summary */}
          {selectedSystems.length > 0 && (
            <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl border-2 border-energy-green">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="bg-energy-green p-3 rounded-full">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Your Selected Package</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="text-3xl font-bold text-energy-green mb-2">£{combinedSavings.savings.toLocaleString()}</div>
                    <div className="text-gray-900 text-sm font-bold">Total Annual Savings</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600 mb-2">£{combinedSavings.cost.toLocaleString()}</div>
                    <div className="text-gray-900 text-sm font-bold">Total Investment</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{combinedSavings.payback.toFixed(1)} years</div>
                    <div className="text-gray-900 text-sm font-bold">Payback Period</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Finance Options Section - Separate White Card */}
          {selectedSystems.length > 0 && (
            <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl border border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-energy-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Finance Options Available</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800 hover:bg-green-100 ml-2">
                        <HelpCircle className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          Finance Options Explained
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">How does renewable energy finance work?</h4>
                          <p className="text-gray-700">
                            Instead of paying upfront, you can spread the cost over several years with monthly payments. 
                            Often, your energy savings cover most or all of the monthly payment.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Benefits of financing</h4>
                          <ul className="space-y-1 text-gray-700 ml-4">
                            <li>• Start saving on energy bills immediately</li>
                            <li>• No large upfront payment required</li>
                            <li>• Competitive interest rates available</li>
                            <li>• Payments often covered by energy savings</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-green-800 text-xs font-medium">
                            💰 Monthly energy savings often exceed finance payments, creating positive cashflow.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-center mb-4">
                      <Calendar className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-2">Monthly Payment Plan</div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      From £{Math.round(combinedSavings.cost / 120).toLocaleString()}/month
                    </div>
                    <div className="text-gray-800 text-sm font-medium">
                      Spread payments over 10 years with competitive rates
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-center mb-4">
                      <CreditCard className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-2">Flexible Finance Options</div>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      Various Rates
                    </div>
                    <div className="text-gray-800 text-sm font-medium">
                      Competitive rates available subject to credit approval
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-amber-600" />
                    <div className="text-lg font-bold text-gray-900">Finance Application</div>
                  </div>
                  <div className="text-gray-800 font-medium mb-4">
                    Automated finance partner integration launching soon
                  </div>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-amber-300 text-amber-800 hover:bg-amber-100 font-medium"
                    disabled
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Coming Soon - Finance Application
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Government Incentives Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-8 border border-blue-200">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Government Incentives & Benefits</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 ml-2">
                      <HelpCircle className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        Government Incentives Explained
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">What are government incentives?</h4>
                        <p className="text-gray-700">
                          The UK government offers financial support to encourage renewable energy adoption. These incentives reduce the upfront cost and provide ongoing benefits.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">How do they help you?</h4>
                        <ul className="space-y-1 text-gray-700 ml-4">
                          <li>• Reduce installation costs by thousands of pounds</li>
                          <li>• Provide ongoing payments for excess energy</li>
                          <li>• Apply automatically - no extra paperwork</li>
                          <li>• Make renewable energy more affordable</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-blue-800 text-xs font-medium">
                          💡 These incentives are designed to help UK homeowners transition to clean energy affordably.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-gray-800 font-medium max-w-2xl mx-auto">
                Take advantage of these UK government incentives to reduce your renewable energy costs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 0% VAT */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-center mb-4">
                  <Receipt className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-2">0% VAT</div>
                  <div className="text-sm text-gray-800 font-medium mb-3">
                    Solar panels, batteries, and installation
                  </div>
                  <div className="text-xs text-gray-700">
                    Save 20% on total system cost through government VAT exemption
                  </div>
                </div>
              </div>

              {/* Boiler Upgrade Scheme */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-center mb-4">
                  <Banknote className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-2">£7,500 Grant</div>
                  <div className="text-sm text-gray-800 font-medium mb-3">
                    Boiler Upgrade Scheme for heat pumps
                  </div>
                  <div className="text-xs text-gray-700">
                    Government grant for air source heat pump installation
                  </div>
                </div>
              </div>

              {/* Smart Export Guarantee */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-center mb-4">
                  <Gift className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-2">SEG Payments</div>
                  <div className="text-sm text-gray-800 font-medium mb-3">
                    Smart Export Guarantee earnings
                  </div>
                  <div className="text-xs text-gray-700">
                    Get paid for excess solar energy exported to the grid
                  </div>
                </div>
              </div>

              {/* EV Charger Grant */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-2">Up to £350</div>
                  <div className="text-sm text-gray-800 font-medium mb-3">
                    EV chargepoint grant
                  </div>
                  <div className="text-xs text-gray-700">
                    Government grant for home EV charger installation
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="mt-8 bg-white/60 rounded-xl p-6">
              <div className="text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Additional Benefits</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-gray-900 font-medium">25-year warranties included</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Home className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900 font-medium">Increase property value</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-gray-900 font-medium">Carbon footprint reduction</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="bg-green-100 rounded-lg p-4 inline-block">
                <div className="text-green-800 font-bold text-lg">
                  Combined savings: Up to £8,000+ in government incentives
                </div>
                <div className="text-green-700 text-sm mt-1">
                  Incentives apply automatically - no additional paperwork required
                </div>
              </div>
            </div>
          </div>

          {/* EPC Rating Improvements */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 mb-8 border border-green-200">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-green-600 p-3 rounded-full">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">EPC Rating Improvements</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800 hover:bg-green-100 ml-2">
                      <HelpCircle className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                        What is an EPC Rating?
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Energy Performance Certificate (EPC)</h4>
                        <p className="text-gray-700">
                          An EPC measures how energy efficient your property is, rated from A (most efficient) to G (least efficient). 
                          It's required when selling or renting a property in the UK.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Why does it matter?</h4>
                        <ul className="space-y-1 text-gray-700 ml-4">
                          <li>• <strong>Property Value:</strong> Higher ratings increase property value by £15,000-£25,000</li>
                          <li>• <strong>Energy Bills:</strong> Better ratings mean lower energy costs</li>
                          <li>• <strong>Legal Requirement:</strong> Needed for selling/renting your home</li>
                          <li>• <strong>Environmental Impact:</strong> Shows your home's carbon footprint</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">How renewable energy helps</h4>
                        <p className="text-gray-700">
                          Solar panels, heat pumps, and batteries significantly improve your EPC rating by reducing energy consumption 
                          and carbon emissions. This makes your property more valuable and attractive to buyers.
                        </p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-green-800 text-xs font-medium">
                          🏠 Most UK homes are rated D or below. Renewable energy can boost your rating to B or A+.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-gray-800 font-medium max-w-2xl mx-auto">
                Boost your property's energy efficiency rating and increase its value
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Solar Panels EPC Impact */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-center mb-4">
                  <Sun className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-2">Solar Panels</div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">Current: D</div>
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">Target: B</div>
                  </div>
                  <div className="text-sm text-gray-800 font-medium mb-2">
                    +15-25 EPC points
                  </div>
                  <div className="text-xs text-gray-700">
                    Renewable energy generation significantly improves energy efficiency rating
                  </div>
                </div>
              </div>

              {/* Heat Pump EPC Impact */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-center mb-4">
                  <Thermometer className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-2">Heat Pump</div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">Current: D</div>
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">Target: A</div>
                  </div>
                  <div className="text-sm text-gray-800 font-medium mb-2">
                    +20-35 EPC points
                  </div>
                  <div className="text-xs text-gray-700">
                    High-efficiency heating system with excellent COP ratings
                  </div>
                </div>
              </div>

              {/* Combined System Impact */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-2">Complete System</div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">Current: D</div>
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">Target: A+</div>
                  </div>
                  <div className="text-sm text-gray-800 font-medium mb-2">
                    +40-60 EPC points
                  </div>
                  <div className="text-xs text-gray-700">
                    Solar + heat pump + battery creates top-tier energy efficiency
                  </div>
                </div>
              </div>
            </div>

            {/* EPC Benefits */}
            <div className="mt-8 bg-white/60 rounded-xl p-6">
              <div className="text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-4">EPC Rating Benefits</h4>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Home className="w-4 h-4 text-green-600" />
                    <span className="text-gray-900 font-medium">Higher property value</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900 font-medium">Faster property sales</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Banknote className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-900 font-medium">Lower mortgage rates</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-gray-900 font-medium">Future-proofed rating</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="bg-green-100 rounded-lg p-4 inline-block">
                <div className="text-green-800 font-bold text-lg">
                  Potential property value increase: £15,000 - £25,000
                </div>
                <div className="text-green-700 text-sm mt-1">
                  Based on improved EPC rating and renewable energy features
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            {selectedSystems.length === 0 && (
              <>
                <p className="text-gray-800 text-lg font-medium">
                  Select the energy solutions that interest you to see your savings
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="px-8 py-3"
                >
                  <Link to="/how-it-works">Learn More About Options</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>


      <Footer />

      {/* Floating Submit Button - appears when systems are selected */}
      {selectedSystems.length > 0 && (
        <div 
          className="fixed left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-md"
          style={{
            bottom: `${buttonPosition.bottom}px`,
            transition: 'bottom 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
          }}
        >
          <Button
            asChild
            size="lg"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-8 shadow-2xl border-2 border-green-500 hover:border-green-400 transition-all duration-300 transform hover:scale-105 rounded-xl"
          >
            <Link to="/quote-request">
              Get My Free Personalised Quote →
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}