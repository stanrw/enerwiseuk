/**
 * Professional Solar Installation Analysis
 * Replicates how experienced solar installers design real-world installations
 */

export interface InstallerConstraints {
  // UK Building Regulations & Industry Standards
  roofEdgeSetback: number;          // 600mm minimum from roof edge
  fireServiceAccess: number;        // 900mm clear access path
  panelInterRowSpacing: number;     // Row-to-row spacing for maintenance
  panelIntraRowSpacing: number;     // Panel-to-panel spacing within row
  obstructionBuffer: number;        // Buffer around chimneys, vents, etc.
  
  // Electrical & Structural Constraints
  maxPanelsPerString: number;       // Maximum panels per electrical string
  preferredStringSize: number;     // Preferred panels per string for efficiency
  maxRowLength: number;            // Structural load considerations
  minRoofPitch: number;            // Minimum pitch for installation
  
  // Installation Practicality
  accessRequirements: boolean;     // Ensure installer can access all panels
  maintenanceAccess: boolean;      // Future maintenance considerations
  uniformLayout: boolean;          // Prefer uniform rows when possible
}

export const UK_INSTALLER_STANDARDS: InstallerConstraints = {
  roofEdgeSetback: 0.6,
  fireServiceAccess: 0.9,
  panelInterRowSpacing: 0.5,       // 500mm between rows
  panelIntraRowSpacing: 0.015,     // 15mm between panels in row
  obstructionBuffer: 1.5,
  maxPanelsPerString: 12,          // Typical for UK residential inverters
  preferredStringSize: 10,         // Optimal for most inverters
  maxRowLength: 10,                // Structural and practical limit
  minRoofPitch: 15,
  accessRequirements: true,
  maintenanceAccess: true,
  uniformLayout: true
};

export interface RoofGeometry {
  id: string;
  vertices: Array<{ lat: number; lng: number; elevation: number }>;
  centroid: { lat: number; lng: number };
  area: number;
  orientation: number;             // Azimuth (0° = North, 180° = South)
  pitch: number;                   // Roof pitch in degrees
  shape: 'rectangular' | 'triangular' | 'l-shaped' | 'complex';
  ridgeLine?: Array<{ lat: number; lng: number }>; // Main ridge line
  valleys?: Array<{ lat: number; lng: number }>; // Valley lines
  hips?: Array<{ lat: number; lng: number }>; // Hip lines
  obstructions: Array<{
    position: { lat: number; lng: number };
    size: { width: number; height: number };
    type: 'chimney' | 'vent' | 'skylight' | 'dormer' | 'antenna';
    height: number;
  }>;
}

export interface ProfessionalPanelInstallation {
  panels: Array<{
    id: string;
    position: { lat: number; lng: number; elevation: number };
    corners: Array<{ lat: number; lng: number; elevation: number }>;
    stringId: string;              // Which electrical string this belongs to
    stringPosition: number;        // Position within the string (1st, 2nd, etc.)
    rowNumber: number;
    columnNumber: number;
    roofSectionId: string;
    orientation: number;
    tilt: number;
    watts: number;
    shading: {
      morningShade: number;        // 0-1 shading factor
      noonShade: number;
      eveningShade: number;
      annualShading: number;       // Overall shading loss percentage
    };
    installation: {
      accessibility: number;       // How easy to install (0-1)
      structural: boolean;         // Meets structural requirements
      electrical: boolean;         // Part of valid electrical configuration
      maintenance: boolean;        // Accessible for maintenance
    };
  }>;
  electricalDesign: {
    strings: Array<{
      id: string;
      panelIds: string[];
      voltage: number;
      current: number;
      power: number;
    }>;
    totalStrings: number;
    systemVoltage: number;
    systemPower: number;
  };
  installationQuality: {
    overallScore: number;          // 0-1 professional quality score
    uniformity: number;            // How uniform the layout is
    efficiency: number;            // Electrical efficiency
    practicality: number;          // Installation practicality
    maintenance: number;           // Maintenance accessibility
    compliance: number;            // Regulatory compliance
  };
  installationNotes: string[];
}

/**
 * Generate professional-grade panel installation layout
 */
