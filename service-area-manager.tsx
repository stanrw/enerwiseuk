import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Settings,
  Map,
  Zap,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ServiceAreaManagerProps {
  installer: {
    id: number;
    name: string;
    hqAddress?: string;
    hqPostcode?: string;
    serviceRadius: number;
    maxServiceRadius: number;
    subscriptionTier: string;
    radiusUpgradeEndDate?: string;
    additionalServiceAreas?: Array<{
      postcode: string;
      lat: number;
      lng: number;
      radius: number;
    }>;
  };
}

export default function ServiceAreaManager({ installer }: ServiceAreaManagerProps) {
  const [hqAddress, setHqAddress] = useState(installer.hqAddress || "");
  const [hqPostcode, setHqPostcode] = useState(installer.hqPostcode || "");
  const [desiredRadius, setDesiredRadius] = useState(installer.serviceRadius);
  const [newServiceArea, setNewServiceArea] = useState({ postcode: "", radius: 20 });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Subscription tier limits
  const tierLimits = {
    basic: { maxRadius: 30, includedAreas: 1, price: 0 },
    standard: { maxRadius: 50, includedAreas: 3, price: 49 },
    premium: { maxRadius: 100, includedAreas: 10, price: 149 }
  };

  const currentTierLimit = tierLimits[installer.subscriptionTier as keyof typeof tierLimits] || tierLimits.basic;

  // Calculate upgrade pricing
  const calculateRadiusUpgrade = (fromRadius: number, toRadius: number) => {
    if (toRadius <= currentTierLimit.maxRadius) return 0;
    const extraMiles = toRadius - currentTierLimit.maxRadius;
    return extraMiles * 5; // £5 per mile per month beyond tier limit
  };

  const calculateAreaUpgrade = (currentAreas: number, newAreas: number) => {
    if (newAreas <= currentTierLimit.includedAreas) return 0;
    const extraAreas = newAreas - currentTierLimit.includedAreas;
    return extraAreas * 25; // £25 per additional area per month
  };

  // Update HQ location
  const updateHQMutation = useMutation({
    mutationFn: async (data: { address: string; postcode: string }) => {
      return apiRequest("PATCH", `/api/installer/${installer.id}/headquarters`, data);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Headquarters location updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/installer/profile"] });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update headquarters location.",
        variant: "destructive" 
      });
    }
  });

  // Update service radius
  const updateRadiusMutation = useMutation({
    mutationFn: async (data: { radius: number; upgradePayment?: boolean }) => {
      return apiRequest("PATCH", `/api/installer/${installer.id}/service-radius`, data);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Service radius updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/installer/profile"] });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update service radius.",
        variant: "destructive" 
      });
    }
  });

  // Add additional service area
  const addAreaMutation = useMutation({
    mutationFn: async (data: { postcode: string; radius: number }) => {
      return apiRequest("POST", `/api/installer/${installer.id}/service-areas`, data);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Service area added successfully." });
      setNewServiceArea({ postcode: "", radius: 20 });
      queryClient.invalidateQueries({ queryKey: ["/api/installer/profile"] });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to add service area.",
        variant: "destructive" 
      });
    }
  });

  // Payment processing (Coming Soon)
  const showPaymentComingSoon = () => {
    toast({ 
      title: "Coming Soon", 
      description: "Payment processing for service area upgrades will be available soon.",
      variant: "default" 
    });
  };

  const handleUpdateHQ = () => {
    if (!hqAddress || !hqPostcode) {
      toast({ 
        title: "Error", 
        description: "Please enter both address and postcode.",
        variant: "destructive" 
      });
      return;
    }
    updateHQMutation.mutate({ address: hqAddress, postcode: hqPostcode });
  };

  const handleUpdateRadius = (requiresPayment: boolean) => {
    if (requiresPayment) {
      showPaymentComingSoon();
    } else {
      updateRadiusMutation.mutate({ radius: desiredRadius });
    }
  };

  const handleAddServiceArea = () => {
    if (!newServiceArea.postcode) {
      toast({ 
        title: "Error", 
        description: "Please enter a postcode.",
        variant: "destructive" 
      });
      return;
    }

    const currentAreas = installer.additionalServiceAreas?.length || 0;
    const requiresPayment = currentAreas >= currentTierLimit.includedAreas;

    if (requiresPayment) {
      showPaymentComingSoon();
    } else {
      addAreaMutation.mutate(newServiceArea);
    }
  };

  const radiusUpgradePrice = calculateRadiusUpgrade(installer.serviceRadius, desiredRadius);
  const requiresRadiusPayment = desiredRadius > currentTierLimit.maxRadius;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="w-5 h-5 text-blue-600" />
          Service Area Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="headquarters" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="headquarters">Headquarters</TabsTrigger>
            <TabsTrigger value="radius">Service Radius</TabsTrigger>
            <TabsTrigger value="areas">Additional Areas</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>

          {/* Headquarters Tab */}
          <TabsContent value="headquarters" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="hq-address">Headquarters Address</Label>
                <Input
                  id="hq-address"
                  value={hqAddress}
                  onChange={(e) => setHqAddress(e.target.value)}
                  placeholder="Enter your company address"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="hq-postcode">Postcode</Label>
                <Input
                  id="hq-postcode"
                  value={hqPostcode}
                  onChange={(e) => setHqPostcode(e.target.value)}
                  placeholder="SW1A 1AA"
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={handleUpdateHQ}
                disabled={updateHQMutation.isPending}
                className="w-full"
              >
                {updateHQMutation.isPending ? "Updating..." : "Update Headquarters"}
              </Button>
            </div>

            {installer.hqAddress && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Current Headquarters</span>
                </div>
                <p className="text-green-700">{installer.hqAddress}</p>
                <p className="text-green-700">{installer.hqPostcode}</p>
              </div>
            )}
          </TabsContent>

          {/* Service Radius Tab */}
          <TabsContent value="radius" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="service-radius">Service Radius (miles)</Label>
                <div className="flex items-center gap-4 mt-1">
                  <Input
                    id="service-radius"
                    type="number"
                    min="5"
                    max="200"
                    value={desiredRadius}
                    onChange={(e) => setDesiredRadius(Number(e.target.value))}
                    className="flex-1"
                  />
                  <Badge variant={requiresRadiusPayment ? "destructive" : "secondary"}>
                    Current: {installer.serviceRadius} miles
                  </Badge>
                </div>
              </div>

              {requiresRadiusPayment && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-amber-800">Upgrade Required</span>
                  </div>
                  <p className="text-amber-700 mb-2">
                    Your {installer.subscriptionTier} subscription includes up to {currentTierLimit.maxRadius} miles. 
                    Extending to {desiredRadius} miles requires a paid upgrade.
                  </p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-amber-800">£{radiusUpgradePrice}/month</span>
                  </div>
                </div>
              )}

              <Button 
                onClick={() => handleUpdateRadius(requiresRadiusPayment)}
                disabled={updateRadiusMutation.isPending || desiredRadius === installer.serviceRadius}
                className="w-full"
              >
                {requiresRadiusPayment ? `Upgrade Radius for £${radiusUpgradePrice}/month` : "Update Radius"}
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Coverage Information</h4>
              <div className="space-y-1 text-blue-700">
                <p>• Estimated coverage area: ~{Math.round(Math.PI * Math.pow(desiredRadius, 2))} square miles</p>
                <p>• Approximate travel time: {Math.round(desiredRadius / 30 * 60)} minutes to edge</p>
                <p>• Fuel cost estimate: £{Math.round(desiredRadius * 0.5)} per round trip</p>
              </div>
            </div>
          </TabsContent>

          {/* Additional Areas Tab */}
          <TabsContent value="areas" className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="new-postcode">Postcode</Label>
                  <Input
                    id="new-postcode"
                    value={newServiceArea.postcode}
                    onChange={(e) => setNewServiceArea({...newServiceArea, postcode: e.target.value})}
                    placeholder="M1 1AA"
                    className="mt-1"
                  />
                </div>
                <div className="w-32">
                  <Label htmlFor="area-radius">Radius (miles)</Label>
                  <Input
                    id="area-radius"
                    type="number"
                    min="5"
                    max="50"
                    value={newServiceArea.radius}
                    onChange={(e) => setNewServiceArea({...newServiceArea, radius: Number(e.target.value)})}
                    className="mt-1"
                  />
                </div>
              </div>

              <Button 
                onClick={handleAddServiceArea}
                disabled={addAreaMutation.isPending}
                className="w-full"
              >
                Add Service Area
              </Button>
            </div>

            {installer.additionalServiceAreas && installer.additionalServiceAreas.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Current Additional Areas</h4>
                {installer.additionalServiceAreas.map((area, index) => (
                  <div key={index} className="bg-gray-50 border rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <span className="font-medium">{area.postcode}</span>
                      <span className="text-gray-600 ml-2">{area.radius} mile radius</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Your {installer.subscriptionTier} Plan</span>
              </div>
              <p className="text-green-700">
                Includes {currentTierLimit.includedAreas} additional service areas. 
                Extra areas cost £25/month each.
              </p>
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {Object.entries(tierLimits).map(([tier, limits]) => (
                <Card key={tier} className={installer.subscriptionTier === tier ? "ring-2 ring-blue-500" : ""}>
                  <CardHeader>
                    <CardTitle className="capitalize">{tier}</CardTitle>
                    <div className="text-2xl font-bold">£{limits.price}/month</div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Max Radius</span>
                        <span className="font-medium">{limits.maxRadius} miles</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Additional Areas</span>
                        <span className="font-medium">{limits.includedAreas}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Priority Support</span>
                        <span className="font-medium">{tier !== 'basic' ? '✓' : '✗'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Lead Analytics</span>
                        <span className="font-medium">{tier === 'premium' ? '✓' : '✗'}</span>
                      </div>
                    </div>
                    {installer.subscriptionTier !== tier && (
                      <Button className="w-full" variant={tier === 'premium' ? 'default' : 'outline'}>
                        {tier === 'basic' ? 'Downgrade' : 'Upgrade'}
                      </Button>
                    )}
                    {installer.subscriptionTier === tier && (
                      <Badge className="w-full justify-center">Current Plan</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {installer.radiusUpgradeEndDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Active Upgrade</span>
                </div>
                <p className="text-blue-700">
                  Your extended service radius is active until {new Date(installer.radiusUpgradeEndDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}