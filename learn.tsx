import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Sun, 
  Battery, 
  Thermometer, 
  Car, 
  PoundSterling, 
  Lightbulb,
  Clock,
  Star,
  Users,
  Award,
  Shield,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Droplet as DropletIcon,
  Eye,
  Power,
  Timer,
  Zap
} from "lucide-react";

interface GuideContent {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lastUpdated: string;
  sections: {
    title: string;
    content: string;
    subsections?: { title: string; content: string; }[];
  }[];
  keyTakeaways: string[];
  nextSteps: string[];
}

export default function Learn() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch all article views
  const { data: articleViews = {} } = useQuery({
    queryKey: ['/api/articles/views'],
    retry: false,
  });

  // Track article view mutation
  const trackViewMutation = useMutation({
    mutationFn: async (articleId: string) => {
      const response = await apiRequest("POST", `/api/articles/${articleId}/view`, {});
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles/views'] });
    },
  });

  const handleGuideClick = (guideId: string) => {
    setSelectedGuide(guideId);
    trackViewMutation.mutate(guideId);
  };

  const learningTopics = [
    {
      id: "solar-installation-guide",
      title: "Complete Solar Panel Installation Guide",
      description: "Everything you need to know about solar panel installation in the UK, from planning permission to system commissioning.",
      category: "SOLAR",
      categoryColor: "bg-energy-amber",
      icon: Sun,
      difficulty: "Intermediate" as const,
      readTime: "15 min read"
    },
    {
      id: "maximizing-solar-battery-storage", 
      title: "Maximising Solar Battery Storage Returns",
      description: "Expert strategies for optimising battery storage systems, including sizing, placement, and smart energy management.",
      category: "BATTERY",
      categoryColor: "bg-blue-600",
      icon: Battery,
      difficulty: "Advanced" as const,
      readTime: "12 min read"
    },
    {
      id: "heat-pumps-vs-gas-boilers",
      title: "Heat Pumps vs Gas Boilers: Complete Comparison",
      description: "Detailed analysis of heat pump efficiency, costs, and suitability compared to traditional gas boilers.",
      category: "HEATING",
      categoryColor: "bg-red-600",
      icon: Thermometer,
      difficulty: "Beginner" as const,
      readTime: "10 min read"
    },
    {
      id: "government-grants-and-incentives",
      title: "UK Government Grants & Incentives 2025",
      description: "Complete guide to available grants, tax breaks, and financial incentives for renewable energy installations.",
      category: "FINANCE",
      categoryColor: "bg-green-600",
      icon: PoundSterling,
      difficulty: "Beginner" as const,
      readTime: "8 min read"
    },
    {
      id: "ev-charging-home-installation",
      title: "EV Charging: Home Installation Guide",
      description: "Everything about installing electric vehicle charging points, from electrical requirements to smart charging features.",
      category: "EV CHARGING",
      categoryColor: "bg-purple-600",
      icon: Car,
      difficulty: "Intermediate" as const,
      readTime: "14 min read"
    },
    {
      id: "energy-efficiency-home-improvements",
      title: "Energy Efficiency: Home Improvements That Matter",
      description: "Cost-effective improvements to reduce energy consumption before investing in renewable technology systems.",
      category: "EFFICIENCY",
      categoryColor: "bg-indigo-600",
      icon: Lightbulb,
      difficulty: "Beginner" as const,
      readTime: "11 min read"
    }
  ];

  const guideContent: Record<string, GuideContent> = {
    "solar-installation-guide": {
      id: "solar-installation-guide",
      title: "Complete Solar Panel Installation Guide",
      category: "SOLAR",
      categoryColor: "bg-energy-amber",
      readTime: "15 min read",
      difficulty: "Intermediate",
      lastUpdated: "December 2024",
      sections: [
        {
          title: "Planning Your Solar Installation",
          content: "Before installing solar panels, proper planning ensures maximum efficiency and compliance with UK regulations.",
          subsections: [
            {
              title: "Planning Permission",
              content: "Most UK homes don't need planning permission for solar panels, but check with your local council if you live in a conservation area or listed building. Systems must be sited to minimise impact on the building and local amenity."
            },
            {
              title: "Roof Suitability Assessment",
              content: "South-facing roofs are ideal, but east/west-facing roofs can still be effective. Your roof should be structurally sound, not heavily shaded, and have sufficient space for the system size you need."
            },
            {
              title: "System Sizing",
              content: "Average UK home needs 3-4kW system (10-16 panels). Consider your annual electricity usage, available roof space, and budget. A typical 4kW system covers 50-70% of average household consumption."
            }
          ]
        },
        {
          title: "UK Regulations & Standards",
          content: "Solar installations must comply with strict UK building and electrical regulations to ensure safety and performance.",
          subsections: [
            {
              title: "MCS Certification",
              content: "Only use MCS-certified installers to qualify for SEG payments and maintain warranties. MCS ensures installations meet quality standards and installer competency requirements."
            },
            {
              title: "Building Regulations",
              content: "Solar installations must comply with Part P electrical safety regulations. Professional installers handle building control notifications and ensure compliance with BS 7909 standards."
            },
            {
              title: "DNO Approval",
              content: "Systems over 3.68kW need approval from your Distribution Network Operator. Your installer will submit G99 applications and handle the approval process on your behalf."
            }
          ]
        }
      ],
      keyTakeaways: [
        "Use only MCS-certified installers for quality assurance and SEG eligibility",
        "0% VAT saves £1,000-£2,000 on typical installations until March 2027", 
        "4kW system typically covers 50-70% of household electricity consumption",
        "SEG payments provide ongoing income from excess energy exports",
        "Professional installation takes 1-2 days with minimal disruption"
      ],
      nextSteps: [
        "Get multiple quotes from MCS-certified installers",
        "Schedule professional roof and electrical assessment",
        "Compare SEG tariffs from different energy suppliers",
        "Consider battery storage for increased energy independence",
        "Review home insurance coverage for new installation"
      ]
    },
    "maximizing-solar-battery-storage": {
      id: "maximizing-solar-battery-storage",
      title: "Maximising Solar Battery Storage Returns",
      category: "BATTERY",
      categoryColor: "bg-blue-600",
      readTime: "12 min read",
      difficulty: "Advanced",
      lastUpdated: "December 2024",
      sections: [
        {
          title: "Understanding Battery Storage Economics",
          content: "Battery storage systems require careful financial analysis to maximise returns on investment.",
          subsections: [
            {
              title: "Time-of-Use Tariffs",
              content: "Economy 7 and Octopus Agile tariffs offer significant savings. Store cheap night-time electricity (7p/kWh) and use during peak hours (30p+/kWh). Annual savings: £400-800 for typical household."
            },
            {
              title: "Self-Consumption Optimisation",
              content: "Increase solar self-consumption from 30% to 70% with battery storage. Store excess solar generation during day for evening use when panels aren't producing electricity."
            },
            {
              title: "Grid Services Revenue",
              content: "Earn £200-400 annually through grid balancing services like frequency response. Tesla Powerwall and Sonnen batteries offer automated participation in these schemes."
            }
          ]
        },
        {
          title: "Technical Sizing & Installation",
          content: "Proper battery sizing and installation ensures optimal performance and longevity.",
          subsections: [
            {
              title: "Capacity Sizing",
              content: "Size battery to 80% of evening electricity consumption. Typical UK home needs 8-13.5kWh capacity. Oversizing reduces efficiency and increases costs unnecessarily."
            },
            {
              title: "Inverter Compatibility", 
              content: "AC-coupled systems (like Tesla Powerwall) work with any solar inverter. DC-coupled systems require compatible hybrid inverters but offer 5-8% higher efficiency."
            },
            {
              title: "Installation Requirements",
              content: "Install in well-ventilated area, away from direct sunlight. Maintain 10-30°C operating temperature. Ground-floor installation preferred for safety and maintenance access."
            }
          ]
        }
      ],
      keyTakeaways: [
        "Time-of-use tariffs essential for battery storage economics",
        "8-13.5kWh capacity suitable for typical UK households",
        "Battery systems increase solar self-consumption from 30% to 70%",
        "Grid services can provide £200-400 additional annual revenue",
        "AC-coupled systems offer greater flexibility but lower efficiency"
      ],
      nextSteps: [
        "Calculate current evening electricity consumption patterns",
        "Compare time-of-use tariffs from different suppliers",
        "Get quotes for both AC and DC-coupled battery systems",
        "Investigate grid services eligibility and revenue potential",
        "Plan installation location and electrical connections"
      ]
    },
    "heat-pumps-vs-gas-boilers": {
      id: "heat-pumps-vs-gas-boilers",
      title: "Heat Pumps vs Gas Boilers: Complete Comparison",
      category: "HEATING",
      categoryColor: "bg-red-600",
      readTime: "10 min read",
      difficulty: "Beginner",
      lastUpdated: "December 2024",
      sections: [
        {
          title: "Efficiency & Running Costs",
          content: "Heat pumps offer superior efficiency but installation and running costs vary significantly.",
          subsections: [
            {
              title: "Heat Pump Efficiency",
              content: "Modern heat pumps achieve 300-400% efficiency (COP 3-4). Extract 3-4 units of heat energy for every unit of electricity consumed. Most efficient renewable heating technology available."
            },
            {
              title: "Gas Boiler Efficiency",
              content: "Best condensing gas boilers achieve 90-95% efficiency. Convert 90-95% of gas into useful heat energy. Efficiency decreases with age and poor maintenance."
            },
            {
              title: "Annual Running Costs",
              content: "Heat pump: £800-1,200 annually (well-insulated home). Gas boiler: £600-900 annually. Gap closing as gas prices rise and electricity becomes greener."
            }
          ]
        },
        {
          title: "Installation & Suitability",
          content: "Heat pump suitability depends on property insulation, heating system design, and available space.",
          subsections: [
            {
              title: "Property Requirements",
              content: "Well-insulated properties (EPC C or better) ideal for heat pumps. Underfloor heating or oversized radiators essential for low-temperature operation at 45-55°C."
            },
            {
              title: "Installation Costs",
              content: "Air source heat pump: £8,000-18,000 installed. Ground source: £15,000-25,000. Gas boiler replacement: £2,000-4,000. Government grants reduce heat pump costs by £7,500."
            },
            {
              title: "Space Requirements",
              content: "Air source heat pumps need outdoor unit space (1.5m clearance). Ground source requires garden space for ground loops or borehole access for drilling."
            }
          ]
        }
      ],
      keyTakeaways: [
        "Heat pumps 3-4x more efficient than gas boilers",
        "£7,500 government grant reduces heat pump installation costs",
        "Well-insulated properties (EPC C+) essential for heat pump efficiency",
        "Running costs gap narrowing as gas prices increase",
        "Underfloor heating or oversized radiators required for optimal performance"
      ],
      nextSteps: [
        "Assess property insulation levels and EPC rating",
        "Calculate current annual heating costs and consumption",
        "Check eligibility for £7,500 government heat pump grant",
        "Get heat pump feasibility assessment from MCS installer",
        "Consider heating system upgrades (radiators/controls)"
      ]
    },
    "government-grants-and-incentives": {
      id: "government-grants-and-incentives",
      title: "UK Government Grants & Incentives 2025",
      category: "FINANCE",
      categoryColor: "bg-green-600", 
      readTime: "8 min read",
      difficulty: "Beginner",
      lastUpdated: "December 2024",
      sections: [
        {
          title: "Heat Pump Grants",
          content: "Significant government support available for heat pump installations through multiple schemes.",
          subsections: [
            {
              title: "Boiler Upgrade Scheme",
              content: "£7,500 grant for air/ground source heat pumps. Available until 2028. Covers up to 50% of typical installation costs. Applied for by MCS-certified installer on your behalf."
            },
            {
              title: "ECO4 Scheme",
              content: "Additional support for low-income households. Covers insulation improvements essential for heat pump efficiency. Can be combined with Boiler Upgrade Scheme for maximum savings."
            },
            {
              title: "Local Authority Grants",
              content: "Many councils offer additional heat pump grants. Birmingham: £1,000 extra. Bristol: £2,500 additional support. Check with local council for area-specific schemes."
            }
          ]
        },
        {
          title: "Solar & Battery Incentives",
          content: "Multiple financial incentives make solar and battery storage more affordable and profitable.",
          subsections: [
            {
              title: "Zero VAT Rate",
              content: "0% VAT on solar panels, batteries, and heat pumps until March 2027. Saves £1,000-2,000 on typical solar installation. Applies to materials and installation labour."
            },
            {
              title: "Smart Export Guarantee",
              content: "Guaranteed payments for excess solar electricity. Rates: 4-15p/kWh depending on supplier. Octopus Energy offers highest rates. Annual income: £100-400 for typical system."
            },
            {
              title: "Enhanced Capital Allowances",
              content: "Businesses can claim 100% capital allowances on renewable energy equipment in first year. Significant tax relief for commercial solar installations."
            }
          ]
        }
      ],
      keyTakeaways: [
        "£7,500 heat pump grant available through Boiler Upgrade Scheme",
        "0% VAT on solar, battery and heat pump installations until March 2027",
        "Smart Export Guarantee provides ongoing income from excess solar",
        "ECO4 scheme offers additional support for eligible households",
        "Local authorities often provide extra grants on top of national schemes"
      ],
      nextSteps: [
        "Check eligibility for Boiler Upgrade Scheme heat pump grant",
        "Compare Smart Export Guarantee rates from different suppliers",
        "Research local authority grant schemes in your area", 
        "Assess ECO4 eligibility for insulation improvements",
        "Plan installations before March 2027 VAT deadline"
      ]
    },
    "ev-charging-home-installation": {
      id: "ev-charging-home-installation",
      title: "EV Charging: Home Installation Guide",
      category: "EV CHARGING",
      categoryColor: "bg-purple-600",
      readTime: "14 min read", 
      difficulty: "Intermediate",
      lastUpdated: "December 2024",
      sections: [
        {
          title: "Charger Types & Speeds",
          content: "Understanding different EV charger types helps choose the right solution for your needs.",
          subsections: [
            {
              title: "Type 1 (Slow Charging)",
              content: "3-pin plug charging at 2.3kW. Takes 12-24 hours for full charge. Emergency use only - not recommended for regular charging due to fire risk from standard sockets."
            },
            {
              title: "Type 2 (Fast Charging)",
              content: "Dedicated 7kW home charger. Charges typical EV in 6-8 hours overnight. Most popular home charging solution. Wallbox or pole-mounted options available."
            },
            {
              title: "Type 2 (Rapid Charging)",
              content: "22kW three-phase charger. Charges EV in 2-3 hours. Requires three-phase electrical supply - only available in some properties. More expensive installation."
            }
          ]
        },
        {
          title: "Installation Requirements",
          content: "Proper electrical infrastructure essential for safe and efficient EV charging.",
          subsections: [
            {
              title: "Electrical Supply",
              content: "7kW charger needs dedicated 32A circuit from consumer unit. Electrician must assess current electrical capacity. May require consumer unit upgrade if insufficient capacity available."
            },
            {
              title: "Location Planning",
              content: "Install within 1.5m of parking space. Consider cable management to prevent trip hazards. Tethered cables convenient but limit charger compatibility with different vehicles."
            },
            {
              title: "Smart Charging Features",
              content: "Smart chargers mandatory for government grant eligibility. Features include app control, load balancing, and time-of-use optimisation for cheaper charging."
            }
          ]
        }
      ],
      keyTakeaways: [
        "7kW wallbox charger ideal for most home installations",
        "Smart chargers required for government grant eligibility",
        "Installation requires dedicated 32A electrical circuit",
        "Overnight charging using cheap-rate electricity saves £500+ annually",
        "Professional electrical assessment essential before installation"
      ],
      nextSteps: [
        "Assess current electrical supply capacity and consumer unit",
        "Choose between tethered and untethered charger options",
        "Plan optimal charger location considering cable management",
        "Compare smart charger features and smartphone apps",
        "Get quotes from OLEV-approved installers for grant eligibility"
      ]
    },
    "energy-efficiency-home-improvements": {
      id: "energy-efficiency-home-improvements",
      title: "Energy Efficiency: Home Improvements That Matter",
      category: "EFFICIENCY",
      categoryColor: "bg-indigo-600",
      readTime: "11 min read",
      difficulty: "Beginner", 
      lastUpdated: "December 2024",
      sections: [
        {
          title: "Insulation Improvements",
          content: "Proper insulation is the foundation of energy efficiency and essential before renewable technology.",
          subsections: [
            {
              title: "Loft Insulation",
              content: "Upgrade to 270mm (11 inches) for maximum efficiency. Costs £300-700 but saves £200+ annually. Easiest DIY project with immediate impact on energy bills."
            },
            {
              title: "Wall Insulation",
              content: "Cavity wall insulation costs £500-1,500, saves £150-300 annually. External wall insulation: £8,000-15,000 but improves property value significantly. Essential for heat pump efficiency."
            },
            {
              title: "Floor Insulation",
              content: "Suspended floor insulation saves £50-100 annually. Costs £800-1,200 professionally installed. Often overlooked but important for overall thermal performance."
            }
          ]
        },
        {
          title: "Heating System Efficiency",
          content: "Optimising heating controls and systems reduces energy consumption before considering renewable alternatives.",
          subsections: [
            {
              title: "Smart Thermostats",
              content: "Programmable smart thermostats save 10-15% on heating bills. Cost £150-300 installed. Learn occupancy patterns and optimise heating automatically."
            },
            {
              title: "Radiator Improvements",
              content: "Thermostatic radiator valves (TRVs) control individual room temperatures. Cost £15-30 per valve. Radiator reflector foil behind radiators improves efficiency by 5-10%."
            },
            {
              title: "Boiler Maintenance",
              content: "Annual boiler service maintains 90%+ efficiency. Power flushing removes system sludge. Magnetic filters prevent future heating system problems and maintain efficiency."
            }
          ]
        }
      ],
      keyTakeaways: [
        "Loft insulation upgrade delivers quickest return on investment",
        "Wall insulation essential before considering heat pump installation",
        "Smart thermostats reduce heating bills by 10-15% automatically",
        "TRVs allow individual room temperature control for comfort and savings",
        "Regular boiler maintenance maintains efficiency and prevents breakdowns"
      ],
      nextSteps: [
        "Check current loft insulation depth and upgrade if under 270mm",
        "Assess wall insulation options (cavity or external)",
        "Install programmable smart thermostat for automatic optimisation",
        "Add TRVs to all radiators for room-by-room control",
        "Schedule annual boiler service and consider power flush if needed"
      ]
    }
  };

  if (selectedGuide && guideContent[selectedGuide]) {
    const guide = guideContent[selectedGuide];
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setSelectedGuide(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Learning Centre
            </Button>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {guide.readTime}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {guide.difficulty}
              </span>
            </div>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <header className="mb-12">
            <div className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider mb-4 ${guide.categoryColor}`}>
              {guide.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {guide.title}
            </h1>
            <p className="text-lg text-gray-900 mb-6 font-medium">
              Last updated: {guide.lastUpdated}
            </p>
          </header>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-energy-green" />
              Table of Contents
            </h2>
            <nav className="space-y-2">
              {guide.sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="block text-energy-green hover:text-energy-dark transition-colors font-medium text-base"
                >
                  {index + 1}. {section.title}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-12">
            {guide.sections.map((section, sectionIndex) => (
              <section key={sectionIndex} id={`section-${sectionIndex}`} className="bg-white rounded-lg border-2 border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {sectionIndex + 1}. {section.title}
                </h2>
                <div className="max-w-none">
                  <p className="text-gray-900 text-lg leading-relaxed mb-6 font-medium">
                    {section.content}
                  </p>
                  
                  {section.subsections && (
                    <div className="space-y-6">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="border-l-4 border-energy-green pl-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {subsection.title}
                          </h3>
                          <p className="text-gray-900 leading-relaxed font-medium">
                            {subsection.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="bg-green-600 rounded-lg p-8 mt-12 text-white">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-white" />
              Key Takeaways
            </h2>
            <ul className="space-y-3">
              {guide.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white font-medium">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-600 rounded-lg p-8 mt-8 text-white">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ArrowRight className="w-6 h-6 text-white" />
              Next Steps
            </h2>
            <ul className="space-y-3">
              {guide.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-white text-green-600 text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-white font-medium">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-600 rounded-lg p-8 mt-12 text-center text-white">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Solar Journey?</h2>
            <p className="text-lg text-white mb-6">
              Get personalised recommendations and quotes from MCS-certified installers
            </p>
            <Link href="/">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Get My Energy Plan
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 bg-gradient-to-b from-energy-light to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get <span className="text-gray-900">Ener<span className="text-energy-green">wise</span></span> About Your Energy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expert guides, real-world insights, and actionable advice for UK homeowners. 
            Make informed decisions with comprehensive, up-to-date information.
          </p>
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Latest insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Expert-verified content</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Updated monthly</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Learning Guides
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From solar basics to advanced optimization strategies—everything you need to know about renewable energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningTopics.map((topic) => {
              const IconComponent = topic.icon;
              return (
                <Card 
                  key={topic.id} 
                  className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white rounded-2xl cursor-pointer transform hover:-translate-y-2"
                  onClick={() => handleGuideClick(topic.id)}
                >
                  <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    <div className={`${topic.categoryColor} p-8 rounded-full transition-transform group-hover:scale-110`}>
                      <IconComponent className="w-14 h-14 text-white" />
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      <span className={`${topic.categoryColor} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider`}>
                        {topic.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {topic.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-energy-green transition-colors line-clamp-2">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {topic.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{topic.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Eye className="w-3 h-3" />
                        <span>{articleViews[topic.id] || 0} views</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto text-energy-green hover:text-energy-dark font-semibold group/link"
                      >
                        Read Complete Guide
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-energy-light to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Energy Saving Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple changes that can reduce your energy bills today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                number: 1,
                title: "Switch to LED light bulbs", 
                description: "Replace incandescent and halogen bulbs with energy-efficient LEDs",
                savings: "Save £40/year",
                icon: Lightbulb
              },
              { 
                number: 2,
                title: "Turn down thermostat by 1°C", 
                description: "Small temperature reduction makes a big difference to bills",
                savings: "Save £130/year",
                icon: Thermometer
              },
              { 
                number: 3,
                title: "Draught-proof windows and doors", 
                description: "Stop heat escaping through gaps with simple draught excluders",
                savings: "Save £45/year",
                icon: Shield
              },
              { 
                number: 4,
                title: "Wash clothes at 30°C instead of higher temperatures", 
                description: "Modern detergents work effectively at lower temperatures",
                savings: "Save £25/year",
                icon: DropletIcon
              },
              { 
                number: 5,
                title: "Avoid standby mode by switching devices off completely", 
                description: "TVs, computers and chargers use power even when not in use",
                savings: "Save £45/year",
                icon: Power
              },
              { 
                number: 6,
                title: "Use smart plugs or timers for appliances", 
                description: "Automatically control when devices use power",
                savings: "Save £15/year",
                icon: Timer
              },
              { 
                number: 7,
                title: "Install reflective radiator panels", 
                description: "Reflect heat back into rooms instead of warming walls",
                savings: "Save £20/year",
                icon: Zap
              }
            ].map((tip) => {
              const IconComponent = tip.icon;
              return (
                <Card key={tip.number} className="p-6 bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-energy-green text-white text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {tip.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{tip.description}</p>
                      <div className="text-sm font-semibold text-energy-green">{tip.savings}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-white rounded-lg p-6 shadow-sm border inline-block">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Total potential savings: <span className="text-energy-green">£320/year</span>
              </p>
              <p className="text-sm text-gray-600">
                These simple changes could save you over £25 per month on energy bills
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Get 
            </h2>
            <div className="flex items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Ener<span className="text-energy-green">wise</span>
              </h2>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              About Your Energy
            </h2>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Get your personalised renewable energy recommendations with accurate savings calculations based on your property
          </p>
          
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-energy-green hover:bg-energy-green/90 text-white font-semibold px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Assessment
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}