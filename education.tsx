import Header from "@/components/header";
import Footer from "@/components/footer";
import EducationArticles from "@/components/education-articles";
import FaqSection from "@/components/faq-section";

export default function Education() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-energy-light to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Learn About Renewable Energy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about transitioning to renewable energy for your home
            </p>
          </div>

          <EducationArticles />
        </div>
      </section>

      <FaqSection />
      
      <Footer />
    </div>
  );
}
