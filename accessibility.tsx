import { Link } from "wouter";
import { Zap, ArrowLeft, Accessibility as AccessibilityIcon, Eye, Ear, Users, Settings } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-energy-green/10 rounded-full">
              <AccessibilityIcon className="h-8 w-8 text-energy-green" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Accessibility Statement</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to making Enerwise accessible to all users, regardless of ability or technology
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: July 14, 2025 | Version 2.1
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* Our Commitment */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
            <div className="bg-energy-green/10 rounded-lg p-6 border-l-4 border-energy-green">
              <p className="text-gray-800 mb-4">
                Enerwise is committed to ensuring digital accessibility for people with disabilities. 
                We are continually improving the user experience for everyone and applying the relevant 
                accessibility standards to ensure we provide equal access to information and functionality.
              </p>
              <p className="text-gray-700">
                We believe that everyone should have access to renewable energy information and 
                our marketplace platform, regardless of their abilities or the technology they use.
              </p>
            </div>
          </section>

          {/* Conformance Status */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conformance Status</h2>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">WCAG 2.1 AA Compliance</h3>
              <p className="text-blue-800 mb-4">
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and 
                developers to improve accessibility for people with disabilities. It defines three levels 
                of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p className="text-blue-700">
                Enerwise is partially conformant with WCAG 2.1 level AA. "Partially conformant" means 
                that some parts of the content do not fully conform to the accessibility standard.
              </p>
            </div>
          </section>

          {/* Accessibility Features */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Features</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-purple-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">Visual Accessibility</h3>
                </div>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• High contrast colour schemes</li>
                  <li>• Scalable text and interface elements</li>
                  <li>• Alternative text for images and icons</li>
                  <li>• Clear visual hierarchy and focus indicators</li>
                  <li>• Colour is not the only means of conveying information</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Ear className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">Audio & Content</h3>
                </div>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Descriptive page titles and headings</li>
                  <li>• Clear and simple language</li>
                  <li>• Logical content structure</li>
                  <li>• Consistent navigation and layout</li>
                  <li>• Meaningful link text and button labels</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Settings className="h-6 w-6 text-energy-green mr-3" />
                  <h3 className="font-semibold text-gray-900">Keyboard & Motor</h3>
                </div>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Full keyboard navigation support</li>
                  <li>• Skip links for main content areas</li>
                  <li>• Reasonable time limits on forms</li>
                  <li>• No content that causes seizures</li>
                  <li>• Touch targets meet minimum size requirements</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-orange-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">Assistive Technology</h3>
                </div>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Screen reader compatibility</li>
                  <li>• Semantic HTML markup</li>
                  <li>• ARIA labels and descriptions</li>
                  <li>• Form labels and error messages</li>
                  <li>• Status messages and live regions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Browser & Technology Support */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browser & Technology Support</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Compatible Browsers & Assistive Technologies</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Web Browsers</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Chrome (latest version)</li>
                    <li>• Firefox (latest version)</li>
                    <li>• Safari (latest version)</li>
                    <li>• Edge (latest version)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Assistive Technologies</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• NVDA (Windows)</li>
                    <li>• JAWS (Windows)</li>
                    <li>• VoiceOver (macOS/iOS)</li>
                    <li>• TalkBack (Android)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Feedback & Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Feedback & Support</h2>
            
            <div className="bg-energy-green/10 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                We welcome your feedback on the accessibility of Enerwise. Please contact us if you encounter 
                accessibility barriers or have suggestions for improvement:
              </p>
              <div className="space-y-2">
                <div><strong>Email:</strong> accessibility@enerwise.uk</div>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                We aim to respond to accessibility feedback within 2 business days.
              </p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}