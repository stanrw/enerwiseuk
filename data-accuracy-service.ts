/**
 * Data Accuracy Service - Ensures only authentic data is used for calculations
 * Prevents fallback to generic estimates and provides clear data provenance
 */

export interface DataAccuracy {
  isAuthentic: boolean;
  confidence: number; // 0-100
  sources: string[];
  limitations: string[];
  recommendations: string[];
}

export interface AuthenticatedData {
  epcCertificate?: any;
  googleSolarData?: any;
  smartMeterReadings?: any;
  osDatahubProperty?: any;
}

/**
 * Validate that we have sufficient authentic data for accurate calculations
 */
export function validateDataAuthenticity(data: AuthenticatedData): DataAccuracy {
  const sources: string[] = [];
  const limitations: string[] = [];
  const recommendations: string[] = [];
  
  // Check EPC Certificate data
  if (data.epcCertificate) {
    sources.push("EPC Certificate (Government verified)");
  } else {
    limitations.push("No EPC certificate - heating costs estimated");
    recommendations.push("Register property with Energy Performance Certificate database");
  }
  
  // Check Google Solar API data
  if (data.googleSolarData) {
    sources.push("Google Solar API (Satellite analysis)");
  } else {
    limitations.push("No solar potential analysis - roof assessment estimated");
    recommendations.push("Enable Google Solar API for precise roof analysis");
  }
  
  // Check Smart Meter data
  if (data.smartMeterReadings) {
    sources.push("Smart Meter (Real consumption data)");
  } else {
    limitations.push("No smart meter connection - usage patterns estimated");
    recommendations.push("Connect smart meter via DCC for actual consumption data");
  }
  
  // Check OS DataHub property data
  if (data.osDatahubProperty) {
    sources.push("OS DataHub (Official property data)");
  } else {
    limitations.push("No OS property verification - property details estimated");
    recommendations.push("Configure OS DataHub API for verified property information");
  }
  
  // Calculate confidence based on data availability
  const maxSources = 4;
  const availableSources = sources.length;
  const confidence = Math.round((availableSources / maxSources) * 100);
  
  // Determine if data is sufficiently authentic
  const isAuthentic = availableSources >= 2; // Need at least 2 authentic sources
  
  return {
    isAuthentic,
    confidence,
    sources,
    limitations,
    recommendations
  };
}

/**
 * Generate error message for insufficient data
 */
export function generateDataInsufficientError(accuracy: DataAccuracy): Error {
  const message = `
Insufficient authentic data for accurate renewable energy assessment.

Available data sources (${accuracy.sources.length}/4):
${accuracy.sources.map(s => `✓ ${s}`).join('\n')}

Missing data sources:
${accuracy.limitations.map(l => `✗ ${l}`).join('\n')}

To get accurate recommendations:
${accuracy.recommendations.map(r => `• ${r}`).join('\n')}

Current confidence: ${accuracy.confidence}% (minimum 50% required)
  `.trim();
  
  return new Error(message);
}

/**
 * Check if calculations can proceed with available data
 */
export function canGenerateAccurateRecommendations(data: AuthenticatedData): boolean {
  const accuracy = validateDataAuthenticity(data);
  return accuracy.isAuthentic && accuracy.confidence >= 50;
}

/**
 * Get data quality summary for frontend display
 */
export function getDataQualitySummary(data: AuthenticatedData) {
  const accuracy = validateDataAuthenticity(data);
  
  return {
    confidence: accuracy.confidence,
    isHighQuality: accuracy.confidence >= 75,
    isMediumQuality: accuracy.confidence >= 50 && accuracy.confidence < 75,
    isLowQuality: accuracy.confidence < 50,
    sources: accuracy.sources,
    limitations: accuracy.limitations,
    recommendations: accuracy.recommendations,
    canProceed: accuracy.isAuthentic
  };
}