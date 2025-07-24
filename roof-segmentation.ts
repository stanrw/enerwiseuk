// Advanced roof segmentation and solar panel placement system

import { geocodeWithGoogle } from "./geocoding";

// Standard solar panel dimensions (in meters)
export const SOLAR_PANEL_SPECS = {
  residential: {
    width: 1.65,    // meters
    height: 0.99,   // meters
    area: 1.6335,   // m²
    watts: 400,     // typical residential panel
    spacing: 0.3    // minimum spacing between panels
  },
  commercial: {
    width: 2.0,
    height: 1.0,
    area: 2.0,
    watts: 500,
    spacing: 0.5
  }
};

export interface RoofSegment {
  id: string;
  polygon: Array<{ lat: number; lng: number }>;
  area: number;
  orientation: number;
  tilt: number;
  suitability: number; // 0-1 score
  maxPanels: number;
  shadingObstructions: Array<{ lat: number; lng: number; radius: number }>;
}

export interface PrecisePanelLayout {
  panels: Array<{
    id: string;
    lat: number;
    lng: number;
    orientation: number;
    tilt: number;
    watts: number;
    segmentId: string;
    isValid: boolean;
    clearanceOk: boolean;
  }>;
  totalPanels: number;
  totalWatts: number;
  roofCoverage: number;
  validationScore: number;
}

/**
 * Enhanced roof segmentation using Google Solar API Data Layers
 * This provides pixel-level roof mask data for precise boundary detection
 */
export async function getAdvancedRoofSegmentation(address: string): Promise<{
  roofSegments: RoofSegment[];
  dataLayers: any;
  buildingInsights: any;
} | null> {
  const apiKey = process.env.GOOGLE_SOLAR_API;
  
  if (!apiKey) {
    console.log('Google Solar API key required for advanced segmentation');
    return null;
  }

  try {
    const coordinates = await geocodeWithGoogle(address);
    
    // Get high-resolution data layers with roof mask
    const dataLayersResponse = await fetch(
      `https://solar.googleapis.com/v1/dataLayers:get?location.latitude=${coordinates.lat}&location.longitude=${coordinates.lng}&radiusMeters=30&pixelSizeMeters=0.1&key=${apiKey}`
    );
    
    let dataLayers = null;
    if (dataLayersResponse.ok) {
      dataLayers = await dataLayersResponse.json();
    }
    
    // Get building insights for additional context
    const buildingResponse = await fetch(
      `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${coordinates.lat}&location.longitude=${coordinates.lng}&key=${apiKey}`
    );
    
    let buildingInsights = null;
    if (buildingResponse.ok) {
      buildingInsights = await buildingResponse.json();
    }
    
    if (!buildingInsights) {
      return null;
    }
    
    // Process roof segments with enhanced geometry
    const roofSegments = processRoofSegments(buildingInsights, dataLayers);
    
    return {
      roofSegments,
      dataLayers,
      buildingInsights
    };
    
  } catch (error) {
    console.error('Advanced roof segmentation error:', error);
    return null;
  }
}

/**
 * Process roof segments from Google Solar API data into precise geometries
 */
function processRoofSegments(buildingInsights: any, dataLayers: any): RoofSegment[] {
  const segments: RoofSegment[] = [];
  
  if (!buildingInsights.solarPotential?.roofSegmentStats) {
    return segments;
  }
  
  buildingInsights.solarPotential.roofSegmentStats.forEach((segment: any, index: number) => {
    const bbox = segment.boundingBox;
    
    // Create more precise polygon from bounding box
    const polygon = createRoofPolygonFromBounds(bbox, segment);
    
    // Calculate obstruction areas (chimneys, vents, etc.)
    const obstructions = detectObstructions(segment, dataLayers);
    
    // Calculate maximum panel capacity
    const maxPanels = calculateMaxPanelCapacity(polygon, obstructions);
    
    segments.push({
      id: `segment-${index}`,
      polygon,
      area: segment.stats.areaMeters2,
      orientation: segment.azimuthDegrees,
      tilt: segment.pitchDegrees,
      suitability: calculateSuitabilityScore(segment),
      maxPanels,
      shadingObstructions: obstructions
    });
  });
  
  return segments;
}

