import Header from "@/components/header";
import Footer from "@/components/footer";
import LeadForm from "@/components/lead-form";
import { Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about renewable energy? Our expert team is here to help you 
              start your journey to sustainable living.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-energy-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">hello@enerwise.co.uk</p>
                    <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                  </div>
                </div>



                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-energy-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-sm text-gray-500">Closed Sundays and bank holidays</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-energy-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Headquarters</h3>
                    <p className="text-gray-600">London, United Kingdom</p>
                    <p className="text-sm text-gray-500">Serving homeowners across the UK</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Prefer to chat with Orla?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our AI energy expert is available 24/7 to answer your questions about 
                  solar panels, heat pumps, and other renewable energy solutions.
                </p>
                <a 
                  href="/#orla" 
                  className="inline-flex items-center gap-2 bg-energy-green text-white px-6 py-3 rounded-lg hover:bg-energy-dark transition-colors"
                >
                  <span>Talk to Orla Now</span>
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <LeadForm onSuccess={() => {
                  // Could show a success message here
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}