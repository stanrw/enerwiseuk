import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Agreement to Terms</h3>
            <p className="text-blue-700">
              By accessing and using Enerwise, you agree to be bound by these Terms of Service and all applicable laws. 
              If you disagree with any part of these terms, you may not use our service.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. About Enerwise</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Service Description</h3>
          <p>
            Enerwise is a renewable energy assessment platform that provides personalised recommendations 
            for solar panels, battery storage, heat pumps, and EV chargers. We connect UK homeowners with 
            MCS-certified installers and provide tools for comparing quotes and managing installations.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Company Information</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Operating Company:</strong> SOLR AI Limited</p>
            <p><strong>Registration:</strong> England & Wales [Company Number]</p>
            <p><strong>Registered Address:</strong> [Company Address]</p>
            <p><strong>Contact:</strong> hello@enerwise.uk</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Data Usage & Why We Collect Information</h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Our Data Processing Purpose</h3>
            <p className="text-green-700 mb-4">
              We collect and process your data exclusively to provide accurate renewable energy assessments 
              and connect you with suitable installers. Here's exactly why we need your information:
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Property Assessment Data</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800">Why We Need Your Address</h4>
              <ul className="text-gray-600 text-sm mt-2 space-y-1">
                <li>• Access government EPC data to understand your property's energy efficiency</li>
                <li>• Analyse roof orientation, size, and shading using satellite imagery</li>
                <li>• Calculate solar irradiance levels specific to your location</li>
                <li>• Determine local planning restrictions and grid connection capacity</li>
                <li>• Match you with nearby MCS-certified installers</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-800">Why We Need Energy Usage Data</h4>
              <ul className="text-gray-600 text-sm mt-2 space-y-1">
                <li>• Calculate accurate system sizing for your consumption patterns</li>
                <li>• Estimate realistic savings based on your actual usage</li>
                <li>• Recommend optimal battery storage capacity</li>
                <li>• Determine payback periods and ROI calculations</li>
                <li>• Identify peak usage times for smart energy management</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-800">Why We Need Contact Information</h4>
              <ul className="text-gray-600 text-sm mt-2 space-y-1">
                <li>• Send your personalised assessment results</li>
                <li>• Connect you with vetted installers for quotes</li>
                <li>• Provide ongoing support throughout your renewable energy journey</li>
                <li>• Notify you of relevant government incentives and grants</li>
                <li>• Send important updates about your installation progress</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Data Storage & Security</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">How We Store Your Data</h4>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Location:</strong> Securely stored in UK/EU data centers with Neon Database</li>
              <li><strong>Encryption:</strong> All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
              <li><strong>Access Controls:</strong> Strict role-based access with multi-factor authentication</li>
              <li><strong>Backups:</strong> Regular encrypted backups with disaster recovery procedures</li>
              <li><strong>Monitoring:</strong> 24/7 security monitoring and anomaly detection</li>
              <li><strong>Compliance:</strong> SOC 2 Type II certified infrastructure</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Data Sharing Principles</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800">With Installers (Only When You Request Quotes)</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• We share only essential information: name, contact details, property basics, and system requirements</li>
                <li>• All installers sign strict data processing agreements and confidentiality commitments</li>
                <li>• You control which installers receive your information through quote requests</li>
                <li>• Installers cannot use your data for any purpose other than providing quotes</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800">What We Never Share</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Financial information (bank details, credit scores, income)</li>
                <li>• Detailed energy usage patterns beyond what's needed for quotes</li>
                <li>• Personal conversations or chat history with our AI assistant Orla</li>
                <li>• Data with marketing companies or data brokers</li>
                <li>• Information for advertising or commercial purposes unrelated to renewable energy</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Account Security</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Use strong, unique passwords for your account</li>
            <li>Ensure accuracy of information provided for assessments</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Acceptable Use</h3>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Use the service for any unlawful or fraudulent purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the service or other users' access</li>
            <li>Submit false or misleading information</li>
            <li>Use automated tools to scrape or harvest data</li>
            <li>Reverse engineer or attempt to extract our algorithms</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Service Limitations & Disclaimers</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">Assessment Accuracy</h3>
            <p className="text-yellow-700">
              Our assessments are estimates based on available data and industry-standard calculations. 
              Actual results may vary due to factors including weather patterns, energy usage changes, 
              equipment performance, and installation-specific conditions. Always obtain professional 
              surveys before making final decisions.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Third-Party Services</h3>
          <p>
            We integrate with government databases, mapping services, and energy data providers. 
            We're not responsible for the accuracy or availability of third-party data sources. 
            Service interruptions may occur due to external factors beyond our control.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Installer Relationships</h3>
          <p>
            Enerwise facilitates connections with independent MCS-certified installers but is not 
            responsible for their work quality, pricing, or conduct. All contracts are directly 
            between you and the installer. We recommend obtaining multiple quotes and checking credentials.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Financial Terms</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Service Fees</h3>
          <p>
            Basic assessments and platform access are free for homeowners. We earn commission from 
            installers for successful connections. Premium features may be introduced with clear pricing.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Payment Processing</h3>
          <p>
            When facilitating financing applications, we use secure, PCI-compliant payment processors. 
            We don't store financial details and all transactions are encrypted.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
          
          <p>
            The Enerwise platform, including our assessment algorithms, user interface, and content, 
            is protected by intellectual property laws. You may use our service for personal, 
            non-commercial purposes. Commercial use requires written permission.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">User-Generated Content</h3>
          <p>
            You retain ownership of information you provide but grant us a license to use it for 
            service provision, improvement, and anonymized analytics. We may use aggregated, 
            non-identifiable data for research and industry reporting.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Limitation of Liability</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-3">Important Legal Notice</h3>
            <p className="text-red-700 text-sm">
              To the maximum extent permitted by law, Enerwise shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including lost profits, 
              arising from your use of our service. Our total liability is limited to the amount 
              you've paid us in the 12 months preceding the claim.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Compliance & Regulatory</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Industry Standards</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>All installer recommendations are MCS-certified</li>
            <li>Compliance with UK building regulations and planning requirements</li>
            <li>Adherence to Ofgem guidelines for energy services</li>
            <li>Consumer protection under Consumer Rights Act 2015</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Data Protection Compliance</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>UK GDPR and Data Protection Act 2018 compliance</li>
            <li>ICO registration and annual compliance audits</li>
            <li>Privacy by design in all service development</li>
            <li>Regular staff training on data protection</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Termination</h2>
          
          <p>
            You may terminate your account at any time through your account settings. We may 
            terminate or suspend access for violations of these terms. Upon termination, your 
            data will be retained as outlined in our Privacy Policy for legal and warranty purposes.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Dispute Resolution</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Governing Law</h3>
          <p>
            These terms are governed by English law. Disputes will be resolved in English courts, 
            subject to your right to bring proceedings in your local jurisdiction for consumer matters.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Alternative Dispute Resolution</h3>
          <p>
            For consumer disputes, you may use the Online Dispute Resolution platform provided by 
            the European Commission, or contact relevant ombudsman services for energy-related complaints.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Changes to Terms</h2>
          
          <p>
            We may update these terms to reflect service changes or legal requirements. Significant 
            changes will be notified 30 days in advance via email or platform notification. 
            Continued use after changes constitutes acceptance.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Contact Information</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Get in Touch</h4>
            <p><strong>General Inquiries:</strong> hello@enerwise.uk</p>
            <p><strong>Data Protection:</strong> privacy@enerwise.uk</p>
            <p><strong>Legal Matters:</strong> legal@enerwise.uk</p>

            <p><strong>Address:</strong> SOLR AI Limited, [Full Address]</p>
            
            <h4 className="font-semibold text-gray-800 mt-4 mb-2">Response Times:</h4>
            <ul className="text-gray-600 text-sm">
              <li>• General inquiries: Within 2 business days</li>
              <li>• Data protection requests: Within 30 days</li>
              <li>• Legal matters: Within 5 business days</li>
              <li>• Urgent technical issues: Within 24 hours</li>
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-500">
              These terms of service are compliant with UK consumer protection laws, GDPR, and industry regulations. 
              Last reviewed on {new Date().toLocaleDateString('en-GB')}.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}