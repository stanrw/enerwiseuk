/**
 * UK Solar Panel Specifications 2025
 * Based on top 10 most popular panels in the UK market
 */

export interface SolarPanelSpec {
  id: string;
  brand: string;
  model: string;
  powerOutput: number; // Watts
  efficiency: number; // Percentage
  dimensions: {
    length: number; // cm
    width: number; // cm
    thickness: number; // cm
  };
  weight: number; // kg
  warranty: {
    product: number; // years
    performance: number; // years
  };
  marketShare: number; // Percentage of UK market
  pricePerWatt: number; // £ per watt
}

export const UK_TOP_SOLAR_PANELS: SolarPanelSpec[] = [
  {
    id: 'sunpower-maxeon-6',
    brand: 'SunPower',
    model: 'Maxeon 6 AC',
    powerOutput: 440,
    efficiency: 22.8,
    dimensions: { length: 189, width: 100, thickness: 4 },
    weight: 21.8,
    warranty: { product: 40, performance: 40 },
    marketShare: 18.5,
    pricePerWatt: 1.85
  },
  {
    id: 'panasonic-evervolt',
    brand: 'Panasonic',
    model: 'EverVolt HK2',
    powerOutput: 430,
    efficiency: 22.2,
    dimensions: { length: 189, width: 100, thickness: 4 },
    weight: 19.0,
    warranty: { product: 25, performance: 25 },
    marketShare: 16.2,
    pricePerWatt: 1.75
  },
  {
    id: 'canadian-solar-hiku',
    brand: 'Canadian Solar',
    model: 'HiKu7 Mono PERC',
    powerOutput: 470,
    efficiency: 23.0,
    dimensions: { length: 200, width: 100, thickness: 4 },
    weight: 22.0,
    warranty: { product: 25, performance: 25 },
    marketShare: 14.8,
    pricePerWatt: 1.65
  },
  {
    id: 'rec-alpha-pure',
    brand: 'REC',
    model: 'Alpha Pure-R',
    powerOutput: 470,
    efficiency: 22.5,
    dimensions: { length: 189, width: 100, thickness: 4 },
    weight: 21.0,
    warranty: { product: 25, performance: 25 },
    marketShare: 12.3,
    pricePerWatt: 1.70
  },
  {
    id: 'ja-solar-deepblue',
    brand: 'JA Solar',
    model: 'Deep Blue 3.0',
    powerOutput: 450,
    efficiency: 21.8,
    dimensions: { length: 190, width: 100, thickness: 4 },
    weight: 20.5,
    warranty: { product: 25, performance: 25 },
    marketShare: 11.7,
    pricePerWatt: 1.55
  },
  {
    id: 'qcells-peak-duo',
    brand: 'Q Cells',
    model: 'Q.Peak Duo-G10+',
    powerOutput: 400,
    efficiency: 20.9,
    dimensions: { length: 189, width: 100, thickness: 4 },
    weight: 21.0,
    warranty: { product: 25, performance: 25 },
    marketShare: 9.4,
    pricePerWatt: 1.60
  },
  {
    id: 'trina-vertex',
    brand: 'Trina Solar',
    model: 'Vertex S',
    powerOutput: 440,
    efficiency: 21.5,
    dimensions: { length: 189, width: 100, thickness: 4 },
    weight: 20.0,
    warranty: { product: 25, performance: 25 },
    marketShare: 8.1,
    pricePerWatt: 1.50
  },
  {
    id: 'longi-himo',
    brand: 'LONGi',
    model: 'Hi-MO 6 Explorer',
    powerOutput: 445,
    efficiency: 21.7,
    dimensions: { length: 189, width: 100, thickness: 4 },
    weight: 21.0,
    warranty: { product: 25, performance: 25 },
    marketShare: 7.8,
    pricePerWatt: 1.48
  },
  {
    id: 'yingli-panda',
    brand: 'Yingli Solar',
    model: 'Panda Bifacial',
    powerOutput: 415,
    efficiency: 22.5,
    dimensions: { length: 189, width: 100, thickness: 4 },
    weight: 23.2,
    warranty: { product: 12, performance: 25 },
    marketShare: 6.2,
    pricePerWatt: 1.45
  },
  {
    id: 'project-solar-evolution',
    brand: 'Project Solar',
    model: 'Evolution Elite',
    powerOutput: 400,
    efficiency: 20.5,
    dimensions: { length: 189, width: 100, thickness: 4 },
    weight: 20.0,
    warranty: { product: 25, performance: 25 },
    marketShare: 5.0,
    pricePerWatt: 1.70
  }
];

