import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Calculator, 
  FileText, 
  Star,

  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Zap,
  Sun,
  Battery,
  Thermometer,
  Award,
  Eye,
  MessageSquare,
  ArrowRight
} from "lucide-react";

// Customer journey steps
const CUSTOMER_JOURNEY_STEPS = [
  { id: 1, title: "Assessment Complete", status: "completed", icon: Calculator },
  { id: 2, title: "Account Created", status: "completed", icon: FileText },
  { id: 3, title: "Installers Matched", status: "current", icon: Users },
  { id: 4, title: "Quotes Received", status: "pending", icon: CheckCircle },
  { id: 5, title: "Compare & Select", status: "pending", icon: TrendingUp },
  { id: 6, title: "Installation Booked", status: "pending", icon: Calendar },
];

export default function CustomerPortal() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [combinedSavings, setCombinedSavings] = useState<any>(null);
  const [quoteRequestResult, setQuoteRequestResult] = useState<any>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check customer authentication
    const customerAuth = localStorage.getItem('customerAuth');
    if (!customerAuth) {
      setLocation('/customer/auth');
      return;
    }
    
    setIsAuthenticated(true);
    
    // Load data from session storage
    const saved = sessionStorage.getItem('assessmentResult');
    const systems = sessionStorage.getItem('selectedSystems');
    const savings = sessionStorage.getItem('combinedSavings');
    const quoteResult = sessionStorage.getItem('quoteRequestResult');
    
    if (saved) setAssessmentData(JSON.parse(saved));
    if (systems) setSelectedSystems(JSON.parse(systems));
    if (savings) setCombinedSavings(JSON.parse(savings));
    if (quoteResult) setQuoteRequestResult(JSON.parse(quoteResult));
  }, [setLocation]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Mock matched installers data (in real app, this would come from API)
  const mockMatchedInstallers = [
    {
      id: 1,
      name: "SolarTech Solutions",
      rating: 4.9,
      reviewCount: 127,
      specialties: ["Solar Panels", "Battery Storage"],
      location: "Within 5 miles",
      responseTime: "Responds within 2 hours",
      estimatedContactTime: "Today 2-4pm",
      certifications: ["MCS", "RECC", "NAPIT"],

      email: "quotes@solartech.co.uk"
    },
    {
      id: 2,
      name: "Green Energy Experts",
      rating: 4.8,
      reviewCount: 89,
      specialties: ["Heat Pumps", "Solar Panels"],
      location: "Within 8 miles", 
      responseTime: "Responds within 4 hours",
      estimatedContactTime: "Tomorrow 9-11am",
      certifications: ["MCS", "HIES", "TrustMark"],

      email: "info@greenenergy.co.uk"
    },
    {
      id: 3,
      name: "EcoHome Installations", 
      rating: 4.7,
      reviewCount: 156,
      specialties: ["EV Chargers", "Solar Panels", "Battery Storage"],
      location: "Within 12 miles",
      responseTime: "Responds within 1 hour",
      estimatedContactTime: "Today 5-7pm", 
      certifications: ["MCS", "OLEV", "RECC"],

      email: "contact@ecohome.co.uk"
    }
  ];

  const getSystemIcon = (systemId: string) => {
    switch (systemId) {
      case 'solar': return Sun;
      case 'battery': return Battery;
      case 'heatpump': return Thermometer;
      case 'ev': return Zap;
      default: return Calculator;
    }
  };

  const getSystemName = (systemId: string) => {
    switch (systemId) {
      case 'solar': return 'Solar Panels';
      case 'battery': return 'Battery Storage';
      case 'heatpump': return 'Heat Pump';
      case 'ev': return 'EV Charger';
      default: return systemId;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-energy-green to-green-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4 mr-2" />
              Account Created Successfully
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to Your Energy <span className="text-green-100">Dashboard</span>
            </h1>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Your personalised energy plan is ready. We've matched you with certified installers who will provide competitive quotes.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Progress Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-energy-green" />
              Your Journey Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between items-center gap-4">
              {CUSTOMER_JOURNEY_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = step.status === 'completed';
                const isCurrent = step.status === 'current';
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted ? 'bg-energy-green border-energy-green text-white' :
                      isCurrent ? 'bg-orange-100 border-orange-500 text-orange-600' :
                      'bg-gray-100 border-gray-300 text-gray-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <div className={`text-sm font-medium ${
                        isCompleted ? 'text-energy-green' :
                        isCurrent ? 'text-orange-600' :
                        'text-gray-400'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < CUSTOMER_JOURNEY_STEPS.length - 1 && (
                      <ArrowRight className="w-4 h-4 mx-4 text-gray-300 hidden lg:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Your Energy Plan */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Selected Energy Plan */}
            {combinedSavings && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-energy-green" />
                    Your Personalized Energy Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-energy-green">
                        £{combinedSavings.cost?.toLocaleString() || '0'}
                      </div>
                      <div className="text-sm text-gray-600">Total Investment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-energy-green">
                        £{combinedSavings.savings?.toLocaleString() || '0'}
                      </div>
                      <div className="text-sm text-gray-600">Annual Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-energy-green">
                        {combinedSavings.payback?.toFixed(1) || '0'} years
                      </div>
                      <div className="text-sm text-gray-600">Payback Period</div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Selected Systems:</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedSystems.map(systemId => {
                        const Icon = getSystemIcon(systemId);
                        return (
                          <div key={systemId} className="flex items-center p-3 bg-green-50 rounded-lg">
                            <Icon className="w-5 h-5 text-energy-green mr-3" />
                            <span className="font-medium">{getSystemName(systemId)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Matched Installers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-energy-green" />
                  Matched Installers in Your Area
                </CardTitle>
                <p className="text-gray-600">
                  We've found {mockMatchedInstallers.length} certified installers who specialize in your selected systems
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockMatchedInstallers.map(installer => (
                    <div key={installer.id} className="border rounded-lg p-6 hover:border-energy-green/50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{installer.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{installer.rating}</span>
                              <span className="text-gray-600">({installer.reviewCount} reviews)</span>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {installer.location}
                            </Badge>
                          </div>
                        </div>
                        <Badge className="bg-orange-100 text-orange-600">
                          {installer.responseTime}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-2">Specialties:</div>
                          <div className="flex flex-wrap gap-1">
                            {installer.specialties.map(specialty => (
                              <Badge key={specialty} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-2">Certifications:</div>
                          <div className="flex flex-wrap gap-1">
                            {installer.certifications.map(cert => (
                              <Badge key={cert} variant="outline" className="text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Expected contact: {installer.estimatedContactTime}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Next Steps */}
          <div className="space-y-6">
            
            {/* What Happens Next */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-energy-green" />
                  What Happens Next
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-energy-green text-white text-sm font-medium">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Installer Contact</div>
                    <div className="text-sm text-gray-600">Installers will contact you within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-white text-sm font-medium">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Site Survey</div>
                    <div className="text-sm text-gray-600">Free property assessment and measurements</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-white text-sm font-medium">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Detailed Quotes</div>
                    <div className="text-sm text-gray-600">Compare proposals and pricing</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-white text-sm font-medium">
                    4
                  </div>
                  <div>
                    <div className="font-medium">Installation</div>
                    <div className="text-sm text-gray-600">Professional installation and commissioning</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-energy-green" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our team is here to support you throughout your renewable energy journey.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support: support@enerwise.co.uk
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Email: support@enerwise.uk
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat with Orla
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}