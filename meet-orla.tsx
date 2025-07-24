import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import OrlaChat from "@/components/orla-chat";

export default function MeetOrla() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Exact copy from How It Works page */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-energy-light via-white to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8">
            {/* Clean pulsing green light effect */}
            <div className="absolute inset-0 rounded-full bg-energy-green opacity-20" 
                 style={{ 
                   animation: 'pulse 3.5s ease-in-out infinite',
                   transform: 'scale(1)'
                 }}></div>
            <div className="absolute inset-2 rounded-full bg-energy-green opacity-40" 
                 style={{ 
                   animation: 'pulse 4s ease-in-out infinite 0.5s',
                   transform: 'scale(1)'
                 }}></div>
            {/* Central bright green core */}
            <div className="absolute inset-4 rounded-full bg-energy-green shadow-lg"
                 style={{ 
                   animation: 'pulse 4.5s ease-in-out infinite 1s',
                   transform: 'scale(1)'
                 }}></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Meet Orla, Your Energy Helper
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Think of Orla as your friendly, knowledgeable neighbor who happens to know everything about renewable energy.
          </p>
        </div>
      </section>

      {/* What is Orla Section - Exact copy from How It Works page */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              What is Orla?
            </h2>
            <p className="text-lg sm:text-xl text-gray-900 max-w-4xl mx-auto leading-relaxed font-medium">
              Orla is like having an expert friend who's always available to answer your questions about solar panels, 
              heat pumps, and saving money on energy bills. She knows all the latest information and can help you 
              make the right decisions for your home.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start space-x-4 sm:space-x-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl">💬</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    Just Like Talking to a Friend
                  </h3>
                  <p className="text-gray-900 text-base sm:text-lg leading-relaxed font-medium">
                    You can ask Orla questions in plain English, just like you would ask a neighbor. 
                    No technical knowledge needed.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🧠</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Always Up-to-Date
                  </h3>
                  <p className="text-gray-900 text-lg leading-relaxed font-medium">
                    Orla knows the latest government grants, energy prices, and technology. 
                    She's like having access to an expert who never sleeps.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                  {/* Elegant pulsing light effect for Orla */}
                  <div className="absolute inset-0 rounded-full bg-energy-green opacity-15" 
                       style={{ 
                         animation: 'pulse 3s ease-in-out infinite',
                         transform: 'scale(1)'
                       }}></div>
                  <div className="absolute inset-1 rounded-full bg-energy-green opacity-25" 
                       style={{ 
                         animation: 'pulse 3.5s ease-in-out infinite 0.5s',
                         transform: 'scale(1)'
                       }}></div>
                  <div className="absolute inset-3 rounded-full bg-energy-green opacity-50" 
                       style={{ 
                         animation: 'pulse 4s ease-in-out infinite 1s',
                         transform: 'scale(1)'
                       }}></div>
                  {/* Central bright green core */}
                  <div className="absolute inset-5 rounded-full bg-energy-green opacity-80 shadow-lg"
                       style={{ 
                         animation: 'pulse 4.5s ease-in-out infinite 1.5s',
                         transform: 'scale(1)'
                       }}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Personalised for Your Home
                  </h3>
                  <p className="text-gray-900 text-lg leading-relaxed font-medium">
                    Orla considers your specific situation - your home, your area, and your needs - 
                    to give you advice that's right for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Orla - Exact copy from How It Works page */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How to Talk to Orla
            </h2>
            <p className="text-xl text-gray-900 max-w-4xl mx-auto font-medium">
              It's as simple as asking a question. Here are some examples:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                question: "How much money could I save with solar panels?",
                answer: "Orla will ask about your home and current energy bills, then give you a clear estimate of your potential savings."
              },
              {
                question: "What government help is available?",
                answer: "Orla knows all the current grants and schemes, and can tell you which ones you might qualify for."
              },
              {
                question: "Are solar panels worth it for my house?",
                answer: "Orla will consider your roof, location, and energy use to give you an honest assessment."
              },
              {
                question: "How do I find a good installer?",
                answer: "Orla can recommend trusted, certified installers in your area with good customer reviews."
              },
              {
                question: "What's a heat pump and do I need one?",
                answer: "Orla explains things in simple terms and helps you understand if it's right for your home."
              },
              {
                question: "Will this work with my old house?",
                answer: "Orla understands that every home is different and gives advice based on your specific situation."
              }
            ].map((example, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">Q</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">You might ask:</span>
                  </div>
                  <p className="text-gray-900 font-medium text-lg mb-4">
                    "{example.question}"
                  </p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center mb-2">
                    <div className="relative w-8 h-8 flex items-center justify-center mr-3">
                      {/* Elegant pulsing light effect for Orla */}
                      <div className="absolute inset-0 rounded-full bg-energy-green opacity-15" 
                           style={{ 
                             animation: 'pulse 3s ease-in-out infinite',
                             transform: 'scale(1)'
                           }}></div>
                      <div className="absolute inset-1 rounded-full bg-energy-green opacity-30" 
                           style={{ 
                             animation: 'pulse 3.5s ease-in-out infinite 0.5s',
                             transform: 'scale(1)'
                           }}></div>
                      <div className="absolute inset-2 rounded-full bg-energy-green opacity-60" 
                           style={{ 
                             animation: 'pulse 4s ease-in-out infinite 1s',
                             transform: 'scale(1)'
                           }}></div>
                      {/* Central bright green core */}
                      <div className="absolute inset-3 rounded-full bg-energy-green opacity-90 shadow-lg"
                           style={{ 
                             animation: 'pulse 4.5s ease-in-out infinite 1.5s',
                             transform: 'scale(1)'
                           }}></div>
                    </div>
                    <span className="text-sm font-medium text-energy-green">Orla responds:</span>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {example.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Ask Orla Section - Exact copy from home page */}
      <section id="orla" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
              {/* Elegant pulsing light effect for Orla */}
              <div className="absolute inset-0 rounded-full bg-energy-green opacity-15" 
                   style={{ 
                     animation: 'pulse 3s ease-in-out infinite',
                     transform: 'scale(1)'
                   }}></div>
              <div className="absolute inset-2 rounded-full bg-energy-green opacity-30" 
                   style={{ 
                     animation: 'pulse 3.5s ease-in-out infinite 0.5s',
                     transform: 'scale(1)'
                   }}></div>
              <div className="absolute inset-4 rounded-full bg-energy-green opacity-60" 
                   style={{ 
                     animation: 'pulse 4s ease-in-out infinite 1s',
                     transform: 'scale(1)'
                   }}></div>
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-energy-green rounded-full"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Have Questions? Ask Orla
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Our energy expert can answer any questions about solar panels, savings, 
              government grants, and help you find trusted local installers.
            </p>
          </div>
          
          <OrlaChat />
        </div>
      </section>

      <Footer />
    </div>
  );
}