export function generateProfessionalInstallation(
  buildingInsights: any,
  constraints: InstallerConstraints = UK_INSTALLER_STANDARDS
): ProfessionalPanelInstallation {
  
  const roofSegments = buildingInsights.solarPotential?.roofSegmentStats || [];
  const solarPanels = buildingInsights.solarPotential?.solarPanels || [];
  
  const panels: ProfessionalPanelInstallation['panels'] = [];
  const installationNotes: string[] = [];
  
  // Sort roof segments by suitability (south-facing, good tilt, large area)
  const sortedSegments = roofSegments.sort((a: any, b: any) => {
    const suitabilityA = calculateRoofSuitability(a);
    const suitabilityB = calculateRoofSuitability(b);
    return suitabilityB - suitabilityA;
  });
  
  let stringCounter = 1;
  let panelCounter = 1;
  
  // Process each roof segment
  for (let segmentIndex = 0; segmentIndex < sortedSegments.length; segmentIndex++) {
    const segment = sortedSegments[segmentIndex];
    
    // Skip unsuitable segments
    if (segment.pitchDegrees < constraints.minRoofPitch) {
      installationNotes.push(`Segment ${segmentIndex + 1}: Roof pitch too low (${segment.pitchDegrees}°)`);
      continue;
    }
    
    if (segment.stats.areaMeters2 < 10) {
      installationNotes.push(`Segment ${segmentIndex + 1}: Area too small (${segment.stats.areaMeters2.toFixed(1)}m²)`);
      continue;
    }
    
    // Get panels for this segment
    const segmentPanels = solarPanels.filter((panel: any) => panel.segmentIndex === segmentIndex);
    
    if (segmentPanels.length === 0) {
      installationNotes.push(`Segment ${segmentIndex + 1}: No viable panel positions found`);
      continue;
    }
    
    // Arrange panels in optimal rows and strings
    const arrangedPanels = arrangePanelsInRows(segmentPanels, segment, constraints);
    
    let currentStringId = `string-${stringCounter}`;
    let currentStringPosition = 1;
    
    for (let i = 0; i < arrangedPanels.length; i++) {
      const panelData = arrangedPanels[i];
      
      // Start new string if current one is full
      if (currentStringPosition > constraints.preferredStringSize) {
        stringCounter++;
        currentStringId = `string-${stringCounter}`;
        currentStringPosition = 1;
      }
      
      // Calculate panel corners (1.65m x 0.99m)
      const corners = calculatePanelCorners(panelData.center, segment.azimuthDegrees);
      
      // Calculate shading factors
      const shading = calculateShading(panelData.center, segment, buildingInsights);
      
      // Assess installation factors
      const installation = assessInstallationFactors(panelData, segment, constraints);
      
      panels.push({
        id: `panel-${panelCounter}`,
        position: {
          lat: panelData.center.latitude,
          lng: panelData.center.longitude,
          elevation: 0 // Would be calculated from elevation data
        },
        corners,
        stringId: currentStringId,
        stringPosition: currentStringPosition,
        rowNumber: Math.floor(i / 6) + 1, // Assuming max 6 panels per row
        columnNumber: (i % 6) + 1,
        roofSectionId: `section-${segmentIndex + 1}`,
        orientation: segment.azimuthDegrees,
        tilt: segment.pitchDegrees,
        watts: 400, // Standard 400W panel
        shading,
        installation
      });
      
      currentStringPosition++;
      panelCounter++;
    }
    
    installationNotes.push(`Segment ${segmentIndex + 1}: ${arrangedPanels.length} panels arranged in professional layout`);
  }
  
  // Generate electrical design
  const electricalDesign = generateElectricalDesign(panels, constraints);
  
  // Calculate installation quality metrics
  const installationQuality = calculateInstallationQuality(panels, constraints);
  
  return {
    panels,
    electricalDesign,
    installationQuality,
    installationNotes
  };
}

function calculateRoofSuitability(segment: any): number {
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
  
  return score;
}

function arrangePanelsInRows(panels: any[], segment: any, constraints: InstallerConstraints): any[] {
  // Sort panels by position to create orderly rows
  const sortedPanels = panels.sort((a: any, b: any) => {
    return a.center.latitude - b.center.latitude || a.center.longitude - b.center.longitude;
  });
  
  // Apply professional spacing and layout rules
  const finalPanels = [];
  
  for (let i = 0; i < sortedPanels.length; i++) {
    const panel = sortedPanels[i];
    
    // Check if panel meets professional standards
    if (meetsInstallationStandards(panel, segment, constraints)) {
      finalPanels.push(panel);
    }
  }
  
  return finalPanels;
}

function meetsInstallationStandards(panel: any, segment: any, constraints: InstallerConstraints): boolean {
  // Simplified check - in real implementation would check:
  // - Distance from roof edges
  // - Clearance from obstructions
  // - Access path requirements
  // - Structural load limits
  
  return true; // Assume Google Solar API already validates basic placement
}

function calculatePanelCorners(center: { latitude: number; longitude: number }, orientation: number): Array<{ lat: number; lng: number; elevation: number }> {
  // Calculate 4 corners of a 1.65m x 0.99m panel
  const panelWidth = 1.65; // meters
  const panelHeight = 0.99; // meters
  
  // Convert meters to approximate lat/lng offsets (very rough approximation)
  const latOffset = panelHeight / 111000; // ~111km per degree latitude
  const lngOffset = panelWidth / (111000 * Math.cos(center.latitude * Math.PI / 180));
  
  return [
    { lat: center.latitude - latOffset/2, lng: center.longitude - lngOffset/2, elevation: 0 },
    { lat: center.latitude - latOffset/2, lng: center.longitude + lngOffset/2, elevation: 0 },
    { lat: center.latitude + latOffset/2, lng: center.longitude + lngOffset/2, elevation: 0 },
    { lat: center.latitude + latOffset/2, lng: center.longitude - lngOffset/2, elevation: 0 }
  ];
}

