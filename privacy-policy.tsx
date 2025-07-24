import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Your Privacy Rights</h3>
            <p className="text-green-700">
              Under UK GDPR, you have the right to access, rectify, erase, restrict, and port your personal data. 
              You also have the right to object to processing and withdraw consent. Contact us at privacy@enerwise.uk to exercise these rights.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Who We Are</h2>
          <p>
            Enerwise ("we", "us", "our") is a renewable energy assessment platform operated by SOLR AI Limited. 
            We are the data controller for the personal information we collect about you.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg my-4">
            <p><strong>Data Controller:</strong> SOLR AI Limited</p>
            <p><strong>Address:</strong> [Company Address]</p>
            <p><strong>Contact:</strong> privacy@enerwise.uk</p>
            <p><strong>ICO Registration:</strong> [Registration Number]</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. What Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information You Provide:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Contact Details:</strong> Name, email address</li>
            <li><strong>Property Information:</strong> Address, postcode, property type, number of bedrooms</li>
            <li><strong>Energy Data:</strong> Smart meter readings, current energy usage, supplier information</li>
            <li><strong>Preferences:</strong> Energy system interests, budget ranges, installation timelines</li>
            <li><strong>Account Information:</strong> Username, password (encrypted), profile preferences</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Information We Collect Automatically:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, assessment interactions</li>
            <li><strong>Cookies:</strong> Essential, analytics, and preference cookies (with your consent)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Third-Party Data Sources:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Government APIs:</strong> Energy Performance Certificate (EPC) data from DLUHC</li>
            <li><strong>Mapping Services:</strong> Location data from Google Maps API</li>
            <li><strong>Solar Data:</strong> Roof analysis from Google Solar API</li>
            <li><strong>Property Data:</strong> OS DataHub for property boundaries and characteristics</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Why We Use Your Information</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-800">Primary Purpose: Renewable Energy Assessment</h4>
              <p className="text-gray-600">
                <strong>Legal Basis:</strong> Legitimate Interest (Art. 6(1)(f) GDPR)<br/>
                We analyse your property data to provide personalised renewable energy recommendations, 
                calculate potential savings, and match you with suitable installers.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800">Service Provision & Account Management</h4>
              <p className="text-gray-600">
                <strong>Legal Basis:</strong> Contract Performance (Art. 6(1)(b) GDPR)<br/>
                Managing your account, processing quotes, facilitating installer connections, 
                and providing customer support.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-800">Communication & Marketing</h4>
              <p className="text-gray-600">
                <strong>Legal Basis:</strong> Consent (Art. 6(1)(a) GDPR)<br/>
                Sending assessment results, installer quotes, energy-saving tips, and platform updates 
                (only with your explicit consent).
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-800">Legal Compliance</h4>
              <p className="text-gray-600">
                <strong>Legal Basis:</strong> Legal Obligation (Art. 6(1)(c) GDPR)<br/>
                Compliance with UK energy regulations, consumer protection laws, and tax obligations.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. How We Protect Your Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Technical Safeguards</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• End-to-end encryption (TLS 1.3)</li>
                <li>• Database encryption at rest (AES-256)</li>
                <li>• Secure password hashing (bcrypt)</li>
                <li>• Regular security audits & penetration testing</li>
                <li>• Multi-factor authentication for admin access</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Organizational Measures</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Staff data protection training</li>
                <li>• Access controls & role-based permissions</li>
                <li>• Data breach response procedures</li>
                <li>• Regular backup & disaster recovery testing</li>
                <li>• Third-party security assessments</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Sharing & Third Parties</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">We Share Your Data With:</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800">MCS Certified Installers</h4>
              <p className="text-gray-600 text-sm">
                When you request quotes, we share relevant property and contact information with 
                pre-vetted installers in your area. All installers sign data processing agreements.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800">Service Providers</h4>
              <p className="text-gray-600 text-sm">
                Cloud hosting (Neon Database), analytics (privacy-compliant), email services, 
                and payment processors. All have adequate data protection measures.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800">Legal Requirements</h4>
              <p className="text-gray-600 text-sm">
                Government agencies, courts, or law enforcement when required by law or to 
                protect our legal rights.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Data Retention</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <ul className="space-y-2 text-gray-700">
              <li><strong>Account Data:</strong> Retained while your account is active, plus 3 years</li>
              <li><strong>Assessment Data:</strong> 7 years (for warranty and legal purposes)</li>
              <li><strong>Marketing Data:</strong> Until you withdraw consent</li>
              <li><strong>Technical Logs:</strong> 12 months maximum</li>
              <li><strong>Financial Records:</strong> 6 years (UK tax law requirement)</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Your Rights Under UK GDPR</h2>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-600">Right of Access</h4>
              <p className="text-sm text-gray-600">Request a copy of your personal data</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-600">Right to Rectification</h4>
              <p className="text-sm text-gray-600">Correct inaccurate or incomplete data</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-600">Right to Erasure</h4>
              <p className="text-sm text-gray-600">Request deletion of your data</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-600">Right to Restrict Processing</h4>
              <p className="text-sm text-gray-600">Limit how we use your data</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-600">Right to Data Portability</h4>
              <p className="text-sm text-gray-600">Receive your data in a portable format</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-600">Right to Object</h4>
              <p className="text-sm text-gray-600">Object to processing based on legitimate interests</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-6">
            <h4 className="font-semibold text-yellow-800 mb-2">How to Exercise Your Rights</h4>
            <p className="text-yellow-700">
              Email us at <strong>privacy@enerwise.uk</strong> with your request. We'll respond within 
              30 days and verify your identity before processing. Most requests are free, but we may 
              charge for excessive or repetitive requests.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Cookies & Tracking</h2>
          
          <p className="mb-4">We use cookies to improve your experience and analyse platform usage:</p>
          
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold">Essential Cookies</h4>
              <p className="text-sm text-gray-600">Required for basic site functionality (login, security)</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold">Analytics Cookies</h4>
              <p className="text-sm text-gray-600">Help us understand site usage (anonymized)</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold">Preference Cookies</h4>
              <p className="text-sm text-gray-600">Remember your settings and preferences</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. International Transfers</h2>
          <p>
            Your data is primarily stored within the UK/EU. When we use non-EU service providers, 
            we ensure adequate protection through Standard Contractual Clauses or adequacy decisions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Data Breach Procedures</h2>
          <p>
            If we discover a data breach that risks your rights and freedoms, we'll notify the ICO 
            within 72 hours and inform affected individuals without undue delay. We have comprehensive 
            incident response procedures in place.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Children's Privacy</h2>
          <p>
            Our service is not intended for children under 16. We don't knowingly collect personal 
            information from children. If you're a parent concerned about your child's data, contact us immediately.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Changes to This Policy</h2>
          <p>
            We'll notify you of significant changes by email or platform notification. Continued use 
            after changes constitutes acceptance. Check this page regularly for updates.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Contact & Complaints</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Contact Our Data Protection Team:</h4>
            <p><strong>Email:</strong> privacy@enerwise.uk</p>
            <p><strong>Post:</strong> Data Protection Officer, SOLR AI Limited, [Address]</p>
            <p><strong>Response Time:</strong> Within 30 days</p>
            
            <h4 className="font-semibold text-gray-800 mt-4 mb-2">Right to Complain:</h4>
            <p className="text-gray-600">
              You can lodge a complaint with the Information Commissioner's Office (ICO):<br/>
              <strong>Website:</strong> ico.org.uk<br/>

              <strong>Post:</strong> Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-500">
              This privacy policy is compliant with UK GDPR, Data Protection Act 2018, and PECR. 
              It was last reviewed on {new Date().toLocaleDateString('en-GB')}.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}