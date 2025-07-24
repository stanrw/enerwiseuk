import { Link } from "wouter";
import { Zap, ArrowLeft, Calculator, AlertTriangle, TrendingUp, MapPin } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ROIDisclaimer() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <Calculator className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ROI Calculator Disclaimer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Important information about our energy savings estimates and calculation methodology
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: July 14, 2025 | Version 2.1
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* Important Warning */}
          <section>
            <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-500">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-amber-900 mb-3">Important Notice</h2>
                  <p className="text-amber-800 mb-4">
                    The calculations provided by our ROI calculator are estimates only and should not be considered 
                    as guaranteed financial returns or professional financial advice. Actual savings may vary 
                    significantly based on numerous factors beyond our control.
                  </p>
                  <p className="text-amber-700 font-medium">
                    Always seek independent professional advice before making significant financial decisions 
                    regarding renewable energy installations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What Our Calculator Does */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Our Calculator Provides</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-lg p-6">
                <h3 className="font-semibold text-emerald-900 mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Estimates Include
                </h3>
                <ul className="text-emerald-800 space-y-2 text-sm">
                  <li>• Potential annual energy savings in £</li>
                  <li>• Estimated payback periods in years</li>
                  <li>• Solar generation estimates based on location</li>
                  <li>• Battery storage optimisation calculations</li>
                  <li>• Heat pump efficiency projections</li>
                  <li>• Regional performance variations</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Data Sources
                </h3>
                <ul className="text-blue-800 space-y-2 text-sm">
                  <li>• UK government EPC database</li>
                  <li>• Ofgem energy tariff data</li>
                  <li>• Met Office solar irradiance maps</li>
                  <li>• Industry-standard equipment specifications</li>
                  <li>• Regional climate data</li>
                  <li>• Current market prices and incentives</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Factors Affecting Actual Results */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Factors That May Affect Actual Results</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                <h3 className="font-semibold text-red-900 mb-3">Property-Specific Variables</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-red-800 space-y-2 text-sm">
                    <li>• Roof orientation, pitch, and shading</li>
                    <li>• Building fabric and insulation quality</li>
                    <li>• Existing heating system efficiency</li>
                    <li>• Property age and construction type</li>
                  </ul>
                  <ul className="text-red-800 space-y-2 text-sm">
                    <li>• Local planning restrictions</li>
                    <li>• Structural suitability for installations</li>
                    <li>• Electrical system compatibility</li>
                    <li>• Access and installation complexities</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
                <h3 className="font-semibold text-orange-900 mb-3">Usage Pattern Variables</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-orange-800 space-y-2 text-sm">
                    <li>• Actual vs. estimated energy consumption</li>
                    <li>• Seasonal usage variations</li>
                    <li>• Occupancy patterns and lifestyle changes</li>
                    <li>• Appliance efficiency and smart controls</li>
                  </ul>
                  <ul className="text-orange-800 space-y-2 text-sm">
                    <li>• Peak vs. off-peak usage timing</li>
                    <li>• Electric vehicle charging patterns</li>
                    <li>• Home working and occupancy changes</li>
                    <li>• Future energy consumption growth</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                <h3 className="font-semibold text-purple-900 mb-3">External Economic Factors</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-purple-800 space-y-2 text-sm">
                    <li>• Energy price volatility and tariff changes</li>
                    <li>• Government policy and incentive modifications</li>
                    <li>• Technology costs and efficiency improvements</li>
                    <li>• Installation costs and labour availability</li>
                  </ul>
                  <ul className="text-purple-800 space-y-2 text-sm">
                    <li>• Interest rates and financing terms</li>
                    <li>• Inflation and maintenance cost increases</li>
                    <li>• Grid export rate changes</li>
                    <li>• Equipment performance degradation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Accuracy Limitations */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Accuracy Limitations</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Our calculations are based on the best available data and industry-standard methodologies, 
                but they cannot account for every variable that may affect your actual results:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Typical Variance Ranges</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Annual savings: ±20-30%</li>
                    <li>• Installation costs: ±15-25%</li>
                    <li>• Payback periods: ±2-3 years</li>
                    <li>• Energy generation: ±15-20%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Best Practice Recommendations</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Obtain multiple professional quotes</li>
                    <li>• Consider site-specific surveys</li>
                    <li>• Review actual energy usage data</li>
                    <li>• Factor in future energy needs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Questions About Our Calculations</h2>
            
            <div className="bg-energy-green/10 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                If you have questions about our methodology or need clarification about specific calculations, 
                please contact our technical team:
              </p>
              <div className="text-energy-green font-medium">
                Email: technical@enerwise.uk
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}