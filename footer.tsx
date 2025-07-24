import { Link } from "wouter";
import solrLogo from "@assets/Solr_Logos-01 copy_1751386809292.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Ener</span><span className="text-energy-green">wise</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Making renewable energy accessible to every home in the UK. Get expert guidance, 
              instant quotes, and connect with trusted installers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-energy-green transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-energy-green transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-energy-green transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-energy-green transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/solutions"><a className="hover:text-energy-green transition-colors">Solar Panels</a></Link></li>
              <li><Link href="/solutions"><a className="hover:text-energy-green transition-colors">Battery Storage</a></Link></li>
              <li><Link href="/solutions"><a className="hover:text-energy-green transition-colors">Heat Pumps</a></Link></li>
              <li><Link href="/solutions"><a className="hover:text-energy-green transition-colors">EV Chargers</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about"><a className="hover:text-energy-green transition-colors">About Us</a></Link></li>
              <li><Link href="/how-it-works"><a className="hover:text-energy-green transition-colors">How It Works</a></Link></li>
              <li><Link href="/education"><a className="hover:text-energy-green transition-colors">Education</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-energy-green transition-colors">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/pricing"><a className="hover:text-energy-green transition-colors">Pricing</a></Link></li>
              <li><Link href="/roi-disclaimer"><a className="hover:text-energy-green transition-colors">ROI Disclaimer</a></Link></li>
              <li><Link href="/accessibility"><a className="hover:text-energy-green transition-colors">Accessibility</a></Link></li>
              <li><Link href="/complaints"><a className="hover:text-energy-green transition-colors">Complaints</a></Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Enerwise. All rights reserved.
            </p>
            <a 
              href="https://solr.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 text-gray-400 text-sm hover:text-energy-green transition-colors"
            >
              <span>powered by</span>
              <img 
                src={solrLogo} 
                alt="SOLR AI Logo" 
                className="h-12 w-auto"
              />
            </a>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy">
              <a className="text-gray-400 hover:text-energy-green text-sm transition-colors">Privacy Policy</a>
            </Link>
            <Link href="/terms-of-service">
              <a className="text-gray-400 hover:text-energy-green text-sm transition-colors">Terms of Service</a>
            </Link>
            <Link href="/cookie-policy">
              <a className="text-gray-400 hover:text-energy-green text-sm transition-colors">Cookie Policy</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
export { Footer };
