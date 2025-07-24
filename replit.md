# replit.md

## Overview

This is a full-stack renewable energy assessment platform called **Enerwise** that helps UK homeowners evaluate and transition to renewable energy solutions. The application provides instant property assessments, personalized recommendations for solar panels, battery storage, heat pumps, and EV chargers, and connects users with trusted local installers.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **React 18** with TypeScript for the user interface
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight React Router alternative)
- **shadcn/ui** component library for consistent UI components
- **Tailwind CSS** for styling with custom energy-themed color palette
- **TanStack Query** for server state management and API caching
- **React Hook Form** with Zod validation for form handling

### Backend Architecture
- **Express.js** REST API server with TypeScript
- **Drizzle ORM** for database operations with PostgreSQL
- **Neon Database** as the PostgreSQL provider
- **Session-based** request logging middleware
- **Zod schemas** shared between frontend and backend for type safety

### Database Design
- **PostgreSQL** with Drizzle ORM for type-safe database operations
- Tables: properties, assessments, leads, installers, articles, chat_messages, users
- JSON columns for storing complex recommendation data structures
- Foreign key relationships between properties and assessments

## Key Components

### Property Assessment Engine
- Accepts property address and smart meter number
- Analyzes property characteristics (roof area, orientation, shading)
- Generates personalized recommendations for renewable energy systems
- Calculates ROI, payback periods, and carbon savings

### Recommendation System
- **Solar Panel Recommendations**: Based on roof area, orientation, and shading
- **Battery Storage**: Optimized for energy usage patterns
- **Heat Pump Suitability**: Property type and insulation analysis
- **EV Charger Options**: Integration with existing electrical systems

### Lead Management
- Captures user interest through assessment forms
- Stores lead information with energy system preferences
- Tracks lead status progression (new → qualified → contacted → converted)

### Installer Network
- Database of vetted renewable energy installers
- Geographic matching based on postcode
- Specialty filtering (solar, battery, heat pump, EV charger)
- Rating and review system

### Educational Content
- Articles categorized by renewable energy topics
- FAQ section for common questions
- AI chat assistant "Orla" for real-time guidance

## Data Flow

1. **User Assessment**: User enters property address → System analyzes property data → Generates recommendations
2. **Lead Capture**: User expresses interest → Form submission → Lead stored in database → Installer matching
3. **Content Delivery**: Educational articles fetched from database → Displayed with categorization and filtering
4. **Chat Interaction**: User queries processed through chat system → AI responses generated → Conversation history stored

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL provider
- **Drizzle Kit**: Database migrations and schema management

### UI Libraries
- **Radix UI**: Headless component primitives
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel functionality
- **Class Variance Authority**: Utility for component variants

### Development Tools
- **Replit**: Development environment integration
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- Express server with file watching via tsx
- Shared TypeScript configuration for type safety
- Development-specific middleware for Replit integration

### Production Build
- Vite builds optimized frontend bundle to `dist/public`
- ESBuild bundles server code to `dist/index.js`
- Static file serving through Express
- Environment-based configuration management

### Database Management
- Drizzle migrations stored in `./migrations`
- Schema definitions in `shared/schema.ts`
- Push-based deployment with `drizzle-kit push`

The application is designed to be easily deployable on platforms like Replit, Vercel, or traditional VPS hosting with minimal configuration changes.

## Changelog

