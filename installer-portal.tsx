import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceAreaManager from "@/components/service-area-manager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp, 
  FileText, 
  Wallet,
  CheckCircle,
  AlertTriangle,
  Building,

  Mail,
  Map
} from "lucide-react";

export default function InstallerPortal() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check installer authentication
    const installerAuth = localStorage.getItem('installerAuth');
    if (!installerAuth) {
      setLocation('/installer/auth');
      return;
    }
    
    setIsAuthenticated(true);
  }, [setLocation]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Mock installer data (would come from authentication)
  const installerData = {
    id: 1,
    name: "Green Energy Solutions Ltd",
    rating: 4.8,
    reviewCount: 127,
    certifications: ["MCS", "NICEIC", "Trustmark"],
    specialties: ["solar", "battery", "heat_pump"],
    serviceAreas: ["SW1", "SW2", "SW3", "SW4", "SW5"],
    credits: 25,
    subscriptionTier: "premium",
    // Service area management fields
    hqAddress: "123 Green Energy Way, London",
    hqPostcode: "SW1A 1AA",
    hqLatitude: 51.5074,
    hqLongitude: -0.1278,
    serviceRadius: 45,
    maxServiceRadius: 100,
    radiusUpgradeEndDate: "2025-12-31",
    additionalServiceAreas: [
      { postcode: "M1 1AA", lat: 53.4808, lng: -2.2426, radius: 25 },
      { postcode: "B1 1AA", lat: 52.4862, lng: -1.8904, radius: 30 }
    ],
    monthlyStats: {
      quotesViewed: 48,
      quotesSubmitted: 12,
      quotesWon: 8,
      revenue: 45000
    }
  };

  // Mock tender pack data
  const mockTenderPacks = [
    {
      id: 1,
      customer: { name: "Sarah Johnson", area: "SW1A 1AA" },
      systemTypes: ["solar", "battery"],
      budget: "£10,000 - £15,000",
      timeframe: "1-3 months",
      propertyType: "Semi-detached house",
      requirements: "Looking for solar panels with battery storage. South-facing roof.",
      postedAt: "2 hours ago",
      status: "active",
      creditsRequired: 3
    },
    {
      id: 2,
      customer: { name: "Michael Chen", area: "SW3 2AB" },
      systemTypes: ["heat_pump"],
      budget: "£8,000 - £12,000",
      timeframe: "3-6 months",
      propertyType: "Victorian terrace",
      requirements: "Air source heat pump installation. Need advice on suitability.",
      postedAt: "4 hours ago",
      status: "active",
      creditsRequired: 3
    },
    {
      id: 3,
      customer: { name: "Lisa Williams", area: "SW5 8CD" },
      systemTypes: ["solar", "ev_charger"],
      budget: "£6,000 - £10,000",
      timeframe: "As soon as possible",
      propertyType: "Modern flat",
      requirements: "Solar panels and EV charger installation for new electric vehicle.",
      postedAt: "6 hours ago", 
      status: "active",
      creditsRequired: 3
    }
  ];

  // Mock active quotes
  const mockActiveQuotes = [
    {
      id: 1,
      customer: "Emma Thompson",
      address: "45 Oak Street, SW2 1XY",
      systemType: "Solar + Battery",
      quotedAmount: 12500,
      status: "awaiting_response",
      submittedAt: "1 day ago"
    },
    {
      id: 2,
      customer: "David Brown",
      address: "78 Maple Road, SW4 3ZA",
      systemType: "Heat Pump",
      quotedAmount: 9800,
      status: "site_survey_scheduled",
      submittedAt: "3 days ago"
    }
  ];

  // Button handlers
  const handleViewDetails = (packId: number) => {
    toast({
      title: "Tender Pack Details",
      description: `Viewing detailed information for tender pack #${packId}`,
    });
  };

  const handleSubmitQuote = (packId: number, creditsRequired: number) => {
    if (installerData.credits < creditsRequired) {
      toast({
        title: "Insufficient Credits",
        description: "You need more credits to submit this quote. Purchase credits to continue.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Quote Submission",
      description: `Submitting quote for tender pack #${packId}. This will use ${creditsRequired} credits.`,
    });
  };



  const handleSendEmail = (customerName: string) => {
    toast({
      title: "Sending Email",
      description: `Opening email composer for ${customerName}`,
    });
  };

  const handleUpdateStatus = (quoteId: number) => {
    toast({
      title: "Update Status",
      description: `Updating status for quote #${quoteId}`,
    });
  };

  const handleBuyCredits = () => {
    toast({
      title: "Coming Soon",
      description: "Credit purchasing system will be available soon with secure payment processing.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('installerAuth');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation('/installer-auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Installer Dashboard
                </h1>
                <p className="text-gray-600">Welcome back, {installerData.name}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < Math.floor(installerData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {installerData.rating} ({installerData.reviewCount} reviews)
                    </span>
                  </div>
                  {installerData.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <div className="text-center">
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <Wallet className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">{installerData.credits} Credits</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleBuyCredits} className="mt-2">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Buy Credits
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    <Badge variant={installerData.subscriptionTier === 'premium' ? 'default' : 'secondary'} className="text-xs">
                      {installerData.subscriptionTier}
                    </Badge>
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Quotes This Month</p>
                    <p className="text-2xl font-bold text-gray-900">{installerData.monthlyStats.quotesSubmitted}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Win Rate</p>
                    <p className="text-2xl font-bold text-green-600">
                      {Math.round((installerData.monthlyStats.quotesWon / installerData.monthlyStats.quotesSubmitted) * 100)}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">£{installerData.monthlyStats.revenue.toLocaleString()}</p>
                  </div>
                  <Wallet className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">New Opportunities</p>
                    <p className="text-2xl font-bold text-orange-600">{mockTenderPacks.length}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="tender-packs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tender-packs">Available Opportunities</TabsTrigger>
              <TabsTrigger value="active-quotes">Active Quotes</TabsTrigger>
              <TabsTrigger value="completed-jobs">Completed Jobs</TabsTrigger>
              <TabsTrigger value="service-areas">Service Areas</TabsTrigger>
            </TabsList>

            {/* Tender Packs Tab */}
            <TabsContent value="tender-packs" className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">How It Works</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Spend 3 credits to view full tender pack details and submit your quote. 
                      Win rate affects your priority in future opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                {mockTenderPacks.map((pack) => (
                  <Card key={pack.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {pack.systemTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(" + ")} Installation
                          </CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{pack.customer.area}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{pack.timeframe}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{pack.propertyType}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="default" className="bg-energy-green">
                            {pack.creditsRequired} Credits
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">Posted {pack.postedAt}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Budget Range</p>
                          <p className="text-green-600 font-semibold">{pack.budget}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Customer Requirements</p>
                          <p className="text-gray-700 text-sm">{pack.requirements}</p>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">3 installers invited</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(pack.id)}
                            >
                              View Details
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-energy-green hover:bg-green-600"
                              disabled={installerData.credits < pack.creditsRequired}
                              onClick={() => handleSubmitQuote(pack.id, pack.creditsRequired)}
                            >
                              Submit Quote ({pack.creditsRequired} credits)
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Active Quotes Tab */}
            <TabsContent value="active-quotes" className="space-y-6">
              <div className="grid gap-6">
                {mockActiveQuotes.map((quote) => (
                  <Card key={quote.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {quote.customer}
                          </CardTitle>
                          <p className="text-gray-600 mt-1">{quote.address}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline">{quote.systemType}</Badge>
                            <span className="text-sm text-gray-500">Submitted {quote.submittedAt}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">£{quote.quotedAmount.toLocaleString()}</p>
                          <Badge 
                            variant={quote.status === 'awaiting_response' ? 'default' : 'secondary'}
                            className="mt-1"
                          >
                            {quote.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Email Draft",
                                description: `Opening email to ${quote.customer}`,
                              });
                            }}
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Email Customer
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSendEmail(quote.customer)}
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Send Email
                          </Button>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-energy-green hover:bg-green-600"
                          onClick={() => handleUpdateStatus(quote.id)}
                        >
                          Update Status
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Completed Jobs Tab */}
            <TabsContent value="completed-jobs" className="space-y-6">
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Completed Jobs Yet</h3>
                <p className="text-gray-600">
                  Once you complete installations, they'll appear here with customer feedback and ratings.
                </p>
              </div>
            </TabsContent>

            {/* Service Areas Tab */}
            <TabsContent value="service-areas" className="space-y-6">
              <ServiceAreaManager installer={installerData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}