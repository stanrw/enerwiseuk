import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ResultsDashboard from "@/components/results-dashboard";
import InstallerCard from "@/components/installer-card";
import LeadForm from "@/components/lead-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AssessmentResult } from "@/lib/types";

export default function Results() {
  const [, setLocation] = useLocation();
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('assessmentResult');
    if (storedResult) {
      setAssessmentResult(JSON.parse(storedResult));
    } else {
      setLocation('/assessment');
    }
  }, [setLocation]);

  if (!assessmentResult) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Renewable Energy Plan</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on your property analysis, here are your personalised renewable energy recommendations
            </p>
          </div>

          <ResultsDashboard assessment={assessmentResult.assessment} />

          {/* Recommended Installers */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recommended Installers</h2>
            {assessmentResult.installers && assessmentResult.installers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessmentResult.installers.map((installer) => (
                  <InstallerCard key={installer.id} installer={installer} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-energy-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  We're Finding Local Installers for You
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Our team is currently matching you with qualified MCS-certified installers in your area. 
                  We'll connect you with 3 top-rated local professionals who specialize in your recommended systems.
                </p>
                <Button 
                  onClick={() => setShowLeadForm(true)}
                  className="bg-energy-green hover:bg-energy-dark text-white px-8 py-3 text-lg"
                >
                  Get Connected with Installers
                </Button>
              </div>
            )}
          </div>


        </div>
      </section>

      <Footer />

      {showLeadForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get Your Detailed Quote</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowLeadForm(false)}
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <LeadForm 
                onSuccess={() => {
                  setShowLeadForm(false);
                  // Show success message
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