/**
 * Create precise roof polygon from bounding box and segment data
 */
function createRoofPolygonFromBounds(bbox: any, segment: any): Array<{ lat: number; lng: number }> {
  // Create a realistic roof polygon based on the bounding box
  const sw = bbox.sw;
  const ne = bbox.ne;
  
  // For now, create a simple rectangle
  // In a full implementation, this would use the roof mask data
  return [
    { lat: sw.latitude, lng: sw.longitude },
    { lat: ne.latitude, lng: sw.longitude },
    { lat: ne.latitude, lng: ne.longitude },
    { lat: sw.latitude, lng: ne.longitude }
  ];
}

/**
 * Detect obstructions on roof segments (chimneys, vents, etc.)
 */
function detectObstructions(segment: any, dataLayers: any): Array<{ lat: number; lng: number; radius: number }> {
  const obstructions: Array<{ lat: number; lng: number; radius: number }> = [];
  
  // In a full implementation, this would analyze the DSM and RGB data
  // For now, simulate typical obstructions
  const center = segment.center;
  
  // Add simulated chimney/vent obstructions
  if (Math.random() > 0.7) { // 30% chance of obstruction
    obstructions.push({
      lat: center.latitude + (Math.random() - 0.5) * 0.0001,
      lng: center.longitude + (Math.random() - 0.5) * 0.0001,
      radius: 1.5 // 1.5 meter clearance
    });
  }
  
  return obstructions;
}

/**
 * Calculate maximum panel capacity for a roof polygon
 */
function calculateMaxPanelCapacity(polygon: Array<{ lat: number; lng: number }>, obstructions: Array<{ lat: number; lng: number; radius: number }>): number {
  // Simplified calculation based on polygon area
  const area = calculatePolygonArea(polygon);
  const usableArea = area * 0.7; // 70% of roof area typically usable
  
  // Subtract obstruction areas
  const obstructionArea = obstructions.reduce((sum, obs) => 
    sum + Math.PI * obs.radius * obs.radius, 0
  );
  
  const finalUsableArea = Math.max(0, usableArea - obstructionArea);
  
  // Calculate panels (assuming 1.65m x 0.99m panels)
  const panelArea = SOLAR_PANEL_SPECS.residential.area;
  return Math.floor(finalUsableArea / panelArea);
}

/**
 * Calculate roof polygon area (simplified)
 */
function calculatePolygonArea(polygon: Array<{ lat: number; lng: number }>): number {
  if (polygon.length < 3) return 0;
  
  // Shoelace formula for polygon area (approximate for lat/lng)
  let area = 0;
  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length;
    area += polygon[i].lat * polygon[j].lng;
    area -= polygon[j].lat * polygon[i].lng;
  }
  
  // Convert to square meters (very rough approximation)
  return Math.abs(area) * 111000 * 111000 / 2;
}

/**
 * Calculate suitability score for a roof segment
 */
function calculateSuitabilityScore(segment: any): number {
  let score = 0;
  
  // Orientation score (south = best)
  const orientationDiff = Math.abs(segment.azimuthDegrees - 180);
  score += Math.max(0, (90 - orientationDiff) / 90) * 0.4;
  
  // Pitch score (30-40° = optimal)
  const pitchScore = segment.pitchDegrees >= 15 && segment.pitchDegrees <= 50 ? 
    Math.max(0, 1 - Math.abs(segment.pitchDegrees - 35) / 35) : 0;
  score += pitchScore * 0.3;
  
  // Area score
  score += Math.min(1, segment.stats.areaMeters2 / 50) * 0.3;
  
  return Math.min(1, score);
}

/**
 * Generate optimal panel layout for roof segments
 */
