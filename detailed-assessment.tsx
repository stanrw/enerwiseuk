import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PanelSelection } from "@/components/PanelSelection";
import { YieldChart } from "@/components/YieldChart";
import { PDFProposalGenerator } from "@/components/PDFProposalGenerator";
import { 
  Sun, 
  Battery, 
  Thermometer, 
  Car, 
  Calculator, 
  TrendingUp, 
  Leaf, 
  PoundSterling,
  Zap,
  Home,
  Calendar,
  Target,
  Award,
  ChevronRight,
  Gauge,
  TreePine,
  Users,
  Building,
  FileText,
  Download
} from "lucide-react";

interface SystemCalculatorProps {
  system: any;
  onUpdate: (values: any) => void;
}

function SystemCalculator({ system, onUpdate }: SystemCalculatorProps) {
  const [usage, setUsage] = useState(3500);
  const [budget, setBudget] = useState(system.cost);
  
  // Recalculate based on usage
  const calculateUpdatedMetrics = () => {
    const usageMultiplier = usage / 3500; // Base usage
    const updatedAnnualSavings = Math.round(system.annualSavings * usageMultiplier);
    const updatedPayback = Math.round((budget / updatedAnnualSavings) * 10) / 10;
    const updatedROI = Math.round(((updatedAnnualSavings * 25) / budget) * 100);
    
    return {
      annualSavings: updatedAnnualSavings,
      paybackPeriod: updatedPayback,
      roi: updatedROI,
      lifetimeSavings: updatedAnnualSavings * 25,
      carbonSavings: Math.round(updatedAnnualSavings * 2.5) // ~2.5kg CO2 per £1 saved
    };
  };

  const metrics = calculateUpdatedMetrics();

  useEffect(() => {
    onUpdate(metrics);
  }, [usage, budget]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-900">
            Annual Energy Usage (kWh)
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="1500"
              max="8000"
              value={usage}
              onChange={(e) => setUsage(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Low (1,500)</span>
              <span className="font-medium text-gray-900">{usage.toLocaleString()} kWh</span>
              <span>High (8,000)</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-900">
            Budget Range (£)
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min={Math.round(system.cost * 0.7)}
              max={Math.round(system.cost * 1.5)}
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>£{Math.round(system.cost * 0.7).toLocaleString()}</span>
              <span className="font-medium text-gray-900">£{budget.toLocaleString()}</span>
              <span>£{Math.round(system.cost * 1.5).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <PoundSterling className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Annual Savings</span>
          </div>
          <p className="text-2xl font-bold text-green-900">£{metrics.annualSavings.toLocaleString()}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Payback Period</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{metrics.paybackPeriod} years</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">ROI</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{metrics.roi}%</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TreePine className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">CO₂ Saved/Year</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{metrics.carbonSavings}kg</p>
        </div>
      </div>
    </div>
  );
}

export default function DetailedAssessment() {
  const [, setLocation] = useLocation();
  const [activeSystem, setActiveSystem] = useState("solar");
  const [showSmartMeterForm, setShowSmartMeterForm] = useState(false);
  const [smartMeterNumber, setSmartMeterNumber] = useState("");
  const [selectedPanel, setSelectedPanel] = useState<any>(null);
  const [systemData, setSystemData] = useState<any>({});
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get stored assessment data
  const assessmentData = JSON.parse(sessionStorage.getItem('assessmentResult') || '{}');
  
  if (!assessmentData.address) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-16 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Assessment Data Found</h1>
          <p className="text-gray-600 mb-8">Please complete the property assessment first.</p>
          <Link href="/assessment">
            <Button className="bg-energy-green hover:bg-green-600">
              Start Assessment
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Create mock data structure based on the new assessment flow
  const property = {
    address: assessmentData.address,
    propertyType: "Semi-detached house",
    epcRating: "D"
  };

  const recommendations = [
    {
      type: "solar",
      annualSavings: 850,
      cost: 8500,
      paybackPeriod: 10,
      co2Reduction: 2100
    },
    {
      type: "battery",
      annualSavings: 320,
      cost: 4200,
      paybackPeriod: 13,
      co2Reduction: 800
    },
    {
      type: "heat_pump",
      annualSavings: 450,
      cost: 12000,
      paybackPeriod: 26,
      co2Reduction: 3200
    },
    {
      type: "ev_charger",
      annualSavings: 380,
      cost: 800,
      paybackPeriod: 2,
      co2Reduction: 2500
    }
  ];

  // Enhanced system data with detailed metrics
  const systemsData = {
    solar: {
      ...recommendations.find((r: any) => r.type === "solar"),
      icon: Sun,
      color: "yellow",
      title: "Solar Panel System",
      description: "Generate clean electricity from sunlight",
      suitabilityScore: 85,
      environmentalImpact: {
        co2ReductionPerYear: 2100,
        treesEquivalent: 47,
        coalAvoided: "1.2 tonnes"
      },
      technicalSpecs: {
        panelEfficiency: "22.1%",
        inverterEfficiency: "97.8%",
        systemLifespan: "25 years",
        warrantyPeriods: {
          panels: "25 years performance",
          inverter: "12 years product",
          installation: "2 years workmanship"
        }
      },
      incentives: {
        smartExportGuarantee: "£180/year",
        vatReduction: "0% VAT on installation",
        greenFinancing: "Available from 3.9% APR"
      }
    },
    battery: {
      ...recommendations.find((r: any) => r.type === "battery"),
      icon: Battery,
      color: "blue",
      title: "Battery Storage System",
      description: "Store excess solar energy for later use",
      suitabilityScore: 78,
      environmentalImpact: {
        co2ReductionPerYear: 800,
        treesEquivalent: 18,
        gridIndependence: "65%"
      },
      technicalSpecs: {
        roundTripEfficiency: "95%",
        depthOfDischarge: "95%",
        cycleLife: "6,000 cycles",
        warrantyPeriods: {
          battery: "10 years / 6,000 cycles",
          inverter: "10 years product",
          installation: "2 years workmanship"
        }
      },
      incentives: {
        timeOfUseOptimization: "£250/year additional savings",
        gridServices: "Potential income from grid balancing",
        futureProofing: "Ready for V2G and smart tariffs"
      }
    },
    heatPump: {
      ...recommendations.find((r: any) => r.type === "heat_pump"),
      icon: Thermometer,
      color: "red",
      title: "Heat Pump System",
      description: "Efficient heating and cooling for your home",
      suitabilityScore: 72,
      environmentalImpact: {
        co2ReductionPerYear: 3200,
        treesEquivalent: 71,
        gasReduction: "100% replacement"
      },
      technicalSpecs: {
        cop: "3.5 (Coefficient of Performance)",
        operatingRange: "-15°C to +35°C",
        heatingCapacity: "8.5kW",
        warrantyPeriods: {
          compressor: "7 years",
          parts: "5 years",
          installation: "2 years workmanship"
        }
      },
      incentives: {
        boilerUpgradeScheme: "£7,500 government grant",
        vatReduction: "0% VAT on installation",
        rhiPayments: "Potential RHI legacy payments"
      }
    },
    evCharger: {
      ...recommendations.find((r: any) => r.type === "ev_charger"),
      icon: Car,
      color: "green",
      title: "EV Charger",
      description: "Fast, convenient home charging for electric vehicles",
      suitabilityScore: 90,
      environmentalImpact: {
        co2ReductionPerYear: 2500,
        treesEquivalent: 56,
        petrolSavings: "1,200 litres/year"
      },
      technicalSpecs: {
        chargingSpeed: "7.4kW (Type 2)",
        chargingTime: "6-8 hours full charge",
        smartFeatures: "App control, scheduling, load balancing",
        warrantyPeriods: {
          charger: "3 years product",
          installation: "2 years workmanship"
        }
      },
      incentives: {
        ozevGrant: "Up to £350 off installation",
        smartTariffs: "Charge as low as 5p/kWh overnight",
        futureProofing: "V2G ready for energy export"
      }
    }
  };

  const currentSystem = systemsData[activeSystem as keyof typeof systemsData];

  const overallScores = {
    energyEfficiency: Math.round(Object.values(systemsData).reduce((acc: number, sys: any) => acc + (sys.suitabilityScore || 0), 0) / 4),
    carbonReduction: Math.round(Object.values(systemsData).reduce((acc: number, sys: any) => acc + (sys.environmentalImpact?.co2ReductionPerYear || 0), 0)),
    annualSavings: recommendations.reduce((acc: number, rec: any) => acc + (rec.annualSavings || 0), 0),
    epcImprovement: "C → A"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Property Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Renewable Energy Assessment Results
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span>{property.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    <span>{property.propertyType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gauge className="w-4 h-4" />
                    <span>EPC Rating: {property.epcRating || 'D'}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="bg-green-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-green-700">Overall Suitability</p>
                  <p className="text-2xl font-bold text-green-900">{overallScores.energyEfficiency}%</p>
                </div>
              </div>
            </div>

            {/* Overall Impact Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <PoundSterling className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Total Annual Savings</span>
                </div>
                <p className="text-2xl font-bold text-green-900">£{overallScores.annualSavings.toLocaleString()}</p>
                <p className="text-xs text-green-700">Up to £{(overallScores.annualSavings * 25).toLocaleString()} over 25 years</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TreePine className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">CO₂ Reduction</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{(overallScores.carbonReduction / 1000).toFixed(1)}t</p>
                <p className="text-xs text-blue-700">Per year - equivalent to {Math.round(overallScores.carbonReduction / 45)} trees</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">EPC Improvement</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">{overallScores.epcImprovement}</p>
                <p className="text-xs text-purple-700">Increases property value by 6-7%</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">Net Zero Target</span>
                </div>
                <p className="text-2xl font-bold text-orange-900">2028</p>
                <p className="text-xs text-orange-700">Achieve household net zero by 2028</p>
              </div>
            </div>
          </div>

          {/* Smart Meter Enhancement */}
          {!showSmartMeterForm && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Get More Accurate Estimates
                    </h3>
                    <p className="text-blue-800 mb-3">
                      Connect your Smart Meter to get personalised estimates based on your actual energy usage patterns. 
                      This will provide much more accurate savings calculations and system sizing.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-blue-700">
                      <div className="flex items-center gap-1">
                        <span>✓</span>
                        <span>Real consumption data</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>✓</span>
                        <span>Peak usage analysis</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>✓</span>
                        <span>Optimised system sizing</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>✓</span>
                        <span>Seasonal patterns</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setShowSmartMeterForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Connect Smart Meter
                </Button>
              </div>
            </div>
          )}

          {/* Smart Meter Form */}
          {showSmartMeterForm && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect Your Smart Meter</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Smart Meter Number (MPAN/MPRN)
                    </label>
                    <input
                      type="text"
                      value={smartMeterNumber}
                      onChange={(e) => setSmartMeterNumber(e.target.value)}
                      placeholder="Enter your 13-digit meter number"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Found on your electricity bill or meter display
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/smart-meter/connect', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                              mpan: smartMeterNumber,
                              propertyId: property.id 
                            })
                          });
                          
                          const result = await response.json();
                          
                          if (result.success) {
                            // Update assessment data with smart meter data
                            const updatedAssessment = { 
                              ...assessmentData, 
                              smartMeterData: result.smartMeterData,
                              enhancedAssessment: true
                            };
                            sessionStorage.setItem('assessmentResult', JSON.stringify(updatedAssessment));
                            setShowSmartMeterForm(false);
                            // Refresh the page to show updated calculations
                            window.location.reload();
                          } else {
                            alert(result.message || 'Failed to connect smart meter');
                          }
                        } catch (error) {
                          alert('Failed to connect smart meter. Please try again.');
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!smartMeterNumber}
                    >
                      Connect & Analyse
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowSmartMeterForm(false)}
                    >
                      Skip for now
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">What you'll get:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Actual consumption analysis (not estimates)</li>
                    <li>• Peak usage time identification</li>
                    <li>• Seasonal pattern analysis</li>
                    <li>• Optimised system recommendations</li>
                    <li>• More accurate ROI calculations</li>
                    <li>• Smart tariff recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Professional Solar Analysis Section (for Solar Systems) */}
          {activeSystem === "solar" && (
            <div className="space-y-8">
              {/* Professional Panel Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-yellow-600" />
                    Professional Solar Panel Selection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PanelSelection
                    onPanelSelect={(panel) => {
                      setSelectedPanel(panel);
                      setSystemData(prev => ({ ...prev, selectedPanel: panel }));
                    }}
                    selectedPanel={selectedPanel}
                    roofArea={85} // Mock roof area from assessment
                  />
                </CardContent>
              </Card>

              {/* Enhanced Yield Analysis */}
              {selectedPanel && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      Professional Yield Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <YieldChart
                      monthlyData={[
                        { month: 'Jan', yield: 180, irradiance: 1.2 },
                        { month: 'Feb', yield: 250, irradiance: 2.1 },
                        { month: 'Mar', yield: 420, irradiance: 3.4 },
                        { month: 'Apr', yield: 520, irradiance: 4.8 },
                        { month: 'May', yield: 650, irradiance: 5.9 },
                        { month: 'Jun', yield: 680, irradiance: 6.1 },
                        { month: 'Jul', yield: 720, irradiance: 6.4 },
                        { month: 'Aug', yield: 650, irradiance: 5.8 },
                        { month: 'Sep', yield: 480, irradiance: 4.2 },
                        { month: 'Oct', yield: 320, irradiance: 2.8 },
                        { month: 'Nov', yield: 200, irradiance: 1.6 },
                        { month: 'Dec', yield: 150, irradiance: 1.0 }
                      ]}
                      annualYield={5220}
                      systemSize={selectedPanel ? selectedPanel.watts * 16 / 1000 : 6.4}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Professional Proposal Generation */}
              {selectedPanel && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Generate Professional Proposal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PDFProposalGenerator
                      proposalData={{
                        address: property.address,
                        systemSize: selectedPanel.watts * 16 / 1000,
                        panelCount: 16,
                        annualYield: 5220,
                        totalCost: selectedPanel.price * 16 + 3000, // Panel cost + installation
                        paybackPeriod: 8.5,
                        co2Savings: 2100,
                        panelBrand: selectedPanel.manufacturer,
                        panelModel: selectedPanel.model
                      }}
                      customerName="Homeowner"
                      installerName="Enerwise Certified Installer"
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* System Selection Tabs */}
          <Tabs value={activeSystem} onValueChange={setActiveSystem} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="solar" className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                Solar
              </TabsTrigger>
              <TabsTrigger value="battery" className="flex items-center gap-2">
                <Battery className="w-4 h-4" />
                Battery
              </TabsTrigger>
              <TabsTrigger value="heatPump" className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                Heat Pump
              </TabsTrigger>
              <TabsTrigger value="evCharger" className="flex items-center gap-2">
                <Car className="w-4 h-4" />
                EV Charger
              </TabsTrigger>
            </TabsList>

            {Object.entries(systemsData).map(([key, system]) => (
              <TabsContent key={key} value={key} className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`bg-${system.color}-100 p-3 rounded-lg`}>
                          <system.icon className={`w-6 h-6 text-${system.color}-600`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{system.title}</CardTitle>
                          <p className="text-gray-600">{system.description}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-600">Suitability</span>
                          <Badge variant={system.suitabilityScore > 80 ? "default" : "secondary"}>
                            {system.suitabilityScore}%
                          </Badge>
                        </div>
                        <Progress value={system.suitabilityScore} className="w-24" />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Interactive Calculator */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <Calculator className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900">Interactive Calculator</h4>
                      </div>
                      <SystemCalculator 
                        system={system} 
                        onUpdate={(values) => {
                          // Update system values in real-time
                        }}
                      />
                    </div>

                    {/* Technical Specifications */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Technical Specifications</h4>
                        <div className="space-y-2">
                          {Object.entries(system.technicalSpecs).map(([key, value]) => (
                            key !== 'warrantyPeriods' && (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="font-medium text-gray-900">{value as string}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Environmental Impact</h4>
                        <div className="space-y-2">
                          {Object.entries(system.environmentalImpact).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                              <span className="font-medium text-green-700">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Incentives & Support */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-3">Available Incentives & Support</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {Object.entries(system.incentives).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <p className="text-sm text-green-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                            <p className="font-medium text-green-900 text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Call to Action */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Professional Quotes?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Create a free account to receive personalised quotes from vetted MCS-certified installers. 
              Compare prices, warranties, and installation timelines all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-energy-green hover:bg-green-600 text-white px-8 py-4"
                onClick={() => setLocation('/customer-portal')}
              >
                <Users className="w-5 h-5 mr-2" />
                Create Account & Get Quotes
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>No Sales Calls</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>MCS Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}