import { Link } from "wouter";

interface LogoProps {
  variant?: 'text' | 'icon' | 'horizontal' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function EnerwiseLogo({ variant = 'text', size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  if (variant === 'text') {
    return (
      <Link href="/">
        <div className={`flex items-center group cursor-pointer ${className}`}>
          <h1 className={`${textSizeClasses[size]} font-bold text-gray-900 group-hover:text-energy-green transition-colors`}>
            Ener<span className="text-energy-green">wise</span>
          </h1>
        </div>
      </Link>
    );
  }

  const logoSrc = {
    icon: '/assets/logos/enerwise-logo-icon.svg',
    horizontal: '/assets/logos/enerwise-logo-horizontal.svg',
    compact: '/assets/logos/enerwise-logo-compact.svg'
  }[variant];

  return (
    <Link href="/">
      <div className={`flex items-center group cursor-pointer ${className}`}>
        <img 
          src={logoSrc} 
          alt="Enerwise Logo" 
          className={`${sizeClasses[size]} group-hover:opacity-80 transition-opacity`}
        />
      </div>
    </Link>
  );
}

export function SolrLogo({ variant = 'dark', size = 'md', className = '' }: LogoProps & { variant?: 'dark' | 'white' }) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  const logoSrc = variant === 'white' ? '/assets/logos/solr-ai-logo-white.svg' : '/assets/logos/solr-ai-logo.svg';

  return (
    <a href="https://solr.ai" target="_blank" rel="noopener noreferrer" className={`inline-block ${className}`}>
      <img 
        src={logoSrc} 
        alt="SOLR AI Logo" 
        className={`${sizeClasses[size]} hover:opacity-80 transition-opacity`}
      />
    </a>
  );
}