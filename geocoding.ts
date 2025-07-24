// Simple geocoding service for UK addresses
// In production, this would use Google Geocoding API
export interface Coordinates {
  lat: number;
  lng: number;
}

// Enhanced UK address lookup for common locations and postcodes
const ukLocationLookup: Record<string, Coordinates> = {
  // London areas and postcodes
  "10 downing street, london": { lat: 51.5034, lng: -0.1276 },
  "10 downing street": { lat: 51.5034, lng: -0.1276 },
  "london": { lat: 51.5074, lng: -0.1278 },
  "sw1a 2aa": { lat: 51.5034, lng: -0.1276 },
  "sw1a 1aa": { lat: 51.5034, lng: -0.1276 },
  "buckingham palace": { lat: 51.5014, lng: -0.1419 },
  
  // Major UK cities
  "manchester": { lat: 53.4839, lng: -2.2446 },
  "birmingham": { lat: 52.4862, lng: -1.8904 },
  "leeds": { lat: 53.8008, lng: -1.5491 },
  "glasgow": { lat: 55.8642, lng: -4.2518 },
  "liverpool": { lat: 53.4084, lng: -2.9916 },
  "bristol": { lat: 51.4545, lng: -2.5879 },
  "edinburgh": { lat: 55.9533, lng: -3.1883 },
  "sheffield": { lat: 53.3811, lng: -1.4701 },
  "cardiff": { lat: 51.4816, lng: -3.1791 },
  "belfast": { lat: 54.5973, lng: -5.9301 },
  
  // Common postcodes
  "m1 1aa": { lat: 53.4839, lng: -2.2446 }, // Manchester
  "b1 1aa": { lat: 52.4862, lng: -1.8904 }, // Birmingham
  "ls1 1aa": { lat: 53.8008, lng: -1.5491 }, // Leeds
  "g1 1aa": { lat: 55.8642, lng: -4.2518 }, // Glasgow
  "l1 1aa": { lat: 53.4084, lng: -2.9916 }, // Liverpool
};

export async function geocodeAddress(address: string): Promise<Coordinates> {
  // Try Google Maps API first if available
  const googleResult = await geocodeWithGoogle(address);
  if (googleResult) {
    return googleResult;
  }
  
  // Fall back to local lookup
  const normalizedAddress = address.toLowerCase().trim();
  console.log(`Looking up address: "${address}" (normalized: "${normalizedAddress}")`);
  
  // Check direct lookup first
  if (ukLocationLookup[normalizedAddress]) {
    console.log(`Found exact match for "${address}"`);
    return ukLocationLookup[normalizedAddress];
  }
  
  // Extract postcode pattern (UK postcodes)
  const postcodeMatch = normalizedAddress.match(/[a-z]{1,2}[0-9][a-z0-9]?\s?[0-9][a-z]{2}/);
  if (postcodeMatch) {
    const postcode = postcodeMatch[0].replace(/\s/g, '');
    const postcodeArea = postcode.substring(0, 3).toLowerCase();
    console.log(`Extracted postcode: ${postcode}, area: ${postcodeArea}`);
    
    if (ukLocationLookup[postcode]) {
      console.log(`Found postcode match for "${postcode}"`);
      return ukLocationLookup[postcode];
    }
    if (ukLocationLookup[postcodeArea]) {
      console.log(`Found postcode area match for "${postcodeArea}"`);
      return ukLocationLookup[postcodeArea];
    }
  }
  
  // Check if any key contains the search term
  for (const [key, coords] of Object.entries(ukLocationLookup)) {
    if (key.includes(normalizedAddress) || normalizedAddress.includes(key)) {
      console.log(`Found partial match for "${address}" with key "${key}"`);
      return coords;
    }
  }
  
  // Default to central London if no match found
  console.log(`Address "${address}" not found in lookup, defaulting to London`);
  return { lat: 51.5074, lng: -0.1278 };
}

export async function geocodeWithGoogle(address: string): Promise<Coordinates | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.log('Google Maps API key not available, using mock geocoding');
    return null;
  }
  
  try {
    console.log(`Using Google Maps API to geocode: "${address}"`);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    
    if (!response.ok) {
      console.error('Google Maps API error:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      console.log(`Google Maps API found coordinates: ${location.lat}, ${location.lng}`);
      return {
        lat: location.lat,
        lng: location.lng
      };
    } else {
      console.log('Google Maps API returned no results or error:', data.status);
      return null;
    }
  } catch (error) {
    console.error('Google Maps API error:', error);
    return null;
  }
}

