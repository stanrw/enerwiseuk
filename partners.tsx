import Header from "@/components/header";
import Footer from "@/components/footer";
import { Building2, Users, TrendingUp, Award, HandHeart, Wrench, Battery, Zap, Mail, MapPin, ArrowRight, Hammer, Settings, Screwdriver } from "lucide-react";

export default function Partners() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-energy-light via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
              <HandHeart className="w-4 h-4 mr-2" />
              Growing the UK's renewable energy future together
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Partner with
              <span className="block text-energy-green">Ener<span className="text-gray-900">wise</span></span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Join the UK's newest renewable energy marketplace helping homeowners 
              transition to clean energy solutions.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">£2.8B</div>
              <div className="text-gray-600 text-sm font-medium">Annual Market Opportunity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">28M</div>
              <div className="text-gray-600 text-sm font-medium">UK Households</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">18.5M</div>
              <div className="text-gray-600 text-sm font-medium">Households Looking for Renewables</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">19.9%</div>
              <div className="text-gray-600 text-sm font-medium">Market Growth Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who Can Join Ener<span className="text-energy-green">wise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We're building a comprehensive ecosystem of trusted renewable energy partners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* MCS Installers */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                MCS Certified Installers
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join our network of trusted installers serving the UK market. 
                Access qualified homeowners interested in renewable energy.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-energy-green rounded-full mr-3 flex-shrink-0"></div>
                  <span>£60-140 per qualified lead</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-energy-green rounded-full mr-3 flex-shrink-0"></div>
                  <span>15-25% conversion rates</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-energy-green rounded-full mr-3 flex-shrink-0"></div>
                  <span>Exclusive lead territories</span>
                </div>
              </div>
              <button className="w-full bg-energy-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-energy-dark transition-colors">
                Apply as Installer
              </button>
            </div>

            {/* Manufacturers */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Battery className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Technology Manufacturers
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Showcase your solar panels, batteries, heat pumps, or EV chargers to 
                qualified leads through our platform.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Product showcase opportunities</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Installer network access</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Performance analytics</span>
                </div>
              </div>
              <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Partner with Us
              </button>
            </div>

            {/* Energy Companies */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Energy Companies
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Connect with homeowners transitioning to renewable energy and 
                offer competitive tariffs for export payments.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Smart Export Guarantee access</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Customer acquisition</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Market intelligence</span>
                </div>
              </div>
              <button className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                Explore Partnership
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Partner with Ener<span className="text-energy-green">wise</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-energy-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Growing Market
              </h3>
              <p className="text-gray-600">
                The UK renewable energy market is growing at 19.9% annually, 
                reaching £72.1 billion by 2030.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quality Leads
              </h3>
              <p className="text-gray-600">
                Connect with pre-qualified homeowners who are actively seeking 
                renewable energy solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Trusted Platform
              </h3>
              <p className="text-gray-600">
                Join the UK's newest renewable energy platform built with 
                rigorous quality standards and MCS certification requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Business Growth
              </h3>
              <p className="text-gray-600">
                Scale your renewable energy business with our 
                comprehensive marketplace platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Partnership Requirements
            </h2>
            <p className="text-xl text-gray-600">
              We maintain high standards to ensure quality service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Installers</h3>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-energy-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">MCS Certification</h4>
                  <p className="text-gray-600">Valid MCS certification for all renewable technology installations</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-energy-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Insurance Coverage</h4>
                  <p className="text-gray-600">Minimum £2M public liability and relevant trade insurances</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-energy-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Customer Reviews</h4>
                  <p className="text-gray-600">Showcase excellence through customer reviews highlighting your best work</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-energy-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h4>
                  <p className="text-gray-600">Respond to leads within 24 hours and maintain professional standards</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Manufacturers</h3>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Product Certification</h4>
                  <p className="text-gray-600">All products must meet UK standards and relevant certifications</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Warranty Support</h4>
                  <p className="text-gray-600">Provide comprehensive warranty coverage and customer support</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Installer Training</h4>
                  <p className="text-gray-600">Provide training and support for installer partners</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">UK Presence</h4>
                  <p className="text-gray-600">Established UK operations with local support infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Partner with Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the UK's leading renewable energy marketplace and grow your business 
              with quality leads and trusted partnerships.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
              
              <div className="space-y-6">


                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Email</h4>
                    <p className="text-gray-600 mb-1">partners@enerwise.co.uk</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Address</h4>
                    <p className="text-gray-600 mb-1">41 Luke Street</p>
                    <p className="text-gray-600 mb-1">London EC2A 4DP</p>
                    <p className="text-sm text-gray-500">United Kingdom</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Partnership Benefits</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-energy-green rounded-full"></div>
                    <span className="text-gray-600">Qualified leads with 15-25% conversion rates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-energy-green rounded-full"></div>
                    <span className="text-gray-600">Dedicated account management support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-energy-green rounded-full"></div>
                    <span className="text-gray-600">Marketing tools and co-branded materials</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-energy-green rounded-full"></div>
                    <span className="text-gray-600">Performance analytics and insights</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply for Partnership</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
                    placeholder="Your Company Ltd"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partnership Type *
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent">
                    <option value="">Select partnership type</option>
                    <option value="installer">MCS Certified Installer</option>
                    <option value="manufacturer">Technology Manufacturer</option>
                    <option value="energy">Energy Company</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your business
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
                    placeholder="Describe your company, services, and why you'd like to partner with Enerwise..."
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-energy-green border-gray-300 rounded focus:ring-energy-green"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the Terms of Service and Privacy Policy, and consent to being contacted about partnership opportunities.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-energy-green to-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                >
                  Submit Application
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 text-center">
                  Applications are typically reviewed within 3-5 business days. 
                  We'll contact you to discuss next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}