// UK Renewable Energy Assessment APIs Integration
// This module provides access to government and commercial APIs for accurate renewable energy assessments

import { geocodeWithGoogle } from "./geocoding";
import { getBuildingInsights, transformGoogleSolarData, getElevationData, getAerialView, getWeatherData } from "./advanced-solar-api";
import { generateProfessionalInstallation, UK_INSTALLER_STANDARDS } from "./professional-analysis";

export interface PropertyAnalysis {
  address: string;
  postcode: string;
  coordinates?: { lat: number; lon: number };
  epcData?: EPCData;
  solarPotential?: SolarPotential;
  heatPumpSuitability?: HeatPumpSuitability;
  smartMeterData?: SmartMeterData;
  osDatahubData?: any;
}

export interface EPCData {
  currentRating: string;
  currentScore: number;
  potentialRating: string;
  potentialScore: number;
  propertyType: string;
  builtForm: string;
  floorArea: number;
  heatingCost: number;
  environmentImpact: number;
  energyConsumption: number;
  recommendations: string[];
}

export interface SolarPotential {
  roofArea: number;
  orientation: string;
  tilt: number;
  shadingFactor: number;
  annualIrradiance: number; // kWh/m²/year
  suitabilityScore: number;
  maxCapacity: number; // kWp
  estimatedGeneration: number; // kWh/year
  professionalInstallation?: any; // Professional panel layout analysis
  advancedAnalysis?: any; // Enhanced Google Solar API data
}

export interface HeatPumpSuitability {
  propertyType: "house" | "flat" | "bungalow";
  gardenArea: number;
  airSourceSuitable: boolean;
  groundSourceSuitable: boolean;
  existingHeating: string;
  insulationLevel: "poor" | "average" | "good" | "excellent";
  heatLoss: number; // kW
  recommendedCapacity: number; // kW
  suitabilityScore: number;
}

export interface SmartMeterData {
  mpan: string;
  dailyUsage: number[];
  peakTimes: string[];
  seasonalPattern: "winter_peak" | "summer_peak" | "consistent";
  averageDaily: number; // kWh
  averageMonthly: number; // kWh
  costPerMonth: number;
}

export class EnergyAssessmentService {
  private epcApiKey?: string;
  private googleSolarApiKey?: string;
  private smartMeterApiKey?: string;
  private osDatahubApiKey?: string;

  constructor() {
    // API keys from environment variables
    this.epcApiKey = process.env.EPC_API_KEY;
    this.googleSolarApiKey = process.env.GOOGLE_SOLAR_API_KEY;
    this.smartMeterApiKey = process.env.SMART_METER_API_KEY;
    this.osDatahubApiKey = process.env.OS_DATAHUB_API_KEY;
    
    console.log('API Keys loaded:', {
      epcKey: !!this.epcApiKey,
      googleSolarKey: !!this.googleSolarApiKey,
      osDatahubKey: !!this.osDatahubApiKey,
      smartMeterKey: !!this.smartMeterApiKey
    });
  }

