import { Link } from "wouter";
import { Zap, ArrowLeft, MessageCircle, Clock, Mail } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Complaints() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <MessageCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Complaints Procedure</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How to raise concerns and our commitment to resolving issues fairly and promptly
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: July 14, 2025 | Version 2.1
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* How to Complain */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. How to Make a Complaint</h2>
            
            <div className="bg-energy-green/10 rounded-lg p-6 text-center mb-6 max-w-md mx-auto">
              <Mail className="h-8 w-8 text-energy-green mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-800 text-sm">complaints@enerwise.uk</p>
              <p className="text-gray-600 text-xs mt-1">Response within 48 hours</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-900 mb-3">What to Include in Your Complaint</h3>
              <ul className="text-blue-800 space-y-2">
                <li>• Your full name and contact details</li>
                <li>• Account or reference number (if applicable)</li>
                <li>• Clear description of the issue and when it occurred</li>
                <li>• What you've already done to try to resolve it</li>
                <li>• What outcome you're seeking</li>
                <li>• Any supporting evidence (emails, screenshots, etc.)</li>
              </ul>
            </div>
          </section>

          {/* Our Process */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Our Resolution Process</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Acknowledgment</h3>
                  <p className="text-gray-700 mb-2">
                    We'll acknowledge your complaint within 24 hours (or next business day) 
                    and provide you with a unique reference number.
                  </p>
                  <div className="bg-energy-green/10 rounded p-3 text-sm text-gray-800">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Timeline: 24 hours
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Investigation</h3>
                  <p className="text-gray-700 mb-2">
                    A dedicated complaints officer will investigate your concern thoroughly, 
                    reviewing all relevant information and speaking with relevant teams.
                  </p>
                  <div className="bg-blue-50 rounded p-3 text-sm text-blue-800">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Timeline: 3-5 business days
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Response</h3>
                  <p className="text-gray-700 mb-2">
                    We'll provide a full written response explaining our findings, 
                    any action we'll take, and next steps.
                  </p>
                  <div className="bg-purple-50 rounded p-3 text-sm text-purple-800">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Timeline: Within 8 weeks maximum
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Types of Complaints */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Issues We Handle</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Issues</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Technical problems with our website</li>
                    <li>• Calculation errors or inaccuracies</li>
                    <li>• Account access difficulties</li>
                    <li>• Payment processing issues</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Service Quality</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Poor customer service experience</li>
                    <li>• Delayed responses to enquiries</li>
                    <li>• Misleading information provided</li>
                    <li>• Communication failures</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Installer Related</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Unprofessional installer behaviour</li>
                    <li>• Quality of installation work</li>
                    <li>• Installer communication issues</li>
                    <li>• Disputes over quotes or pricing</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Data & Privacy</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Concerns about data handling</li>
                    <li>• Privacy policy violations</li>
                    <li>• Unwanted marketing communications</li>
                    <li>• Data accuracy issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Escalation */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. If You're Not Satisfied</h2>
            
            <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-500">
              <h3 className="font-semibold text-amber-900 mb-3">External Resolution Options</h3>
              <p className="text-amber-800 mb-4">
                If you're not satisfied with our response, you may be able to refer your complaint to:
              </p>
              <ul className="text-amber-700 space-y-2 text-sm">
                <li>• The Financial Ombudsman Service (for financial service complaints)</li>
                <li>• Trading Standards (for consumer protection issues)</li>
                <li>• The Information Commissioner's Office (for data protection concerns)</li>
                <li>• Citizens Advice (for general consumer guidance)</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Contact Our Complaints Team</h2>
            
            <div className="bg-energy-green/10 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                We're committed to resolving your concerns quickly and fairly. Our complaints team is here to help:
              </p>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                <div className="text-gray-700 text-sm space-y-1">
                  <div>Email: complaints@enerwise.uk</div>
                  <div>Hours: Monday-Friday, 9am-5pm</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}