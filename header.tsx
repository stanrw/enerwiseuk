import { useState } from "react";
import { Link, useLocation } from "wouter";

function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToOrla = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first without hash
    if (location !== '/') {
      window.location.href = '/';
      // Set a flag to scroll after navigation
      sessionStorage.setItem('scrollToOrla', 'true');
      return;
    }
    
    const orlaElement = document.getElementById('orla');
    if (orlaElement) {
      const headerHeight = 80;
      const elementPosition = orlaElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/meet-orla", label: "Meet Orla" },
    { href: "/learn", label: "Learn" },
    { href: "/partners", label: "Partners" },
    { href: "/customer-portal", label: "Customers" },
    { href: "/installer-portal", label: "Installers" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center group cursor-pointer">
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-energy-green transition-colors">
                  Ener<span className="text-energy-green">wise</span>
                </h1>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.href}
                    onClick={item.onClick}
                    className="text-gray-600 hover:text-energy-green px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ) : item.href.startsWith('/') ? (
                  <Link key={item.href} href={item.href} className="text-gray-600 hover:text-energy-green px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <a 
                    key={item.href}
                    href={item.href} 
                    className="text-gray-600 hover:text-energy-green px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                )
              ))}
              <Link href="/" className="bg-energy-green hover:bg-energy-dark text-white px-4 py-2 rounded-md text-sm font-medium hover:shadow-sm transition-all duration-200 ml-4 whitespace-nowrap">
                Start Assessment
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-600 hover:text-energy-green p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.href}
                    onClick={(e) => {
                      item.onClick(e);
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-energy-green block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    {item.label}
                  </button>
                ) : item.href.startsWith('/') ? (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className="text-gray-600 hover:text-energy-green block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-energy-green block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <Link 
                href="/"
                className="bg-energy-green text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-energy-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Assessment
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

// Support both named and default exports
export { Header };
export default Header;