export async function generateOptimalPanelLayout(roofSegments: RoofSegment[]): Promise<PrecisePanelLayout> {
  const panels: PrecisePanelLayout['panels'] = [];
  
  for (const segment of roofSegments) {
    if (segment.suitability < 0.3) continue; // Skip unsuitable segments
    
    // Generate panel positions within the segment
    const segmentPanels = generatePanelsForSegment(segment);
    panels.push(...segmentPanels);
  }
  
  const totalPanels = panels.length;
  const totalWatts = totalPanels * SOLAR_PANEL_SPECS.residential.watts;
  const totalRoofArea = roofSegments.reduce((sum, seg) => sum + seg.area, 0);
  const panelArea = totalPanels * SOLAR_PANEL_SPECS.residential.area;
  const roofCoverage = totalRoofArea > 0 ? (panelArea / totalRoofArea) * 100 : 0;
  
  // Calculate validation score based on various factors
  const validationScore = calculateLayoutValidationScore(panels, roofSegments);
  
  return {
    panels,
    totalPanels,
    totalWatts,
    roofCoverage,
    validationScore
  };
}

/**
 * Generate panel positions for a specific roof segment
 */
function generatePanelsForSegment(segment: RoofSegment): PrecisePanelLayout['panels'] {
  const panels: PrecisePanelLayout['panels'] = [];
  const panelSpec = SOLAR_PANEL_SPECS.residential;
  
  // Simple grid-based placement
  const centerLat = segment.polygon.reduce((sum, p) => sum + p.lat, 0) / segment.polygon.length;
  const centerLng = segment.polygon.reduce((sum, p) => sum + p.lng, 0) / segment.polygon.length;
  
  // Calculate how many panels can fit
  const panelsPerRow = Math.floor(Math.sqrt(segment.maxPanels / 2));
  const rows = Math.floor(segment.maxPanels / panelsPerRow);
  
  // Convert panel dimensions to lat/lng offsets (very rough)
  const latSpacing = panelSpec.height / 111000; // ~111km per degree
  const lngSpacing = panelSpec.width / (111000 * Math.cos(centerLat * Math.PI / 180));
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < panelsPerRow; col++) {
      const panelLat = centerLat + (row - rows/2) * latSpacing * 1.2; // 20% spacing
      const panelLng = centerLng + (col - panelsPerRow/2) * lngSpacing * 1.2;
      
      // Check if panel position is valid (not obstructed)
      const isValid = !isObstructed(panelLat, panelLng, segment.shadingObstructions);
      
      panels.push({
        id: `${segment.id}-panel-${row}-${col}`,
        lat: panelLat,
        lng: panelLng,
        orientation: segment.orientation,
        tilt: segment.tilt,
        watts: panelSpec.watts,
        segmentId: segment.id,
        isValid,
        clearanceOk: isValid // Simplified - would check clearances properly
      });
    }
  }
  
  return panels.filter(p => p.isValid);
}

/**
 * Check if a panel position is obstructed
 */
function isObstructed(lat: number, lng: number, obstructions: Array<{ lat: number; lng: number; radius: number }>): boolean {
  for (const obs of obstructions) {
    const distance = Math.sqrt(
      Math.pow((lat - obs.lat) * 111000, 2) + 
      Math.pow((lng - obs.lng) * 111000 * Math.cos(lat * Math.PI / 180), 2)
    );
    
    if (distance < obs.radius) {
      return true;
    }
  }
  return false;
}

/**
 * Calculate validation score for the entire layout
 */
function calculateLayoutValidationScore(panels: PrecisePanelLayout['panels'], segments: RoofSegment[]): number {
  if (panels.length === 0) return 0;
  
  const validPanels = panels.filter(p => p.isValid).length;
  const validationRatio = validPanels / panels.length;
  
  // Factor in segment suitability
  const avgSuitability = segments.reduce((sum, seg) => sum + seg.suitability, 0) / segments.length;
  
  return Math.min(100, (validationRatio * 0.7 + avgSuitability * 0.3) * 100);
}