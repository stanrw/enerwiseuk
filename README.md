# Enerwise - UK Renewable Energy Platform

A comprehensive B2C renewable energy assessment platform helping UK homeowners transition to renewable energy solutions.

## 🌟 Features

- **Instant Property Assessment** - Real UK government EPC data integration
- **AI-Powered Recommendations** - Solar, battery, heat pump, and EV charger analysis
- **Professional Installer Network** - MCS-certified installer matching
- **Orla AI Assistant** - Claude-powered renewable energy guidance
- **Email Verification System** - Secure user authentication with Resend
- **Quote Management** - Complete customer and installer portals

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/stanrw/Enerwise-Platform)

## 🛠 Environment Variables

```env
DATABASE_URL=your_neon_database_url
ANTHROPIC_API_KEY=your_anthropic_key
RESEND_API_KEY=your_resend_key
GOOGLE_SOLAR_API_KEY=your_google_key
GOOGLE_MAPS_API_KEY=your_maps_key
EPC_API_KEY=your_epc_key
OS_DATAHUB_API_KEY=your_os_key
OS_DATAHUB_SECRET=your_os_secret
```

## 📦 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, Drizzle ORM
- **Database**: PostgreSQL (Neon)
- **AI**: Claude 4.0 Sonnet
- **Email**: Resend
- **APIs**: Google Solar, UK EPC, OS DataHub
- **Hosting**: Vercel (recommended)

## 🏃‍♂️ Local Development

```bash
npm install
npm run db:push
npm run dev
```

## 📋 Deployment Steps

1. **Fork/Clone** this repository
2. **Deploy to Vercel** (connects automatically)
3. **Add environment variables** in Vercel dashboard
4. **Configure domain** (enerwise.uk)
5. **Set up DNS records** for email verification

## 💰 Cost Efficiency

- **Development**: Use Replit only when coding (stop when done)
- **Production**: Vercel free tier or $20/month Pro
- **Total savings**: $200+/month vs always-on development

## 🎯 Live Platform

Visit: [enerwise.uk](https://enerwise.uk)

## 📧 Support

Email: support@enerwise.uk

---

© 2025 Enerwise. Powered by [SOLR AI](https://solr.ai)