import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Shield, Lock, Eye, FileText, Users, Zap } from "lucide-react";

export default function DataProtection() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Protection & Security</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy and data security are at the heart of everything we do. 
            Here's how we protect your information and ensure compliance with UK data protection laws.
          </p>
        </div>

        {/* Compliance Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">UK GDPR</h3>
            <p className="text-sm text-gray-600">Fully Compliant</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">SOC 2 Type II</h3>
            <p className="text-sm text-gray-600">Certified Infrastructure</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">ICO Registered</h3>
            <p className="text-sm text-gray-600">Data Controller</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">ISO 27001</h3>
            <p className="text-sm text-gray-600">Security Standards</p>
          </div>
        </div>

        {/* Key Principles */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
            <Eye className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparency First</h3>
            <p className="text-gray-700 mb-4">
              We believe you should know exactly what data we collect, why we need it, 
              and how it's used. No hidden practices or unclear purposes.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Clear data collection notices</li>
              <li>• Specific purpose explanations</li>
              <li>• Regular communication about usage</li>
              <li>• Easy access to your data</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
            <Users className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Control</h3>
            <p className="text-gray-700 mb-4">
              You decide what information to share and can modify or delete it at any time. 
              We provide tools to manage your privacy preferences easily.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Granular privacy controls</li>
              <li>• Easy data export and deletion</li>
              <li>• Consent management dashboard</li>
              <li>• 30-day response guarantee</li>
            </ul>
          </div>
        </div>

        {/* Security Measures */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How We Protect Your Data</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Encryption Everywhere</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• TLS 1.3 for data in transit</li>
                  <li>• AES-256 encryption at rest</li>
                  <li>• Encrypted database backups</li>
                  <li>• Secure key management</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Access Controls</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Multi-factor authentication</li>
                  <li>• Role-based permissions</li>
                  <li>• Regular access reviews</li>
                  <li>• Audit logging</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous Monitoring</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 24/7 security monitoring</li>
                  <li>• Automated threat detection</li>
                  <li>• Regular penetration testing</li>
                  <li>• Incident response procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Data Usage Justification */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why We Need Your Data</h2>
          
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Assessment Accuracy</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">What We Collect:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Property address and postcode</li>
                    <li>• Property type and age</li>
                    <li>• Roof characteristics</li>
                    <li>• Current energy usage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Why It's Essential:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Access government EPC data</li>
                    <li>• Calculate solar irradiance</li>
                    <li>• Determine optimal system sizing</li>
                    <li>• Provide accurate savings estimates</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Installer Matching</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">What We Share:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Contact details (with consent)</li>
                    <li>• Basic property information</li>
                    <li>• System requirements</li>
                    <li>• Installation preferences</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Strict Controls:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Only MCS-certified installers</li>
                    <li>• Data processing agreements</li>
                    <li>• Purpose limitation clauses</li>
                    <li>• Regular compliance audits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Improvement</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Anonymized Analytics:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Platform usage patterns</li>
                    <li>• Popular system combinations</li>
                    <li>• Regional energy trends</li>
                    <li>• Assessment accuracy metrics</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Benefits to You:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Improved recommendation algorithms</li>
                    <li>• Better installer matching</li>
                    <li>• Enhanced user experience</li>
                    <li>• More accurate calculations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Your Data Rights</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Access Your Data</h3>
              <p className="text-sm opacity-90">Request a copy of all personal data we hold about you</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Correct Errors</h3>
              <p className="text-sm opacity-90">Update or correct any inaccurate information</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Delete Your Data</h3>
              <p className="text-sm opacity-90">Request deletion of your personal information</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Restrict Processing</h3>
              <p className="text-sm opacity-90">Limit how we use your data in certain circumstances</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Data Portability</h3>
              <p className="text-sm opacity-90">Receive your data in a portable format</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Object to Processing</h3>
              <p className="text-sm opacity-90">Object to certain types of data processing</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="mb-4">Exercise your rights by contacting our Data Protection team</p>
            <a 
              href="mailto:privacy@enerwise.uk" 
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Data Protection?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our dedicated Data Protection team is here to help with any questions about your privacy, 
            data rights, or how we handle your information.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">privacy@enerwise.uk</p>
              <p className="text-sm text-gray-500">Response within 30 days</p>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Data Protection Officer</h3>
              <p className="text-gray-600">SOLR AI Limited</p>
              <p className="text-sm text-gray-500">[Company Address]</p>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Complaints</h3>
              <p className="text-gray-600">Information Commissioner's Office</p>
              <p className="text-sm text-gray-500">ico.org.uk | 0303 123 1113</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}