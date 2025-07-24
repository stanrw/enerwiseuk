import Header from "@/components/header";
import Footer from "@/components/footer";
import { Home, Search, Calculator, Users, CheckCircle, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-energy-light via-white to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Trusted platform for UK homeowners
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            How Ener<span className="text-energy-green">wise</span> Works
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Your complete journey to renewable energy savings, simplified into three easy steps.
          </p>
        </div>
      </section>

      {/* Three Step Process */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Three Simple Steps to Energy Savings
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From your first question to installation, we make renewable energy simple and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-energy-green to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-3xl font-bold">🏠</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  Get Your Assessment
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  Enter your postcode and let our AI assess your property's renewable energy potential. 
                  Takes just 30 seconds.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                  <div className="font-semibold mb-2">What we analyse:</div>
                  <ul className="space-y-1">
                    <li>• Roof size and orientation</li>
                    <li>• Local sun exposure</li>
                    <li>• Property type and age</li>
                    <li>• Your area's energy rates</li>
                  </ul>
                </div>
              </div>
              {/* Connecting line */}
              <div className="hidden md:block absolute top-10 left-full w-12 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-energy-green to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-3xl font-bold">💰</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  See Your Savings
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  Get personalised recommendations with clear costs, savings, and payback periods. 
                  No hidden fees or pushy sales.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                  <div className="font-semibold mb-2">Your report includes:</div>
                  <ul className="space-y-1">
                    <li>• Annual savings potential</li>
                    <li>• Installation costs</li>
                    <li>• Government grants available</li>
                    <li>• Return on investment</li>
                  </ul>
                </div>
              </div>
              {/* Connecting line */}
              <div className="hidden md:block absolute top-10 left-full w-12 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-energy-green to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-3xl font-bold">👥</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  Choose Your Installer
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  Connect with vetted, MCS-certified installers in your area. 
                  Compare quotes and reviews to find the perfect fit.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                  <div className="font-semibold mb-2">All installers are:</div>
                  <ul className="space-y-1">
                    <li>• MCS certified</li>
                    <li>• Customer reviewed</li>
                    <li>• Insurance verified</li>
                    <li>• Local to your area</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Makes Ener<span className="text-energy-green">wise</span> Different
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium">
              We solve the biggest problems homeowners face when exploring renewable energy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-energy-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Trusted MCS Installers Only
              </h3>
              <p className="text-gray-600 font-medium">
                All our installers are MCS-certified and thoroughly vetted. No more worrying about 
                questionable companies or pushy sales tactics.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Clear, Honest Pricing
              </h3>
              <p className="text-gray-600 font-medium">
                Transparent costs with no hidden fees. Average solar systems cost £8,200 
                with £730 annual savings and 5-7 year payback periods.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Simplified Process
              </h3>
              <p className="text-gray-600 font-medium">
                We handle the complexity for you. From assessment to installation, 
                we guide you through every step of your renewable energy journey.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real Government Data
              </h3>
              <p className="text-gray-600 font-medium">
                We use authentic UK government property data and Google Solar API 
                for accurate roof analysis, ensuring realistic savings calculations.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                MCS Certified Network
              </h3>
              <p className="text-gray-600 font-medium">
                Connect with vetted, MCS-certified installers in your area. 
                All installers are pre-screened for quality and reliability.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-energy-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Every Home is Different
              </h3>
              <p className="text-gray-600 font-medium">
                Every recommendation is tailored to your specific property, location, 
                and energy needs. No generic, one-size-fits-all solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-energy-light via-white to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Start your renewable energy journey with the UK's most advanced property assessment platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Link href="/assessment">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-energy-green">
                <div className="w-16 h-16 bg-gradient-to-br from-energy-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get Assessment</h3>
                <p className="text-gray-600 mb-6">
                  Start with a free 30-second assessment of your property's renewable energy potential.
                </p>
                <div className="flex items-center justify-center text-energy-green font-semibold group-hover:gap-3 transition-all">
                  <span>Start Assessment</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            <Link href="/meet-orla">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-energy-green">
                <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-energy-green opacity-15" 
                       style={{ 
                         animation: 'pulse 3s ease-in-out infinite',
                         transform: 'scale(1)'
                       }}></div>
                  <div className="absolute inset-2 rounded-full bg-energy-green opacity-30" 
                       style={{ 
                         animation: 'pulse 3.5s ease-in-out infinite 0.5s',
                         transform: 'scale(1)'
                       }}></div>
                  <div className="absolute inset-4 rounded-full bg-energy-green opacity-60" 
                       style={{ 
                         animation: 'pulse 4s ease-in-out infinite 1s',
                         transform: 'scale(1)'
                       }}></div>
                  <div className="relative w-8 h-8 bg-energy-green rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Talk to Orla</h3>
                <p className="text-gray-600 mb-6">
                  Ask questions and get expert advice about renewable energy for your home.
                </p>
                <div className="flex items-center justify-center text-energy-green font-semibold group-hover:gap-3 transition-all">
                  <span>Meet Orla</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}