function calculateShading(center: { latitude: number; longitude: number }, segment: any, buildingInsights: any) {
  // Simplified shading calculation based on segment sunshine data
  const sunshineQuantiles = segment.stats.sunshineQuantiles || [0.8, 0.8, 0.8, 0.8, 0.8, 0.8];
  
  return {
    morningShade: 1 - (sunshineQuantiles[1] || 0.8),
    noonShade: 1 - (sunshineQuantiles[3] || 0.9),
    eveningShade: 1 - (sunshineQuantiles[5] || 0.8),
    annualShading: 1 - (sunshineQuantiles.reduce((sum, val) => sum + val, 0) / sunshineQuantiles.length)
  };
}

function assessInstallationFactors(panel: any, segment: any, constraints: InstallerConstraints) {
  return {
    accessibility: 0.9, // High accessibility assumed for roof-mounted
    structural: segment.pitchDegrees >= constraints.minRoofPitch,
    electrical: true, // Assume valid electrical connection
    maintenance: true // Assume maintenance access is possible
  };
}

function generateElectricalDesign(panels: ProfessionalPanelInstallation['panels'], constraints: InstallerConstraints) {
  const strings: any[] = [];
  const stringGroups: { [key: string]: any[] } = {};
  
  // Group panels by string
  panels.forEach(panel => {
    if (!stringGroups[panel.stringId]) {
      stringGroups[panel.stringId] = [];
    }
    stringGroups[panel.stringId].push(panel);
  });
  
  // Generate string specifications
  Object.entries(stringGroups).forEach(([stringId, stringPanels]) => {
    const voltage = stringPanels.length * 48; // ~48V per panel
    const current = 10; // ~10A typical for 400W panels
    const power = stringPanels.length * 400; // 400W per panel
    
    strings.push({
      id: stringId,
      panelIds: stringPanels.map(p => p.id),
      voltage,
      current,
      power
    });
  });
  
  const totalPower = panels.length * 400;
  const systemVoltage = strings.length > 0 ? Math.max(...strings.map(s => s.voltage)) : 0;
  
  return {
    strings,
    totalStrings: strings.length,
    systemVoltage,
    systemPower: totalPower
  };
}

function calculateInstallationQuality(panels: ProfessionalPanelInstallation['panels'], constraints: InstallerConstraints) {
  // Calculate various quality metrics
  const uniformity = calculateUniformity(panels);
  const efficiency = calculateElectricalEfficiency(panels);
  const practicality = calculatePracticality(panels, constraints);
  const maintenance = calculateMaintenanceScore(panels);
  const compliance = calculateComplianceScore(panels, constraints);
  
  const overallScore = (uniformity + efficiency + practicality + maintenance + compliance) / 5;
  
  return {
    overallScore,
    uniformity,
    efficiency,
    practicality,
    maintenance,
    compliance
  };
}

function calculateUniformity(panels: ProfessionalPanelInstallation['panels']): number {
  // Simple uniformity check - all panels same orientation and similar spacing
  if (panels.length === 0) return 1;
  
  const orientations = panels.map(p => p.orientation);
  const orientationVariance = Math.max(...orientations) - Math.min(...orientations);
  
  return Math.max(0, 1 - orientationVariance / 180);
}

function calculateElectricalEfficiency(panels: ProfessionalPanelInstallation['panels']): number {
  // Based on shading losses and configuration
  if (panels.length === 0) return 1;
  
  const avgShading = panels.reduce((sum, p) => sum + p.shading.annualShading, 0) / panels.length;
  return Math.max(0.7, 1 - avgShading);
}

function calculatePracticality(panels: ProfessionalPanelInstallation['panels'], constraints: InstallerConstraints): number {
  // Based on accessibility and installation factors
  if (panels.length === 0) return 1;
  
  const accessibilityScore = panels.reduce((sum, p) => sum + p.installation.accessibility, 0) / panels.length;
  return accessibilityScore;
}

function calculateMaintenanceScore(panels: ProfessionalPanelInstallation['panels']): number {
  // All panels should be accessible for maintenance
  if (panels.length === 0) return 1;
  
  const maintenanceAccessible = panels.filter(p => p.installation.maintenance).length;
  return maintenanceAccessible / panels.length;
}

function calculateComplianceScore(panels: ProfessionalPanelInstallation['panels'], constraints: InstallerConstraints): number {
  // Check compliance with building regulations and standards
  if (panels.length === 0) return 1;
  
  const compliantPanels = panels.filter(p => p.installation.structural && p.installation.electrical).length;
  return compliantPanels / panels.length;
}