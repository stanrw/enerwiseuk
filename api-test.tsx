import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function APITest() {
  const [address, setAddress] = useState("20 Priolo Road, London SE7 7PT");
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const runAPITest = async () => {
    setIsLoading(true);
    setTestResults(null);
    
    try {
      const response = await fetch("/api/test-apis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();
      setTestResults(data);
    } catch (error) {
      console.error("API test error:", error);
      setTestResults({
        error: "Failed to test APIs",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (working: boolean) => {
    return working ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    );
  };

  const getStatusBadge = (working: boolean) => {
    return working ? (
      <Badge variant="outline" className="text-green-600 border-green-600">
        Working
      </Badge>
    ) : (
      <Badge variant="outline" className="text-red-600 border-red-600">
        Not Available
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Integration Test</h1>
          <p className="text-gray-600">
            Test the various APIs used by Enerwise to ensure they're working correctly.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Test Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter a UK address to test"
              />
            </div>
            <Button onClick={runAPITest} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Testing APIs...
                </>
              ) : (
                "Run API Test"
              )}
            </Button>
          </CardContent>
        </Card>

        {testResults && (
          <div className="grid gap-6">
            {testResults.error ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Test Failed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-600">{testResults.error}</p>
                  {testResults.details && (
                    <p className="text-sm text-gray-600 mt-2">{testResults.details}</p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Test Results Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(testResults.googleMapsWorking)}
                          <span className="font-medium">Google Maps</span>
                        </div>
                        {getStatusBadge(testResults.googleMapsWorking)}
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(testResults.googleSolarWorking)}
                          <span className="font-medium">Google Solar</span>
                        </div>
                        {getStatusBadge(testResults.googleSolarWorking)}
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(testResults.epcWorking)}
                          <span className="font-medium">EPC Database</span>
                        </div>
                        {getStatusBadge(testResults.epcWorking)}
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(testResults.osDatahubWorking)}
                          <span className="font-medium">OS DataHub</span>
                        </div>
                        {getStatusBadge(testResults.osDatahubWorking)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Test Address</h4>
                        <p className="text-sm text-gray-600">{testResults.address}</p>
                      </div>
                      
                      {testResults.coordinates && (
                        <div>
                          <h4 className="font-medium mb-2">Coordinates</h4>
                          <p className="text-sm text-gray-600">
                            Latitude: {testResults.coordinates.lat}, Longitude: {testResults.coordinates.lng}
                          </p>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-medium mb-2">Raw Test Data</h4>
                        <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
                          {JSON.stringify(testResults.testResults, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}