import Header from "@/components/header";
import Footer from "@/components/footer";
import { Shield, Users, Award, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-energy-green">Ener</span>wise
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're making renewable energy accessible to every home in the UK through 
              expert guidance, instant assessments, and trusted installer connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Enerwise, we believe every UK homeowner should have access to clean, 
                affordable renewable energy. Our platform connects you with expert guidance 
                and trusted installers to make your transition to sustainable energy simple and cost-effective.
              </p>
              <p className="text-lg text-gray-600">
                Through our AI-powered assessment tool Orla and network of MCS-certified 
                installers, we're helping UK homeowners save money while reducing 
                their carbon footprint.
              </p>
            </div>
            <div className="bg-gradient-to-br from-energy-light to-green-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-energy-green mb-2">MCS</div>
                  <div className="text-gray-600">Certified Network</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-energy-green mb-2">UK</div>
                  <div className="text-gray-600">Property Analysis</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-energy-green mb-2">24/7</div>
                  <div className="text-gray-600">AI Assistant Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-energy-green mb-2">2025</div>
                  <div className="text-gray-600">Latest Technology</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-energy-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trusted Platform</h3>
              <p className="text-gray-600">
                All our installers are MCS-certified and thoroughly vetted for quality and reliability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-energy-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Our AI assistant Orla provides personalised recommendations based on your property.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-energy-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Focused</h3>
              <p className="text-gray-600">
                Committed to connecting homeowners with only the highest quality MCS-certified installers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-energy-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Environmental Impact</h3>
              <p className="text-gray-600">
                Every installation contributes to a cleaner future and supports tree planting initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}