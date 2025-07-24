// Enhanced Google Solar API integration with professional-grade analysis
import { geocodeWithGoogle } from "./geocoding";

export interface BuildingInsights {
  name: string;
  center: {
    latitude: number;
    longitude: number;
  };
  boundingBox: {
    sw: { latitude: number; longitude: number };
    ne: { latitude: number; longitude: number };
  };
  imageryDate: {
    year: number;
    month: number;
    day: number;
  };
  postalCode: string;
  administrativeArea: string;
  regionCode: string;
  solarPotential: {
    maxArrayPanelsCount: number;
    maxArrayAreaMeters2: number;
    maxSunshineHoursPerYear: number;
    carbonOffsetFactorKgPerMwh: number;
    wholeRoofStats: {
      areaMeters2: number;
      sunshineQuantiles: number[];
      groundAreaMeters2: number;
    };
    roofSegmentStats: Array<{
      pitchDegrees: number;
      azimuthDegrees: number;
      stats: {
        areaMeters2: number;
        sunshineQuantiles: number[];
        groundAreaMeters2: number;
      };
      center: {
        latitude: number;
        longitude: number;
      };
      boundingBox: {
        sw: { latitude: number; longitude: number };
        ne: { latitude: number; longitude: number };
      };
    }>;
    solarPanels: Array<{
      center: {
        latitude: number;
        longitude: number;
      };
      orientation: string;
      yearlyEnergyDcKwh: number;
      segmentIndex: number;
    }>;
  };
}

export interface EnhancedSolarData {
  buildingInsights: BuildingInsights;
  roofAnalysis: {
    totalRoofArea: number;
    usableRoofArea: number;
    segmentCount: number;
    primaryOrientation: number;
    averagePitch: number;
    shadingFactor: number;
  };
  panelLayout: {
    recommendedPanels: number;
    totalCapacity: number; // kWp
    annualGeneration: number; // kWh
    roofCoverage: number; // percentage
  };
  financialAnalysis: {
    systemCost: number;
    annualSavings: number;
    paybackPeriod: number;
    roi25Year: number;
    carbonOffset: number; // tonnes CO2/year
  };
  dataQuality: {
    confidence: number; // 0-1
    imageryAge: number; // months
    hasDetailedSegments: boolean;
  };
}