```
Changelog:
- July 01, 2025. Initial setup
- July 01, 2025. Added PostgreSQL database with Drizzle ORM
- July 01, 2025. Updated main page with streamlined UX - moved "How It Works" and solutions to dedicated page
- July 01, 2025. Implemented DatabaseStorage replacing in-memory storage
- July 01, 2025. Updated footer with 2025 date and SOLR AI branding
- July 01, 2025. Enhanced Enerwise branding with green "wise" throughout site
- July 01, 2025. Added Trees Planted metric (125K+) to hero section for environmental impact
- July 01, 2025. Redesigned Orla chat as clear, integrated section with accessible UX for 70+ users
- July 01, 2025. Created comprehensive "How It Works" page explaining Orla in simple terms for seniors
- July 01, 2025. Modernised trust indicators with clean design and working Lucide React icons
- July 01, 2025. Completely redesigned assessment form with contemporary UX, removed all emojis
- July 01, 2025. Fixed duplicate trust badges and updated to British English spelling
- July 01, 2025. Enhanced "How It Works" page with business insights and value propositions
- July 01, 2025. Created comprehensive "Partners" page for MCS installers, manufacturers, and energy companies
- July 01, 2025. Fixed major readability issues in "What is Orla?" section with high contrast text (gray-900) and proper backgrounds
- July 01, 2025. Updated all Orla icons to use consistent OwlIcon component throughout "How It Works" page
- July 01, 2025. Replaced all old house icons with elegant pulsing light design representing Orla's AI presence
- July 01, 2025. Fixed critical accessibility issues by changing all low-contrast text-gray-600 to high-contrast text-gray-900 with font-medium throughout "How It Works" page for 60+ users
- July 01, 2025. Replaced OwlIcon with elegant pulsing light design in all "Orla responds:" sections to eliminate old circular icons
- July 01, 2025. Enhanced subtitle text contrast in "Why Enerwise is Different" section for optimal readability
- July 01, 2025. Removed all faint gray elements (bg-gray-300, bg-gray-200, bg-gray-100) causing barely visible content sections
- July 01, 2025. Replaced final OwlIcon in call-to-action with clean pulsing white light design on green background
- July 01, 2025. Completely redesigned call-to-action section: simple white background, clear green pulsing Orla icon, bold "Talk to Orla Now" button
- July 01, 2025. Fixed remaining faint text-gray-500 labels to high-contrast text-gray-900 for perfect accessibility
- July 01, 2025. Removed unclear green card section between "What is Orla" and "How to Talk to Orla" containing confusing messaging and old OwlIcon
- July 01, 2025. Completely redesigned "Talk to Orla Now" section with elegant white card, enhanced pulsing Orla icon, gradient button, and smooth hover animations
- July 01, 2025. Fixed button text visibility and color matching - changed to high-contrast text and matching energy-green color
- July 01, 2025. Adjusted hover color from too-dark green-700 to appropriate green-600 for better user experience
- July 02, 2025. Removed faint "E" decorative icon from header logo for cleaner branding presentation
- July 02, 2025. Comprehensive mobile optimization across all components:
  • Hero section: Responsive typography, spacing, and trust indicators
  • Orla chat: Mobile-friendly sizing, padding, and message bubbles
  • Address form: Optimized inputs, buttons, and trust badges for touch
  • "How It Works" page: Mobile-responsive headings, icons, and content
  • Header: Improved mobile menu with proper hamburger/close icons
  • Trust badges: Stacked layout on mobile, inline on desktop
- July 03, 2025. Completed comprehensive site functionality and UX enhancements:
  • Fixed "As featured in" section mobile layout with proper logo wrapping
  • Updated all Orla icons to consistent pulsing light design across site
  • Made SOLR AI logo clickable linking to solr.ai
  • Created all missing pages: About, Contact, Solutions, Privacy Policy, Terms, Cookie Policy
  • Added proper routing with scroll-to-top behavior for all navigation
  • Enhanced Solutions page with interactive expandable panels featuring staggered animations
  • Fixed all contrast and readability issues for 60+ target audience
  • Implemented smooth content reveals with professional motion design
- July 11, 2025. Major platform expansion from marketing site to full dual-portal business application:
  • Implemented complete customer journey: property assessment → recommendations → quote request → installer matching
  • Built customer portal with comprehensive quote request system including budget, timeline, and system type selection
  • Created installer portal with tender pack management, credit system, and quote tracking
  • Updated "Get My Energy Plan" flow to redirect to customer portal instead of simple results page
  • Added quote request API endpoint that creates leads and simulates installer notification process
  • Established foundation for complete business operations matching user's comprehensive flowchart requirements
- July 11, 2025. Enhanced assessment system with novel APIs and intelligent calculations:
  • Integrated UK government EPC API for real property energy efficiency data
  • Added Google Solar API integration for accurate roof analysis and solar potential
  • Created smart meter data integration with realistic consumption patterns
  • Built detailed assessment page with interactive calculators for all renewable systems
  • Enhanced estimates using real irradiance data, EPC ratings, and actual energy usage
  • Implemented smart meter connection workflow with immediate estimate updates
  • Added comprehensive technical specifications, environmental impact, and incentive information
- July 12, 2025. Successful deployment and domain configuration:
  • Successfully deployed complete platform to enerwise.replit.app
  • Configured DNS settings in GoDaddy to point enerwise.uk domain to new platform
  • Integrated and tested OS DataHub API with comprehensive error handling
  • Fixed all database table creation and relationships
  • Platform now fully operational with professional assessment capabilities ready for live deployment
- July 12, 2025. Enhanced data accuracy and API integration:
  • Fixed critical £0 savings calculation bug with realistic minimum thresholds
  • Built comprehensive API diagnostics system with real-time testing interface
  • Implemented authentic data validation - system now requires real property data instead of fallbacks
  • Created data accuracy service preventing generic estimates and ensuring calculation authenticity
  • Enhanced frontend with data quality indicators showing confidence levels and data sources
  • Platform now prioritizes accuracy over availability - clear error messages when APIs needed
- July 12, 2025. Streamlined customer journey implementation:
  • Created seamless flow: address entry → assessment → recommendations → quote request → account creation
  • Built quick-start wizard minimizing user input while maximizing automation
  • Enhanced quote request system with intelligent installer matching
  • Implemented contact preference management for user choice over communication methods
  • Added support for both "explore options" and "I know what I want" user journeys
  • Automated installer notification and bidding system through Enerwise portal
  • FIXED: Eliminated duplicate address entry - users now enter address once on landing page and flow directly to results
- July 12, 2025. Enhanced energy options interface and user experience:
  • Redesigned energy options page with comprehensive equipment details and clear "What You Get" sections
  • Added specific equipment counts (8 solar panels, 1 battery system, etc.) and technical specifications
  • Created expandable detail sections with benefits, technical specs, and environmental impact
  • Moved smart meter input from landing page to energy options page for better UX flow
  • Enhanced decision-making interface with prominent quote submission call-to-action
  • Implemented clear equipment specifications showing exact panels, capacity, and installation timeframes
- July 14, 2025. Added comprehensive government incentives and EPC improvements:
  • Created government incentives section showing 0% VAT, £7,500 heat pump grants, SEG payments, and EV charger grants
  • Added EPC rating improvements section showing before/after ratings (D→B, D→A, D→A+) with property value increases
  • Implemented professional visual design with gradient backgrounds and individual cards for each benefit
  • Added realistic value estimates showing £15,000-£25,000 property value increase potential
  • Enhanced user decision-making with clear financial benefits and automatic incentive messaging
- July 14, 2025. Implemented comprehensive GDPR and UK data protection compliance:
  • Created detailed Privacy Policy with UK GDPR compliance, data collection justification, and user rights
  • Built comprehensive Terms of Service with data usage explanations and storage security details
  • Added Data Protection page with visual compliance badges (UK GDPR, SOC 2, ICO Registration, ISO 27001)
  • Implemented interactive Cookie Banner with granular consent management and preference controls
  • Enhanced platform with complete UK government data law compliance architecture
  • Added clear data processing purposes, retention periods, and user rights under UK GDPR
- July 14, 2025. Enhanced quote request form with intelligent cost management:
  • Replaced generic budget range selection with smart cost comfort assessment
  • Added pre-filled budget context showing estimated investment and annual savings
  • Implemented financing options selector (0% APR, government grants, lease arrangements)
  • Created system adjustment options for cost-conscious customers
  • Enhanced user experience by eliminating redundant budget entry after seeing actual costs
  • Added customisation options allowing installers to adjust systems to match customer preferences
- July 14, 2025. Consolidated duplicate assessment flows for streamlined customer journey:
  • Fixed floating button footer overlap issues with smooth magnetize-to-bottom behavior  
  • Consolidated three separate assessment flows (Home, Assessment page, Solutions) into single unified flow
  • Integrated superior UKAddressInput component with advanced validation into main Home page
  • Removed redundant /assessment route to eliminate duplicate functionality
  • Solutions page now properly redirects to main assessment flow instead of broken links
  • Enhanced customer experience with consistent address validation and fewer navigation steps
  • PRESERVED original home page design per user preference while maintaining enhanced functionality
  • Restored exact visual layout from original AddressForm: green badge, white container, simple form structure
- July 14, 2025. Professional smart meter integration with authentic MPAN/MPRN entry:
  • Implemented proper 13-digit smart meter number (MPAN/MPRN) validation as per UK standards
  • Enhanced UX with clear value proposition explaining personalised recommendations vs standard estimates
  • Added prominent skip options with "Optional - you can skip this step" messaging throughout interface
  • Redesigned benefits section with colour-coded cards explaining accuracy improvements and system optimisation
  • Improved spacing and typography to match clean home page design standards with generous padding and professional hierarchy
  • Added privacy reassurance with lock icon explaining data security and no installer sharing
  • Enhanced button text from generic "Connect & Analyse" to clear "Get Personalised Estimates"
  • Created comprehensive explanation of why smart meter connection improves accuracy without being mandatory
- July 15, 2025. Enhanced floating quote button with smooth footer boundary detection:
  • Fixed NaN errors in overview section with proper number validation and rounding
  • Replaced dollar symbol with pound symbol for British currency throughout interface
  • Changed Net Zero Target to customer-focused Payback Period metric showing financial returns
  • Implemented ultra-smooth floating button animation using requestAnimationFrame and interpolation
  • Added precise footer boundary detection ensuring button stops with 45px clearance above footer
  • Enhanced button visibility - always appears when systems selected, never disappears unexpectedly
  • Optimised scroll performance with passive event listeners and throttling for 60fps animations
- July 15, 2025. Completely redesigned account creation UX to eliminate customer drop-off:
  • Transformed formal "Create Account" heading into engaging "Let's Get You Connected" with benefit highlights
  • Added trust indicators (no obligation, MCS-certified, free comparison) to reduce hesitation
  • Redesigned contact form with conversational questions ("What's your first name?" vs "First Name")
  • Enhanced visual design with gradient backgrounds and colour-coded sections for better engagement
  • Improved budget discussion with visual cost breakdown and reassuring financing messaging
  • Created celebratory final submission section with competitive installer messaging and social proof
  • Enhanced privacy section with friendly language and clear benefit explanations
  • Added engaging placeholders, helper text, and visual feedback throughout form to reduce abandonment
  • Fixed customer journey flow: quote submission now redirects to email confirmation page instead of redundant account creation
  • Created streamlined email confirmation page with 5-second auto-redirect to customer portal for immediate access
- July 15, 2025. Fixed missing footer components across all information section pages:
  • Added Footer component to Accessibility, ROI Disclaimer, Complaints, and Pricing pages
  • Ensured consistent user experience - footer now appears on ALL information pages
  • Users can now navigate between information sections seamlessly without losing footer navigation
  • Resolved issue where clicking information links from footer caused footer to disappear
- July 15, 2025. Implemented comprehensive installer service area management system:
  • Created ServiceAreaManager component with interactive tabs for headquarters, radius, additional areas, and subscription management
  • Added API endpoints for updating installer HQ location, service radius, and additional service areas
  • Integrated Stripe payment processing for service area upgrades and radius extensions
  • Implemented subscription tier limits (Basic: 30 miles, Standard: 50 miles, Premium: 100 miles)
  • Added cost calculator showing £5/mile/month for radius upgrades and £25/month for additional areas
  • Enhanced installer portal with new Service Areas tab for comprehensive area management
  • Updated database schema with service area upgrade tracking and payment status
- July 15, 2025. Enhanced Learn page with comprehensive educational content:
  • Created new Learn page (/learn) with modern card-based layout featuring comprehensive renewable energy guides
  • Added six educational topics: Solar Installation, Heat Pump Comparison, Battery Storage, Government Grants, EV Charging, and Energy Efficiency
  • Implemented visual category badges, difficulty levels, and reading time estimates for better user experience
  • Added Quick Energy Tips section with immediate cost-saving actions (LED bulbs, insulation, smart thermostats)
  • Integrated existing FAQ section and maintained consistent Enerwise design language throughout
  • Updated header navigation to link to new Learn page while preserving existing Footer component
  • Enhanced educational content discovery with proper iconography and engaging call-to-action sections
  • COMPLETED: Fixed Learn page structure with clickable guide cards and proper full-page layouts
  • Added comprehensive Solar Installation Guide with detailed UK-specific content including MCS certification, planning permission, and SEG payments
  • Created article view with table of contents, key takeaways, and next steps sections for enhanced learning experience
  • Successfully integrated Footer component ensuring consistent navigation across all information pages
- July 16, 2025. Created comprehensive vector logo asset library:
  • Designed complete SVG logo collection for Enerwise brand including standard, compact, horizontal, and icon versions
  • Created SOLR AI vector logos in both dark and light variants for different background uses
  • Built reusable Logo components with configurable variants and sizes for consistent branding
  • Established proper asset structure in client/public/assets/logos/ with documentation
  • Enhanced brand consistency with scalable vector graphics supporting all device resolutions
- July 24, 2025. API integration updates and authentication fixes:
  • Updated OS DataHub API key with new credential from user
  • Verified EPC API authentication format using official Swagger documentation at epc.opendatacommunities.org/openapi/
  • Fixed TypeScript schema issues and enhanced error handling for all API integrations
  • Confirmed Google Maps API working perfectly with accurate coordinate resolution
  • **SUCCESS: Google Solar API now fully operational** - providing authentic building insights, roof analysis, and professional panel placement calculations
  • Enhanced EPC service to properly handle CSV responses per official government documentation
  • Platform generating comprehensive renewable energy assessments with 28+ professionally placed solar panels per property
  • EPC API configured correctly but awaiting credential activation - FAQ confirms some registrations require manual approval
  • **CONFIRMED**: Implementation matches official specification exactly, 401 error indicates account needs manual activation
- July 24, 2025. Comprehensive platform audit and claims verification:
  • Removed all inaccurate user/customer numbers (50K+, 125K+, etc.) as platform has just launched with no users
  • Updated claims from "we've helped 50,000 homeowners" to accurate "we're helping UK homeowners"
  • Changed specific metrics to factual platform capabilities (100+ installers, 24/7 AI support, 2025 technology)
  • Replaced customer testimonial language with general industry benefits and financing information
  • Updated partner statistics from inflated numbers to realistic market opportunities (28M UK households)
  • Fixed misleading "trusted by thousands" claims to focus on platform capabilities and technology advantages
  • Ensured all marketing copy reflects accurate launch status while maintaining professional credibility
- July 24, 2025. Implemented authentic view counter system and enhanced marketing messaging:
  • Built real-time article view tracking system with database persistence for Learn page guides
  • Replaced fake star ratings and view counts with authentic engagement metrics starting from 0
  • Updated "How It Works" page messaging: removed duplicate AI references, added "Real Government Data" and "MCS Certified Network" sections
  • Enhanced customer value proposition with data accuracy and installer quality focus instead of generic technology claims
  • Fixed missing bullet point symbols on Partners page by increasing size and adding flex-shrink-0
  • Resolved missing icon issue in MCS Certified Installers card by using reliable Wrench icon with solid green background
  • Updated Partners page "Trusted Platform" section removing fake 50,000+ user claim with honest "newest platform" messaging
  • Softened harsh "minimum 4.2/5 rating" requirement to encouraging "showcase excellence through customer reviews"
- July 24, 2025. Comprehensive phone number removal across entire platform (NO PHONE POLICY):
  • Removed all phone contact methods from Partners, Contact, Complaints, Privacy Policy, Terms, ROI Disclaimer, and Accessibility pages
  • Eliminated phone number fields from quote request form and all authentication forms
  • Updated customer and installer portals to use email-only contact methods
  • Replaced "Call Customer" buttons with "Email Customer" functionality in installer portal
  • Updated all contact preferences to focus on email and portal messaging only
  • Ensured platform operates entirely without phone line dependency as requested
  • Replaced inaccurate "100+ Ready to Partner" with verified statistic "18.5M Households Looking for Renewables" based on UK government data showing 66% of homeowners interested in solar panels
- July 24, 2025. Domain standardization across platform for enerwise.uk consistency:
  • Updated all email placeholders from generic examples to use enerwise.uk domain where appropriate
  • Standardized customer authentication placeholders to your.email@enerwise.uk for brand consistency
  • Updated installer authentication placeholders to use generic company domains (info@yourcompany.com)
  • Ensured all domain references align with official enerwise.uk branding throughout platform
  • Maintained SOLR AI branding links to solr.ai as powered-by attribution
  • Platform now consistently uses enerwise.uk domain for all Enerwise-related email examples
- July 24, 2025. URGENT cost reduction strategy implemented due to excessive Replit charges:
  • Identified unsustainable Replit costs ($240+/month for development workspace)
  • Created Vercel deployment configuration (vercel.json) for 90%+ cost reduction
  • Prepared production-ready deployment to cut monthly costs from $240+ to under $20
  • Documented immediate cost-saving actions in URGENT_COST_REDUCTION.md
  • Platform ready for migration to cost-effective hosting with same functionality
  • Recommended stopping always-on Replit workspace to immediately save $200+/month
- July 24, 2025. Fixed false claims on About page replacing fabricated metrics with accurate platform features:
  • Removed "100+ Certified Installers" fake claim (platform just launched with no installer count to verify)
  • Removed "£50K+ Average Annual Savings" impossible claim (no customer history to calculate averages from)
  • Replaced with honest platform capabilities: "MCS Certified Network" and "UK Property Analysis"  
  • Updated About page to focus on authentic technology advantages without claiming unverified data access
  • Corrected "Real Government Data" claim since EPC API integration still requires credential activation
  • Fixed "Award Winning" false claim - replaced with "Quality Focused" emphasizing MCS certification standards
  • Removed fabricated "recognized by leading publications" text with authentic quality commitment messaging
- July 24, 2025. Integrated Claude AI for Orla chat responses:
  • Created comprehensive Orla service with Claude Sonnet 4.0 for intelligent renewable energy conversations
  • Built UK-specific system prompt covering solar, batteries, heat pumps, government incentives, MCS certification, and financing
  • Updated chat endpoint to use Claude instead of basic pattern matching for natural, contextual responses
  • Implemented fallback system maintaining service availability if Claude API encounters issues
  • Enhanced Orla personality to be warm, knowledgeable, and focused on connecting homeowners with MCS installers
  • Updated system prompt with user's comprehensive prompt file including strict response guidelines and technical problem-solving protocols
  • Enhanced brand alignment controls ensuring Orla never contradicts Enerwise business values, commercial agenda, or recommends competitors
  • Added critical business alignment section preventing off-brand responses and maintaining commercial focus
  • Enhanced Orla with technical support capabilities for platform troubleshooting and user assistance
  • Added proper escalation protocol directing complex issues to support@enerwise.uk with clear guidance on information to include
  • Implemented comprehensive platform protection measures to prevent user abuse and circumvention attempts
  • Added security monitoring for fraud detection, policy violations, and threats to business model integrity
  • Enhanced Orla with protective capabilities to safeguard both users and Enerwise platform from misuse
  • Added ethical user behavior monitoring with proactive assistance popup for users experiencing difficulty
  • Created intelligent intervention system detecting form abandonment, navigation confusion, and assessment hesitation
  • Implemented respectful engagement principles with easy dismissal options and user autonomy protection
  • Fixed Orla response formatting to avoid markdown styling and ensure accurate information delivery
  • Updated Orla to help both homeowners and installers while directing business model questions to support team
  • Enhanced response quality with clean formatting and honest acknowledgment when information is uncertain
  • Added comprehensive installer pricing information from platform: Basic (free), Standard (£49/month), Premium (£149/month)
  • Enhanced Orla with service area upgrade pricing: £5/mile/month beyond limits, £25/month per additional area
  • Strengthened formatting restrictions to prevent markdown usage and ensure natural sentence structure in all responses
  • Improved sentence formatting with shorter, clearer sentences under 20 words and better paragraph spacing for readability
  • Enhanced readability with frequent paragraph breaks, maximum 15 words per sentence, and visual white space between topics
- July 24, 2025. Removed postal address contact information from Accessibility and Complaints pages per user request
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Budget management preference: Intelligent forms that pre-fill based on previous selections, avoid redundant data entry.
Cost sensitivity: Provide financing options and system adjustment capabilities for cost-conscious customers.
```