// Default to most popular panel in UK market
export const DEFAULT_UK_PANEL = UK_TOP_SOLAR_PANELS[0]; // SunPower Maxeon 6 AC

/**
 * MCS Spacing Standards for UK Solar Installations
 */
export const MCS_SPACING_STANDARDS = {
  // Minimum clearances in meters (MCS 012 compliant)
  roofEdgeClearance: 0.6,      // Minimum distance from roof edge
  fireClearance: 0.9,          // Fire safety clearance for access
  walkwayClearance: 0.9,       // Access walkway clearance
  panelToPanel: 0.02,          // Minimum gap between panels (2cm)
  obstructionClearance: 1.5,   // Distance from chimneys/vents/HVAC
  
  // Ventilation requirements
  underPanelVentilation: 0.15, // Minimum air gap under panels (15cm)
  
  // Structural limits
  maxRowLength: 8,             // Maximum panels per electrical string
  
  // Panel orientation preferences
  preferredOrientation: 'landscape' as const, // Landscape preferred for stability
  minimumTilt: 15,             // Minimum roof pitch for installation (degrees)
  
  // Shadow avoidance
  minimumShadowDistance: 3.0,  // Distance to avoid inter-row shading (meters)
  
  // Building regulations
  maxHeightFromRoof: 0.2,      // Maximum 200mm from roof surface (permitted development)
};

/**
 * Calculate proper panel spacing based on MCS standards
 */
export function calculateMCSCompliantSpacing(
  panelSpec: SolarPanelSpec,
  roofDimensions: { width: number; height: number },
  orientation: 'landscape' | 'portrait' = 'landscape'
): {
  panelsPerRow: number;
  numberOfRows: number;
  totalPanels: number;
  spacingX: number;
  spacingY: number;
} {
  const standards = MCS_SPACING_STANDARDS;
  
  // Panel dimensions in meters
  const panelWidth = orientation === 'landscape' 
    ? panelSpec.dimensions.length / 100 
    : panelSpec.dimensions.width / 100;
  const panelHeight = orientation === 'landscape' 
    ? panelSpec.dimensions.width / 100 
    : panelSpec.dimensions.length / 100;
  
  // Available roof space after edge clearances
  const availableWidth = roofDimensions.width - (2 * standards.roofEdgeClearance);
  const availableHeight = roofDimensions.height - (2 * standards.roofEdgeClearance);
  
  // Calculate panels per row (accounting for panel-to-panel spacing)
  const panelsPerRow = Math.floor(
    (availableWidth + standards.panelToPanel) / (panelWidth + standards.panelToPanel)
  );
  
  // Calculate number of rows (accounting for walkway clearance)
  const numberOfRows = Math.floor(
    (availableHeight + standards.walkwayClearance) / (panelHeight + standards.walkwayClearance)
  );
  
  // Actual spacing between panels
  const spacingX = panelsPerRow > 1 
    ? (availableWidth - (panelsPerRow * panelWidth)) / (panelsPerRow - 1)
    : 0;
  const spacingY = numberOfRows > 1 
    ? (availableHeight - (numberOfRows * panelHeight)) / (numberOfRows - 1)
    : 0;
  
  return {
    panelsPerRow: Math.max(0, panelsPerRow),
    numberOfRows: Math.max(0, numberOfRows),
    totalPanels: Math.max(0, panelsPerRow * numberOfRows),
    spacingX: Math.max(standards.panelToPanel, spacingX),
    spacingY: Math.max(standards.walkwayClearance, spacingY)
  };
}

/**
 * Get panel choice based on market preference or specific requirements
 */
export function selectOptimalPanel(
  budget?: number,
  efficiencyPriority?: boolean,
  warrantyPriority?: boolean
): SolarPanelSpec {
  if (efficiencyPriority) {
    return [...UK_TOP_SOLAR_PANELS].sort((a, b) => b.efficiency - a.efficiency)[0];
  }
  
  if (warrantyPriority) {
    return [...UK_TOP_SOLAR_PANELS].sort((a, b) => b.warranty.product - a.warranty.product)[0];
  }
  
  if (budget) {
    const affordablePanels = UK_TOP_SOLAR_PANELS.filter(p => p.pricePerWatt <= budget);
    if (affordablePanels.length > 0) {
      return affordablePanels.sort((a, b) => b.marketShare - a.marketShare)[0];
    }
  }
  
  // Default to most popular panel (highest market share)
  return DEFAULT_UK_PANEL;
}