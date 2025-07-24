import { db } from "./db";
import { installers, articles } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");
  
  // Seed installers
  const installersData = [
    {
      name: "SolarTech Solutions",
      description: "Specializing in residential solar installations with 10+ years experience",
      rating: "4.9",
      reviewCount: 127,
      certifications: ["MCS Certified", "RECC Approved"],
      specialties: ["solar", "battery"],
      serviceAreas: ["SW1", "SW2", "SW3", "SW4", "SW5"],
      contactEmail: "contact@solartech.co.uk",
      contactPhone: "020 7123 4567",
      website: "https://solartech.co.uk",
      isActive: true,
    },
    {
      name: "GreenEnergy Pro",
      description: "Full renewable energy solutions including heat pumps and battery storage",
      rating: "4.8",
      reviewCount: 89,
      certifications: ["RECC Approved", "TrustMark Registered"],
      specialties: ["solar", "battery", "heat_pump"],
      serviceAreas: ["N1", "N2", "N3", "N4", "N5"],
      contactEmail: "info@greenenergypro.co.uk",
      contactPhone: "020 7234 5678",
      website: "https://greenenergypro.co.uk",
      isActive: true,
    },
    {
      name: "EcoHome Experts",
      description: "Award-winning installer with expertise in complex residential projects",
      rating: "4.9",
      reviewCount: 156,
      certifications: ["TrustMark Registered", "MCS Certified"],
      specialties: ["solar", "battery", "heat_pump", "ev_charger"],
      serviceAreas: ["E1", "E2", "E3", "E4", "E5"],
      contactEmail: "hello@ecohome.co.uk",
      contactPhone: "020 7345 6789",
      website: "https://ecohome.co.uk",
      isActive: true,
    }
  ];

  await db.insert(installers).values(installersData);
  console.log("✅ Installers seeded");

  // Seed articles
  const articlesData = [
    {
      title: "Complete Guide to Solar Panel Installation",
      slug: "complete-guide-solar-panel-installation",
      excerpt: "Learn everything about the solar installation process, from initial assessment to system activation",
      content: "Solar panel installation is a comprehensive process that transforms your home into a renewable energy powerhouse...",
      category: "solar",
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
      isPublished: true,
    },
    {
      title: "Heat Pumps vs Gas Boilers: The Complete Comparison",
      slug: "heat-pumps-vs-gas-boilers-comparison",
      excerpt: "Compare costs, efficiency, and environmental impact to make the right heating choice",
      content: "When considering heating options for your home, the choice between heat pumps and gas boilers...",
      category: "heat_pump",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
      isPublished: true,
    },
    {
      title: "Maximizing Solar Savings with Battery Storage",
      slug: "maximizing-solar-savings-battery-storage",
      excerpt: "Discover how battery storage can increase your energy independence and savings",
      content: "Battery storage systems are revolutionizing how homeowners use solar energy...",
      category: "battery",
      imageUrl: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d",
      isPublished: true,
    }
  ];

  await db.insert(articles).values(articlesData);
  console.log("✅ Articles seeded");

  console.log("🎉 Database seeding completed!");
}

seedDatabase().catch(console.error);