export async function getBuildingInsights(address: string): Promise<BuildingInsights | null> {
  const apiKey = process.env.GOOGLE_SOLAR_API;
  
  if (!apiKey) {
    console.log('Google Solar API key not available');
    return null;
  }

  try {
    // First get coordinates from address
    const coordinates = await geocodeWithGoogle(address);
    
    const response = await fetch(
      `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${coordinates.lat}&location.longitude=${coordinates.lng}&requiredQuality=HIGH&key=${apiKey}`
    );
    
    if (!response.ok) {
      console.log(`Solar API error: ${response.status} - ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    console.log('Successfully retrieved building insights');
    return data;
    
  } catch (error) {
    console.error('Building insights error:', error);
    return null;
  }
}

export async function getDataLayers(address: string, radiusMeters: number = 30): Promise<any> {
  const apiKey = process.env.GOOGLE_SOLAR_API;
  
  if (!apiKey) {
    console.log('Google Solar API key not available for data layers');
    return null;
  }

  try {
    const coordinates = await geocodeWithGoogle(address);
    
    const response = await fetch(
      `https://solar.googleapis.com/v1/dataLayers:get?location.latitude=${coordinates.lat}&location.longitude=${coordinates.lng}&radiusMeters=${radiusMeters}&pixelSizeMeters=0.1&key=${apiKey}`
    );
    
    if (!response.ok) {
      console.log(`Data layers API error: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    console.log('Successfully retrieved data layers');
    return data;
    
  } catch (error) {
    console.error('Data layers error:', error);
    return null;
  }
}

export function transformGoogleSolarData(buildingInsights: BuildingInsights): EnhancedSolarData {
  const solar = buildingInsights.solarPotential;
  const roofSegments = solar.roofSegmentStats || [];
  
  // Analyze roof characteristics
  const totalRoofArea = solar.wholeRoofStats.areaMeters2;
  const usableRoofArea = solar.maxArrayAreaMeters2;
  const primaryOrientation = roofSegments.length > 0 ? 
    roofSegments.reduce((best, current) => 
      current.stats.areaMeters2 > best.stats.areaMeters2 ? current : best
    ).azimuthDegrees : 180;
  
  const averagePitch = roofSegments.length > 0 ? 
    roofSegments.reduce((sum, seg) => sum + seg.pitchDegrees, 0) / roofSegments.length : 30;
  
  // Calculate recommended system
  const recommendedPanels = solar.maxArrayPanelsCount;
  const totalCapacity = recommendedPanels * 0.4; // 400W per panel
  const annualGeneration = solar.solarPanels?.reduce((sum, panel) => sum + panel.yearlyEnergyDcKwh, 0) || 
                          totalCapacity * 1000; // kWh estimate
  
  // Financial calculations (UK specific)
  const systemCost = totalCapacity * 1400; // £1400 per kWp in 2025
  const electricityRate = 0.32; // 32p per kWh average
  const annualSavings = annualGeneration * electricityRate * 0.7; // 70% self-consumption
  const paybackPeriod = systemCost / annualSavings;
  const roi25Year = ((annualSavings * 25) / systemCost) * 100;
  const carbonOffset = annualGeneration * 0.23 / 1000; // tonnes CO2
  
  // Data quality assessment
  const imageryAge = buildingInsights.imageryDate ? 
    (new Date().getFullYear() - buildingInsights.imageryDate.year) * 12 +
    (new Date().getMonth() - buildingInsights.imageryDate.month) : 12;
  
  const confidence = roofSegments.length > 0 && solar.solarPanels?.length > 0 ? 0.9 : 0.6;
  
  return {
    buildingInsights,
    roofAnalysis: {
      totalRoofArea,
      usableRoofArea,
      segmentCount: roofSegments.length,
      primaryOrientation,
      averagePitch,
      shadingFactor: 0.85 // Default UK shading factor
    },
    panelLayout: {
      recommendedPanels,
      totalCapacity,
      annualGeneration,
      roofCoverage: (usableRoofArea / totalRoofArea) * 100
    },
    financialAnalysis: {
      systemCost,
      annualSavings,
      paybackPeriod,
      roi25Year,
      carbonOffset
    },
    dataQuality: {
      confidence,
      imageryAge,
      hasDetailedSegments: roofSegments.length > 1
    }
  };
}

export async function getElevationData(coordinates: { latitude: number; longitude: number }): Promise<number | null> {
  const apiKey = process.env.GOOGLE_SOLAR_API;
  
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/elevation/json?locations=${coordinates.latitude},${coordinates.longitude}&key=${apiKey}`
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].elevation;
    }
    
    return null;
  } catch (error) {
    console.error('Elevation API error:', error);
    return null;
  }
}

export async function getAerialView(coordinates: { latitude: number; longitude: number }): Promise<string | null> {
  const apiKey = process.env.GOOGLE_SOLAR_API;
  
  if (!apiKey) {
    return null;
  }

  // Generate aerial image URL
  const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.latitude},${coordinates.longitude}&zoom=20&size=640x640&maptype=satellite&key=${apiKey}`;
  
  return imageUrl;
}

// Mock weather data for UK locations
export function getWeatherData(coordinates: { latitude: number; longitude: number }) {
  // Simulate UK weather patterns
  const latitude = coordinates.latitude;
  
  // UK latitude ranges roughly from 50.0 (south) to 60.0 (north Scotland)
  const irradianceFactor = Math.max(0.8, Math.min(1.0, (latitude - 49) / 11));
  
  return {
    averageIrradiance: 1000 * irradianceFactor, // kWh/m²/year
    averageTemperature: latitude > 55 ? 8 : 10, // Celsius
    cloudCoverFactor: 0.6, // UK average
    weatherAdjustment: irradianceFactor * 0.9 // Overall weather impact
  };
}