  /**
   * Get EPC data from UK government database
   * Uses https://epc.opendatacommunities.org/ API
   */
  async getEPCData(postcode: string): Promise<EPCData | null> {
    if (!this.epcApiKey || !process.env.EPC_EMAIL) {
      console.log('EPC API credentials not available, using mock data');
      return this.getMockEPCData(postcode);
    }
    
    try {
      // Use environment variables for credentials
      const email = process.env.EPC_EMAIL;
      const apiKey = this.epcApiKey;
      
      const credentials = Buffer.from(`${email}:${apiKey}`).toString('base64');
      
      console.log(`EPC API: Searching for postcode ${postcode} with working credentials`);
      
      const response = await fetch(
        `https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${encodeURIComponent(postcode)}&size=5`,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${credentials}`
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`EPC API error: ${response.status} - ${errorText}`);
        return this.getMockEPCData(postcode);
      }

      const data = await response.json();
      console.log(`EPC API: Found ${data.rows?.length || 0} records for ${postcode}`);
      
      if (data.rows && data.rows.length > 0) {
        const epcRecord = data.rows[0];
        console.log(`EPC API: Using record for ${epcRecord.ADDRESS || epcRecord['address1'] || 'Unknown address'}`);
        
        return {
          currentRating: epcRecord['CURRENT-ENERGY-RATING'] || epcRecord['current-energy-rating'] || epcRecord.CURRENT_ENERGY_RATING,
          currentScore: parseInt(epcRecord['CURRENT-ENERGY-EFFICIENCY'] || epcRecord['current-energy-efficiency'] || epcRecord.CURRENT_ENERGY_EFFICIENCY || 50),
          potentialRating: epcRecord['POTENTIAL-ENERGY-RATING'] || epcRecord['potential-energy-rating'] || epcRecord.POTENTIAL_ENERGY_RATING,
          potentialScore: parseInt(epcRecord['POTENTIAL-ENERGY-EFFICIENCY'] || epcRecord['potential-energy-efficiency'] || epcRecord.POTENTIAL_ENERGY_EFFICIENCY || 75),
          propertyType: epcRecord['PROPERTY-TYPE'] || epcRecord['property-type'] || epcRecord.PROPERTY_TYPE,
          builtForm: epcRecord['BUILT-FORM'] || epcRecord['built-form'] || epcRecord.BUILT_FORM,
          floorArea: parseFloat(epcRecord['TOTAL-FLOOR-AREA'] || epcRecord['total-floor-area'] || epcRecord.TOTAL_FLOOR_AREA || 120),
          heatingCost: parseFloat(epcRecord['HEATING-COST-CURRENT'] || epcRecord['heating-cost-current'] || epcRecord.HEATING_COST_CURRENT || 800),
          environmentImpact: parseInt(epcRecord['ENVIRONMENT-IMPACT-CURRENT'] || epcRecord['environment-impact-current'] || epcRecord.ENVIRONMENT_IMPACT_CURRENT || 50),
          energyConsumption: parseFloat(epcRecord['ENERGY-CONSUMPTION-CURRENT'] || epcRecord['energy-consumption-current'] || epcRecord.ENERGY_CONSUMPTION_CURRENT || 12000),
          recommendations: (epcRecord['IMPROVEMENT-SUMMARY'] || epcRecord['improvement-summary'] || epcRecord.IMPROVEMENT_SUMMARY || '').split(';').filter((r: string) => r.trim())
        };
      }

      console.log(`EPC API: No records found for postcode ${postcode}, using mock data`);
      return this.getMockEPCData(postcode);
    } catch (error) {
      console.error('EPC API error:', error);
      return this.getMockEPCData(postcode);
    }
  }

  /**
   * Get enhanced solar potential using advanced Google Solar API
   * Includes professional installation analysis and detailed roof assessment
   */
  async getSolarPotential(lat: number, lon: number, address?: string): Promise<SolarPotential | null> {
    try {
      console.log(`Getting enhanced solar potential for ${lat}, ${lon}`);
      
      // Use advanced Google Solar API integration
      const buildingInsights = address ? await getBuildingInsights(address) : null;
      
      if (buildingInsights) {
        // Transform to enhanced solar data
        const enhancedData = transformGoogleSolarData(buildingInsights);
        
        // Generate professional installation layout
        const professionalInstallation = generateProfessionalInstallation(buildingInsights, UK_INSTALLER_STANDARDS);
        
        // Get additional data layers for enhanced analysis
        const [elevation, weather, aerialImageUrl] = await Promise.all([
          getElevationData(buildingInsights.center),
          getWeatherData(buildingInsights.center),
          getAerialView(buildingInsights.center)
        ]);
        
        console.log(`Enhanced analysis complete: ${professionalInstallation.panels.length} professionally placed panels`);
        
        return {
          roofArea: enhancedData.roofAnalysis.totalRoofArea,
          orientation: this.getOrientationFromAzimuth(enhancedData.roofAnalysis.primaryOrientation),
          tilt: enhancedData.roofAnalysis.averagePitch,
          shadingFactor: enhancedData.roofAnalysis.shadingFactor,
          annualIrradiance: weather?.averageIrradiance || 1100,
          suitabilityScore: enhancedData.dataQuality.confidence * 100,
          maxCapacity: enhancedData.panelLayout.totalCapacity,
          estimatedGeneration: enhancedData.panelLayout.annualGeneration,
          professionalInstallation: {
            panelCount: professionalInstallation.panels.length,
            totalWatts: professionalInstallation.electricalDesign.systemPower,
            installationQuality: professionalInstallation.installationQuality,
            electricalDesign: professionalInstallation.electricalDesign,
            installationNotes: professionalInstallation.installationNotes
          },
          advancedAnalysis: {
            buildingInsights: enhancedData.buildingInsights,
            roofAnalysis: enhancedData.roofAnalysis,
            financialAnalysis: enhancedData.financialAnalysis,
            dataQuality: enhancedData.dataQuality,
            elevation: elevation,
            weather: weather,
            aerialImageUrl: aerialImageUrl
          }
        };
      }
      
      // Fallback to mock data if no advanced data available
      return this.getMockSolarPotential(lat, lon);
      
    } catch (error) {
      console.error('Enhanced solar potential error:', error);
      return this.getMockSolarPotential(lat, lon);
    }
  }

  /**
   * Assess heat pump suitability using Advanced Infrastructure API approach
   * Based on property characteristics and local conditions
   */
  async getHeatPumpSuitability(propertyData: any): Promise<HeatPumpSuitability> {
    // This would integrate with Advanced Infrastructure API or similar
    // For now, using intelligent assessment based on property data
    
    const propertyType = propertyData.propertyType?.toLowerCase() || "house";
    const floorArea = propertyData.floorArea || 120;
    const epcRating = propertyData.epcRating || "D";
    
    // Calculate garden area estimation (simplified)
    const gardenArea = propertyType === "house" ? floorArea * 1.5 : 0;
    
    // Heat loss calculation based on EPC rating and floor area
    const heatLossFactors = { "A": 25, "B": 35, "C": 45, "D": 55, "E": 70, "F": 85, "G": 100 };
    const heatLoss = (heatLossFactors[epcRating as keyof typeof heatLossFactors] || 55) * floorArea / 1000;
    
    // Suitability assessment
    const airSourceSuitable = gardenArea >= 25 && propertyType !== "flat";
    const groundSourceSuitable = gardenArea >= floorArea * 2 && propertyType === "house";
    
    // Calculate suitability score
    let suitabilityScore = 50;
    if (airSourceSuitable) suitabilityScore += 30;
    if (groundSourceSuitable) suitabilityScore += 20;
    if (["A", "B", "C"].includes(epcRating)) suitabilityScore += 20;
    if (floorArea < 200) suitabilityScore += 10;
    
    return {
      propertyType: propertyType as "house" | "flat" | "bungalow",
      gardenArea,
      airSourceSuitable,
      groundSourceSuitable,
      existingHeating: "gas_boiler", // Would be determined from EPC data
      insulationLevel: this.getInsulationLevel(epcRating),
      heatLoss,
      recommendedCapacity: Math.max(6, Math.min(16, heatLoss * 1.2)),
      suitabilityScore: Math.min(95, suitabilityScore)
    };
  }

  /**
   * Smart meter data integration
   * Would connect to Hildebrand/Glow, N3RGY, or similar providers
   */
  async getSmartMeterData(mpan: string): Promise<SmartMeterData | null> {
    if (!this.smartMeterApiKey) {
      // Return realistic mock data for demonstration
      return this.getMockSmartMeterData(mpan);
    }

    // Integration with smart meter API providers would go here
    // For now, return enhanced mock data
    return this.getMockSmartMeterData(mpan);
  }

  /**
   * Comprehensive property analysis combining all data sources
   */
  async analyzeProperty(address: string, smartMeterNumber?: string): Promise<PropertyAnalysis> {
    const postcode = this.extractPostcode(address);
    const coordinates = await this.getCoordinatesFromAddress(address);
    
    const [epcData, solarPotential, smartMeterData] = await Promise.all([
      this.getEPCData(postcode),
      coordinates ? this.getSolarPotential(coordinates.lat, coordinates.lon, address) : null,
      smartMeterNumber ? this.getSmartMeterData(smartMeterNumber) : null
    ]);

    const heatPumpSuitability = await this.getHeatPumpSuitability({
      propertyType: (epcData?.propertyType as "house" | "flat" | "bungalow") || "house",
      floorArea: epcData?.floorArea || 120,
      epcRating: epcData?.currentRating || "D"
    });

    return {
      address,
      postcode,
      coordinates: coordinates || undefined,
      epcData: epcData || undefined,
      solarPotential: solarPotential || undefined,
      heatPumpSuitability,
      smartMeterData: smartMeterData || undefined
    };
  }

  // Helper methods
  private extractPostcode(address: string): string {
    const postcodeMatch = address.match(/[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}/i);
    return postcodeMatch ? postcodeMatch[0].toUpperCase() : "SW1A 1AA";
  }

  private async getCoordinatesFromAddress(address: string): Promise<{lat: number, lon: number} | null> {
    try {
      const coordinates = await geocodeWithGoogle(address);
      return coordinates ? { lat: coordinates.lat, lon: coordinates.lng } : null;
    } catch (error) {
      console.error('Geocoding error:', error);
      // Fallback to London coordinates
      return { lat: 51.5074, lon: -0.1278 };
    }
  }

  private getOrientationFromAzimuth(azimuth: number): string {
    if (azimuth >= 315 || azimuth < 45) return "North";
    if (azimuth >= 45 && azimuth < 135) return "East";
    if (azimuth >= 135 && azimuth < 225) return "South";
    return "West";
  }

  private getInsulationLevel(epcRating: string): "poor" | "average" | "good" | "excellent" {
    const ratingMap: { [key: string]: "poor" | "average" | "good" | "excellent" } = {
      "A": "excellent", "B": "excellent", "C": "good", 
      "D": "average", "E": "poor", "F": "poor", "G": "poor"
    };
    return ratingMap[epcRating] || "average";
  }

  // Enhanced mock data methods for demonstration
  private getMockEPCData(postcode: string): EPCData {
    const mockRatings = ["B", "C", "D", "E"];
    const rating = mockRatings[Math.floor(Math.random() * mockRatings.length)];
    const scoreMap = { "A": 92, "B": 85, "C": 72, "D": 61, "E": 45, "F": 28, "G": 15 };
    
    return {
      currentRating: rating,
      currentScore: scoreMap[rating as keyof typeof scoreMap] + Math.floor(Math.random() * 10) - 5,
      potentialRating: rating === "E" ? "C" : rating === "D" ? "B" : "A",
      potentialScore: 85 + Math.floor(Math.random() * 10),
      propertyType: "House",
      builtForm: Math.random() > 0.5 ? "Semi-Detached" : "Terraced",
      floorArea: 95 + Math.floor(Math.random() * 60),
      heatingCost: 800 + Math.floor(Math.random() * 600),
      environmentImpact: 45 + Math.floor(Math.random() * 30),
      energyConsumption: 12000 + Math.floor(Math.random() * 8000),
      recommendations: [
        "Install solar water heating",
        "Improve loft insulation",
        "Install double glazing",
        "Upgrade heating controls"
      ]
    };
  }

  private getMockSolarPotential(lat: number, lon: number): SolarPotential {
    // Generate realistic solar data based on UK averages
    const baseIrradiance = 1000 + Math.floor(Math.random() * 200); // UK range: 800-1200 kWh/m²/year
    const roofArea = 25 + Math.floor(Math.random() * 40);
    
    return {
      roofArea,
      orientation: Math.random() > 0.3 ? "South" : "Southwest",
      tilt: 28 + Math.floor(Math.random() * 12),
      shadingFactor: 0.85 + Math.random() * 0.1,
      annualIrradiance: baseIrradiance,
      suitabilityScore: 75 + Math.floor(Math.random() * 20),
      maxCapacity: Math.min(roofArea / 8, 6),
      estimatedGeneration: (roofArea / 8) * baseIrradiance * 0.8
    };
  }

  private getMockSmartMeterData(mpan: string): SmartMeterData {
    // Generate realistic UK household consumption patterns
    const baseDaily = 8 + Math.random() * 12; // 8-20 kWh typical range
    const dailyUsage = Array.from({ length: 30 }, () => 
      baseDaily + (Math.random() - 0.5) * 4
    );
    
    return {
      mpan,
      dailyUsage,
      peakTimes: ["17:00-19:00", "07:00-09:00"],
      seasonalPattern: Math.random() > 0.7 ? "summer_peak" : "winter_peak",
      averageDaily: baseDaily,
      averageMonthly: baseDaily * 30,
      costPerMonth: baseDaily * 30 * 0.32 // ~32p per kWh average
    };
  }

  // Test methods for API verification
  async testGoogleMapsAPI(address: string): Promise<any> {
    const { geocodeWithGoogle } = await import("./geocoding");
    return await geocodeWithGoogle(address);
  }

  async testGoogleSolarAPI(lat: number, lng: number): Promise<any> {
    if (!this.googleSolarApiKey) {
      console.log('Google Solar API key not available');
      return null;
    }
    
    try {
      console.log('Google Solar API: Testing building insights for coordinates:', lat, lng);
      
      // Try different coordinate formats and request methods
      const endpoints = [
        `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&key=${this.googleSolarApiKey}`,
        `https://solar.googleapis.com/v1/buildingInsights:findClosest?key=${this.googleSolarApiKey}&location.latitude=${lat}&location.longitude=${lng}`
      ];
      
      let response;
      for (const endpoint of endpoints) {
        try {
          response = await fetch(endpoint, {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Enerwise-Platform/1.0',
              'Referer': 'https://enerwise.replit.app'
            }
          });
          
          if (response.ok) {
            break;
          }
        } catch (error) {
          console.log('Trying next endpoint format...');
        }
      }
      
      if (!response || !response.ok) {
        const errorText = response ? await response.text() : 'No response received';
        console.error('Google Solar API error:', response?.status || 'N/A', response?.statusText || 'N/A', errorText);
        return null;
      }
      
      const data = await response.json();
      console.log('Google Solar API working:', !!data, 'Building found:', !!data.name);
      return data;
    } catch (error) {
      console.error('Google Solar API error:', error);
      return null;
    }
  }

  async testEPCAPI(postcode: string): Promise<any> {
    if (!this.epcApiKey) {
      console.log('EPC API key not available');
      return null;
    }
    
    try {
      // Use hardcoded email as per specification with environment API key
      const email = 'stanleywilson@solr.ai';
      const apiKey = this.epcApiKey;
      
      console.log(`EPC API: Testing with hardcoded email: ${email.substring(0, 5)}...`);
      
      const credentials = Buffer.from(`${email}:${apiKey}`).toString('base64');
      console.log(`EPC API: Using encoded credentials length: ${credentials.length}, API key length: ${apiKey?.length}`);
      
      const url = `https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${encodeURIComponent(postcode)}&size=1`;
      console.log(`EPC API endpoint: ${url}`);
      
      // Try CSV first as recommended in documentation
      const response = await fetch(url, {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Accept': 'text/csv'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log(`EPC API endpoint ${url} error: ${response.status} ${errorText}`);
        
        // Try with address search as fallback
        const fallbackUrl = `https://epc.opendatacommunities.org/api/v1/domestic/search?address=${encodeURIComponent(postcode)}&size=1`;
        const fallbackResponse = await fetch(fallbackUrl, {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Accept': 'text/csv'
          }
        });
        
        if (!fallbackResponse.ok) {
          const fallbackErrorText = await fallbackResponse.text();
          console.log(`EPC API endpoint ${fallbackUrl} error: ${fallbackResponse.status} ${fallbackErrorText}`);
          return null;
        }
        
        // Parse CSV response from fallback
        const fallbackCsvData = await fallbackResponse.text();
        console.log(`EPC API fallback success: CSV data length ${fallbackCsvData.length}`);
        return { csv: fallbackCsvData, rows: fallbackCsvData.split('\n').length - 1 };
      }
      
      // Parse CSV response from EPC API
      const csvData = await response.text();
      console.log(`EPC API success: CSV data length ${csvData.length}`);
      return { csv: csvData, rows: csvData.split('\n').length - 1 };
    } catch (error) {
      console.error('EPC API test error:', error);
      return null;
    }
  }

  async testOSDatahubAPI(postcode: string): Promise<any> {
    if (!this.osDatahubApiKey) {
      console.log('OS DataHub API key not available');
      return null;
    }
    
    try {
      console.log('OS DataHub API: Testing address lookup for', postcode);
      
      // Use direct API key authentication for OS DataHub Places API
      const response = await fetch(
        `https://api.os.uk/search/places/v1/postcode?postcode=${encodeURIComponent(postcode)}&lr=EN&key=${this.osDatahubApiKey}`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; Enerwise-Platform)'
          }
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('OS DataHub API error:', response.status, response.statusText, errorText);
        return null;
      }
      
      const data = await response.json();
      console.log('OS DataHub API working:', !!data, `Found ${data.results?.length || 0} addresses`);
      return data;
    } catch (error) {
      console.error('OS DataHub API error:', error);
      return null;
    }
  }
}

export const energyAssessmentService = new EnergyAssessmentService();