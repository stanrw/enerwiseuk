import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: July 3, 2025
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By accessing and using the Enerwise platform, you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to abide by the 
                  above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  Enerwise provides an AI-powered platform that offers:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Renewable energy assessments and recommendations</li>
                  <li>Connection with MCS-certified installers</li>
                  <li>Educational content about sustainable energy solutions</li>
                  <li>AI assistant (Orla) for energy-related guidance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide accurate information about your property and energy usage</li>
                  <li>Use the platform only for lawful purposes</li>
                  <li>Respect the intellectual property rights of Enerwise and third parties</li>
                  <li>Not attempt to interfere with or disrupt the platform's operation</li>
                  <li>Verify installer credentials independently before making any commitments</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Recommendations and Estimates</h2>
                <p className="text-gray-700 mb-4">
                  Enerwise provides estimates and recommendations based on available data and AI analysis. 
                  These are for guidance only and:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Actual results may vary based on individual circumstances</li>
                  <li>Professional assessments are required before making final decisions</li>
                  <li>We do not guarantee specific savings or installation outcomes</li>
                  <li>Government schemes and incentives may change without notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Installers</h2>
                <p className="text-gray-700 mb-4">
                  Enerwise connects users with independent MCS-certified installers. Please note:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Installers are independent contractors, not employees of Enerwise</li>
                  <li>Contracts for installation work are directly between you and the installer</li>
                  <li>Enerwise is not responsible for installer performance or workmanship</li>
                  <li>We recommend obtaining multiple quotes and checking references</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-700">
                  Enerwise shall not be liable for any direct, indirect, incidental, special, 
                  consequential, or punitive damages arising from your use of the platform or 
                  any services obtained through installer connections. This includes but is not 
                  limited to installation quality, financial losses, or equipment failures.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                <p className="text-gray-700">
                  The Enerwise platform, including AI algorithms, content, and design, is protected 
                  by copyright and other intellectual property laws. Users may not reproduce, 
                  distribute, or create derivative works without express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Protection</h2>
                <p className="text-gray-700">
                  Your use of the platform is also governed by our Privacy Policy, which is 
                  incorporated into these terms by reference. We are committed to protecting 
                  your personal data in accordance with UK GDPR.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications</h2>
                <p className="text-gray-700">
                  Enerwise reserves the right to modify these terms at any time. Changes will be 
                  effective immediately upon posting. Continued use of the platform constitutes 
                  acceptance of modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
                <p className="text-gray-700">
                  These terms are governed by the laws of England and Wales. Any disputes will 
                  be subject to the exclusive jurisdiction of the English courts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                <p className="text-gray-700">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-gray-700">
                    Email: legal@enerwise.co.uk<br />
                    Address: Enerwise Ltd, 123 Green Energy Way, London, SW1A 1AA
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}