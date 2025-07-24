/**
 * UK Address Validation System
 * Ensures specific property identification to prevent multiple property detection
 */

export interface AddressValidation {
  isValid: boolean;
  hasHouseNumber: boolean;
  hasPostcode: boolean;
  hasStreetName: boolean;
  specificity: 'low' | 'medium' | 'high';
  errors: string[];
  normalizedAddress: string;
}

/**
 * Validate UK address for solar roof analysis specificity
 */
export function validateUKAddress(address: string): AddressValidation {
  const errors: string[] = [];
  let specificity: 'low' | 'medium' | 'high' = 'low';
  
  // Clean and normalize address
  const cleanAddress = address.trim().replace(/\s+/g, ' ');
  
  // Check for house number (digits at start or specific number patterns)
  const hasHouseNumber = /^(\d+[a-zA-Z]?|\d+\s*-\s*\d+)/.test(cleanAddress) || 
                        /\b\d+[a-zA-Z]?\b/.test(cleanAddress.split(',')[0]);
  
  // Check for UK postcode pattern
  const postcodeRegex = /\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i;
  const hasPostcode = postcodeRegex.test(cleanAddress);
  
  // Check for street name (more than just numbers)
  const hasStreetName = cleanAddress.split(/[,\s]+/).some(part => 
    /^[A-Za-z]/.test(part) && part.length > 2 && !postcodeRegex.test(part)
  );
  
  // Determine specificity level
  if (hasHouseNumber && hasPostcode && hasStreetName) {
    specificity = 'high';
  } else if ((hasHouseNumber && hasPostcode) || (hasHouseNumber && hasStreetName)) {
    specificity = 'medium';
  } else {
    specificity = 'low';
  }
  
  // Generate validation errors
  if (!hasHouseNumber) {
    errors.push('House number required for precise roof identification');
  }
  
  if (!hasPostcode) {
    errors.push('UK postcode required (e.g., SW1A 2AA)');
  }
  
  if (!hasStreetName) {
    errors.push('Street name required for location accuracy');
  }
  
  if (specificity === 'low') {
    errors.push('Address too vague - may analyze multiple properties');
  }
  
  return {
    isValid: specificity === 'high',
    hasHouseNumber,
    hasPostcode,
    hasStreetName,
    specificity,
    errors,
    normalizedAddress: cleanAddress
  };
}

/**
 * Extract property boundaries count from roof segmentation data
 */
export function detectMultipleProperties(roofSegments: any[]): {
  propertyCount: number;
  clusteredSegments: any[][];
  confidence: number;
} {
  if (!roofSegments || roofSegments.length === 0) {
    return { propertyCount: 0, clusteredSegments: [], confidence: 0 };
  }
  
  // Group segments by proximity and orientation patterns
  const clusters: any[][] = [];
  const processed = new Set<string>();
  
  for (const segment of roofSegments) {
    if (processed.has(segment.id)) continue;
    
    const cluster = [segment];
    processed.add(segment.id);
    
    // Find nearby segments with similar characteristics
    for (const otherSegment of roofSegments) {
      if (processed.has(otherSegment.id)) continue;
      
      const distance = calculateSegmentDistance(segment, otherSegment);
      const orientationDiff = Math.abs(segment.orientation - otherSegment.orientation);
      
      // Group segments that are close and have similar orientations
      if (distance < 50 && orientationDiff < 45) {
        cluster.push(otherSegment);
        processed.add(otherSegment.id);
      }
    }
    
    clusters.push(cluster);
  }
  
  // Calculate confidence based on cluster separation and characteristics
  const confidence = clusters.length > 1 ? 
    Math.min(0.9, clusters.length * 0.2 + (clusters.length - 1) * 0.1) : 0.3;
  
  return {
    propertyCount: clusters.length,
    clusteredSegments: clusters,
    confidence
  };
}

/**
 * Calculate distance between roof segments (simplified)
 */
function calculateSegmentDistance(segment1: any, segment2: any): number {
  // Use bounding box centers for distance calculation
  const center1 = segment1.boundaryPoints?.length > 0 ? 
    segment1.boundaryPoints.reduce((acc: any, point: any) => ({
      lat: acc.lat + point.lat / segment1.boundaryPoints.length,
      lng: acc.lng + point.lng / segment1.boundaryPoints.length
    }), { lat: 0, lng: 0 }) : { lat: 0, lng: 0 };
    
  const center2 = segment2.boundaryPoints?.length > 0 ? 
    segment2.boundaryPoints.reduce((acc: any, point: any) => ({
      lat: acc.lat + point.lat / segment2.boundaryPoints.length,
      lng: acc.lng + point.lng / segment2.boundaryPoints.length
    }), { lat: 0, lng: 0 }) : { lat: 0, lng: 0 };
  
  // Simple distance calculation (in degrees, roughly)
  const latDiff = center1.lat - center2.lat;
  const lngDiff = center1.lng - center2.lng;
  
  // Convert to approximate meters (very rough approximation)
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111000;
}