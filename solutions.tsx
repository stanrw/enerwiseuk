import Header from "@/components/header";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { Sun, Battery, Zap, Car, ArrowRight, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Solutions() {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  const solutions = [
    {
      id: "solar",
      icon: Sun,
      title: "Solar Panels",
      description: "Harness the power of the sun to generate clean electricity for your home",
      benefits: [
        "Reduce electricity bills by up to 70%",
        "25-year manufacturer warranty",
        "Government Smart Export Guarantee",
        "Increase property value"
      ],
      savings: "£600-£1,200 annually",
      cost: "£4,000-£10,000",
      color: "from-yellow-500 to-orange-500",
      expandedContent: {
        howItWorks: "Solar panels convert sunlight into electricity using photovoltaic cells. The electricity is then converted by an inverter to power your home appliances and lighting.",
        installation: "Professional installation typically takes 1-2 days. Our MCS-certified installers handle all planning permissions and grid connections.",
        maintenance: "Solar panels require minimal maintenance - just occasional cleaning and annual health checks. Most systems come with 20-25 year warranties.",
        financing: "Available through 0% finance options, government schemes, and solar loans. Many homeowners see positive cash flow from month one."
      }
    },
    {
      id: "battery",
      icon: Battery,
      title: "Battery Storage",
      description: "Store excess solar energy to use when the sun isn't shining",
      benefits: [
        "Use solar power at night",
        "Backup power during outages",
        "Reduce grid dependency",
        "Maximize solar investment"
      ],
      savings: "£300-£600 annually",
      cost: "£3,000-£8,000",
      color: "from-green-500 to-teal-500",
      expandedContent: {
        howItWorks: "Battery storage systems capture excess solar energy during the day and store it for use when the sun isn't shining, maximizing your solar investment.",
        installation: "Battery systems integrate seamlessly with existing solar panels or can be installed standalone. Installation typically takes 4-6 hours.",
        maintenance: "Modern lithium batteries require virtually no maintenance and come with 10-15 year warranties with thousands of charge cycles.",
        financing: "Available through solar finance packages, government incentives, and standalone battery loans with competitive rates."
      }
    },
    {
      id: "heat-pump",
      icon: Zap,
      title: "Heat Pumps",
      description: "Efficient heating and hot water using renewable air or ground source energy",
      benefits: [
        "Up to 300% efficiency",
        "Lower carbon emissions",
        "Government grants available",
        "Year-round heating & cooling"
      ],
      savings: "£400-£800 annually",
      cost: "£8,000-£18,000",
      color: "from-blue-500 to-purple-500",
      expandedContent: {
        howItWorks: "Heat pumps extract heat from the air or ground and amplify it to heat your home. They're 3-4 times more efficient than traditional boilers.",
        installation: "Professional installation takes 1-3 days depending on system type. Includes full system design, installation, and commissioning.",
        maintenance: "Annual service recommended. Most components last 15-20 years with minimal maintenance requirements.",
        financing: "Boiler Upgrade Scheme provides up to £7,500 grants. Additional financing available through green home improvement loans."
      }
    },
    {
      id: "ev-charger",
      icon: Car,
      title: "EV Chargers",
      description: "Fast, convenient charging for your electric vehicle at home",
      benefits: [
        "Charge overnight with cheap rates",
        "Smart scheduling features",
        "Government grants available",
        "Increase property appeal"
      ],
      savings: "£800-£1,500 annually",
      cost: "£500-£1,500",
      color: "from-indigo-500 to-pink-500",
      expandedContent: {
        howItWorks: "Home EV chargers provide safe, fast charging for your electric vehicle. Smart chargers can schedule charging during off-peak hours for maximum savings.",
        installation: "Professional installation takes 2-4 hours. Includes electrical safety checks, mounting, and connection to your home's electrical system.",
        maintenance: "Minimal maintenance required. Most chargers are weatherproof and designed for outdoor use with long-term reliability.",
        financing: "OZEV grant provides up to £350 towards installation costs. Many energy suppliers offer special EV tariffs with cheap overnight rates."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Renewable Energy Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect renewable energy systems for your home. From solar panels 
              to heat pumps, we'll help you choose the right solution for maximum savings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution) => {
              const IconComponent = solution.icon;
              const isExpanded = expandedPanel === solution.id;
              
              return (
                <div 
                  key={solution.id} 
                  className={`bg-white rounded-2xl border transition-all duration-500 ease-out cursor-pointer transform hover:scale-[1.02] ${
                    isExpanded 
                      ? 'border-energy-green shadow-xl shadow-green-100/50 scale-[1.02]' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  } ${isExpanded ? 'p-8' : 'p-8'}`}
                  onClick={() => setExpandedPanel(isExpanded ? null : solution.id)}
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">{solution.title}</h3>
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-6">{solution.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Annual Savings</div>
                          <div className="font-semibold text-energy-green">{solution.savings}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Typical Cost</div>
                          <div className="font-semibold text-gray-900">{solution.cost}</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {solution.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-energy-green flex-shrink-0" />
                            <span className="text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expanded Content with Enhanced Animation */}
                      <div className={`overflow-hidden transition-all duration-700 ease-out ${
                        isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="border-t border-gray-100 pt-6 space-y-6">
                          {[
                            { title: "How It Works", content: solution.expandedContent.howItWorks, delay: "delay-100" },
                            { title: "Installation Process", content: solution.expandedContent.installation, delay: "delay-200" },
                            { title: "Maintenance", content: solution.expandedContent.maintenance, delay: "delay-300" },
                            { title: "Financing Options", content: solution.expandedContent.financing, delay: "delay-500" }
                          ].map((item, index) => (
                            <div 
                              key={index}
                              className={`transform transition-all duration-500 ease-out ${
                                isExpanded 
                                  ? `translate-y-0 opacity-100 ${item.delay}` 
                                  : 'translate-y-4 opacity-0'
                              }`}
                            >
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-energy-green rounded-full"></div>
                                {item.title}
                              </h4>
                              <p className="text-gray-600 leading-relaxed ml-4">{item.content}</p>
                            </div>
                          ))}
                          
                          <div className={`pt-6 transform transition-all duration-500 ease-out delay-500 ${
                            isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                          }`}>
                            <Link href="/">
                              <a className="group inline-flex items-center gap-3 bg-gradient-to-r from-energy-green to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                <span>Get Quote for {solution.title}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready to Start Saving?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
              Get personalised renewable energy recommendations and connect with trusted installers in your area.
            </p>
            
            <div className="mb-8">
              <Link href="/">
                <a className="inline-flex items-center gap-3 bg-energy-green hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
                  Get My Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-energy-green" />
                <span className="font-medium">Takes 30 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-energy-green" />
                <span className="font-medium">100% free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-energy-green" />
                <span className="font-medium">No commitment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}