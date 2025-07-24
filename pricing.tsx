import { Link } from "wouter";
import { Zap, ArrowLeft, CreditCard, Users, CheckCircle, Info } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-energy-green/10 rounded-full">
              <CreditCard className="h-8 w-8 text-energy-green" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparent pricing for homeowners and installers using the Enerwise platform
          </p>
        </div>

        {/* Homeowner Pricing */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <div className="text-center mb-8">
            <div className="p-3 bg-energy-green/10 rounded-full w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-energy-green" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Homeowners</h2>
            <p className="text-lg text-gray-600">Everything you need to find the right renewable energy solution</p>
          </div>

          <div className="bg-energy-green/10 rounded-2xl p-8 text-center border-2 border-energy-green/20">
            <div className="text-5xl font-bold text-energy-green mb-4">£0</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Completely Free</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <ul className="text-left space-y-3">
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-energy-green" />
                  Unlimited use of ROI calculator
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-energy-green" />
                  Property data lookup via EPC database
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-energy-green" />
                  Regional solar and energy calculations
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-energy-green" />
                  Submit tender requests to installers
                </li>
              </ul>
              
              <ul className="text-left space-y-3">
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-energy-green" />
                  Receive and compare installer quotes
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-energy-green" />
                  Secure customer dashboard
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-energy-green" />
                  Educational resources and guides
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-energy-green" />
                  Customer support and protection
                </li>
              </ul>
            </div>

            <Link href="/">
              <button className="bg-energy-green hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition duration-200">
                Get Started Today
              </button>
            </Link>
          </div>
        </div>

        {/* Installer Pricing */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <div className="text-center mb-8">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Installers</h2>
            <p className="text-lg text-gray-600">Pay-per-lead pricing with no monthly fees or commitments</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Credit System */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Credit System</h3>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">£25</div>
                <div className="text-blue-800">per credit (+ VAT)</div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-blue-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                  <span>1 credit = access to full homeowner details</span>
                </li>
                <li className="flex items-start text-blue-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                  <span>Credits valid for 12 months</span>
                </li>
                <li className="flex items-start text-blue-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                  <span>Bulk credit packages available</span>
                </li>
                <li className="flex items-start text-blue-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                  <span>14-day refund on unused credits</span>
                </li>
              </ul>

              <div className="bg-blue-100 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">What's Included</h4>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Complete homeowner contact details</li>
                  <li>• Property specifications and requirements</li>
                  <li>• Energy consumption and EPC data</li>
                  <li>• Project timeline and budget information</li>
                </ul>
              </div>
            </div>

            {/* Success Fee */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Success Fee</h3>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">2.5%</div>
                <div className="text-purple-800">of completed project value</div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-purple-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
                  <span>Only charged on successful installations</span>
                </li>
                <li className="flex items-start text-purple-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
                  <span>Transparent fee structure</span>
                </li>
                <li className="flex items-start text-purple-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
                  <span>No hidden charges or additional costs</span>
                </li>
                <li className="flex items-start text-purple-800">
                  <CheckCircle className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
                  <span>Collected upon project completion</span>
                </li>
              </ul>

              <div className="bg-purple-100 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Example Calculation</h4>
                <div className="text-purple-800 text-sm">
                  <div>£20,000 installation = £500 success fee</div>
                  <div>£10,000 installation = £250 success fee</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/installer-auth">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition duration-200 mr-4">
                Join as Installer
              </button>
            </Link>
            <Link href="/installer-terms">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-lg text-lg transition duration-200">
                View Terms
              </button>
            </Link>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-100 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-gray-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Additional Information</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• All prices shown exclude VAT where applicable</li>
                <li>• Credit purchases are non-refundable once used to access customer data</li>
                <li>• Success fees are automatically calculated and invoiced monthly</li>
                <li>• Volume discounts available for high-volume installers</li>
                <li>• Payment terms: 30 days from invoice date</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}