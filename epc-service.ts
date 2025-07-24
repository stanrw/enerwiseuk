/**
 * GOV UK EPC API Integration
 * 
 * This module handles fetching property data from the UK Government's
 * Energy Performance Certificate (EPC) database using address queries.
 */

interface EPCSearchParams {
  address?: string;
  postcode?: string;
  size?: number;
}

interface EPCSearchResult {
  rows: Array<{
    'lmk-key'?: string;
    'lmk_key'?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    postcode?: string;
    'building-reference-number'?: string;
  }>;
}

interface EPCCertificate {
  rows: Array<{
    'lmk-key'?: string;
    'address1'?: string;
    'address2'?: string;
    'address3'?: string;
    'postcode'?: string;
    'property-type'?: string;
    'built-form'?: string;
    'current-energy-rating'?: string;
    'potential-energy-rating'?: string;
    'total-floor-area'?: number;
    'construction-age-band'?: string;
    'inspection-date'?: string;
    'energy-consumption-current'?: number;
    'co2-emissions-current'?: number;
    'heating-cost-current'?: number;
    'heating-cost-potential'?: number;
  }>;
}

export interface PropertyData {
  propertyType?: string;
  builtForm?: string;
  currentEpcRating?: string;
  potentialEpcRating?: string;
  floorArea?: number;
  constructionAgeBand?: string;
  inspectionDate?: string;
  energyConsumption?: number;
  co2Emissions?: number;
  heatingCostCurrent?: number;
  heatingCostPotential?: number;
  homeSize?: 'Small Home' | 'Medium Home' | 'Large Home';
  isEpcOld?: boolean;
  address?: string;
  lmkKey?: string;
}

class EPCService {
  private readonly baseUrl = 'https://epc.opendatacommunities.org/api/v1/domestic';
  
  private get headers() {
    // Use hardcoded credentials as per EPC API specification
    const email = process.env.EPC_EMAIL || 'stanleywilson@solr.ai';
    const apiKey = process.env.EPC_API_KEY;
    
    if (!apiKey) {
      throw new Error('EPC_API_KEY environment variable not configured');
    }
    
    const token = Buffer.from(`${email}:${apiKey}`).toString('base64');
    return {
      'Authorization': `Basic ${token}`,
      'Accept': 'text/csv'
    };
  }

  /**
   * Search for EPC records using address and postcode
   */
  async searchEPC(params: EPCSearchParams): Promise<EPCSearchResult | null> {
    try {
      const url = new URL(`${this.baseUrl}/search`);
      
      if (params.address) url.searchParams.set('address', params.address);
      if (params.postcode) url.searchParams.set('postcode', params.postcode);
      if (params.size) url.searchParams.set('size', params.size.toString());

      const response = await fetch(url.toString(), {
        headers: this.headers
      });

      if (!response.ok) {
        console.warn(`EPC search failed: ${response.status} ${response.statusText}`);
        return null;
      }

      const csvData = await response.text();
      return this.parseCsvToSearchResult(csvData);
    } catch (error) {
      console.error('EPC search error:', error);
      return null;
    }
  }

  /**
   * Get full certificate details using LMK key
   */
  async getCertificate(lmkKey: string): Promise<EPCCertificate | null> {
    try {
      const response = await fetch(`${this.baseUrl}/certificate/${lmkKey}`, {
        headers: this.headers
      });

      if (!response.ok) {
        console.warn(`EPC certificate fetch failed: ${response.status} ${response.statusText}`);
        return null;
      }

      const csvData = await response.text();
      return this.parseCsvToCertificate(csvData);
    } catch (error) {
      console.error('EPC certificate error:', error);
      return null;
    }
  }

  /**
   * Parse CSV response to search result format
   */
  private parseCsvToSearchResult(csvData: string): EPCSearchResult | null {
    const lines = csvData.trim().split('\n');
    if (lines.length < 2) return null;
    
    const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.replace(/"/g, ''));
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });
    
    return { rows };
  }

  /**
   * Parse CSV response to certificate format
   */
  private parseCsvToCertificate(csvData: string): EPCCertificate | null {
    const searchResult = this.parseCsvToSearchResult(csvData);
    return searchResult as EPCCertificate;
  }

  /**
   * Extract property data from EPC certificate
   */
  private parsePropertyData(cert: EPCCertificate): PropertyData | null {
    const row = cert.rows?.[0];
    if (!row) return null;

    const floorArea = row['total-floor-area'];
    const inspectionDate = row['inspection-date'];
    
    // Determine home size based on floor area
    let homeSize: 'Small Home' | 'Medium Home' | 'Large Home' | undefined;
    if (floorArea) {
      if (floorArea < 80) homeSize = 'Small Home';
      else if (floorArea <= 150) homeSize = 'Medium Home';
      else homeSize = 'Large Home';
    }

    // Check if EPC is over 10 years old
    let isEpcOld = false;
    if (inspectionDate) {
      const inspectionYear = new Date(inspectionDate).getFullYear();
      const currentYear = new Date().getFullYear();
      isEpcOld = (currentYear - inspectionYear) > 10;
    }

    // Combine property type and built form
    const propertyType = row['property-type'];
    const builtForm = row['built-form'];
    const combinedType = propertyType && builtForm ? `${builtForm} ${propertyType}` : propertyType || builtForm;

    // Validate energy consumption - ignore unrealistic values
    let validatedEnergyConsumption: number | undefined = row['energy-consumption-current'];
    if (validatedEnergyConsumption && (validatedEnergyConsumption < 500 || validatedEnergyConsumption > 20000)) {
      // Ignore unrealistic energy consumption values (less than 500 kWh or more than 20,000 kWh per year)
      validatedEnergyConsumption = undefined;
    }

    // Build address from components
    const addressParts = [row['address1'], row['address2'], row['address3']].filter(Boolean);
    const fullAddress = addressParts.join(', ');

    return {
      propertyType: combinedType,
      builtForm: row['built-form'],
      currentEpcRating: row['current-energy-rating'],
      potentialEpcRating: row['potential-energy-rating'],
      floorArea,
      constructionAgeBand: row['construction-age-band'],
      inspectionDate,
      energyConsumption: validatedEnergyConsumption,
      co2Emissions: row['co2-emissions-current'],
      heatingCostCurrent: row['heating-cost-current'],
      heatingCostPotential: row['heating-cost-potential'],
      homeSize,
      isEpcOld,
      address: fullAddress,
      lmkKey: row['lmk-key']
    };
  }

  /**
   * Extract house number from address string
   */
  private extractHouseNumber(address: string): string | null {
    const match = address.match(/^(\d+[a-zA-Z]?)/);
    return match ? match[1] : null;
  }

  /**
   * Get partial postcode (first part before space)
   */
  private getPartialPostcode(postcode: string): string {
    return postcode.split(' ')[0] || postcode.substring(0, Math.ceil(postcode.length / 2));
  }

  /**
   * Main method to fetch property data with multiple fallback strategies
   */
  async getPropertyData(address: string, postcode: string): Promise<PropertyData | null> {
    console.log(`EPC lookup request: address="${address}", postcode="${postcode}"`);

    // Strategy 1: Full address string + full postcode
    console.log('Strategy 1: Searching with full address + full postcode');
    let searchResult = await this.searchEPC({
      address: address,
      postcode: postcode,
      size: 1
    });

    // Strategy 2: Full address + partial postcode only
    if (!searchResult?.rows?.length) {
      const partialPostcode = this.getPartialPostcode(postcode);
      console.log(`Strategy 2: Searching with full address + partial postcode: "${partialPostcode}"`);
      searchResult = await this.searchEPC({
        address: address,
        postcode: partialPostcode,
        size: 5
      });
    }

    // Strategy 3: House number + full postcode
    if (!searchResult?.rows?.length) {
      const houseNumber = this.extractHouseNumber(address);
      if (houseNumber) {
        console.log(`Strategy 3: Searching with house number "${houseNumber}" + full postcode`);
        searchResult = await this.searchEPC({
          address: houseNumber,
          postcode: postcode,
          size: 5
        });
      }
    }

    // Strategy 4: Postcode only search
    if (!searchResult?.rows?.length) {
      console.log('Strategy 4: Searching with postcode only');
      searchResult = await this.searchEPC({
        postcode: postcode,
        size: 10
      });
    }

    // If all strategies fail, return null for graceful fallback
    if (!searchResult?.rows?.length) {
      console.log('All EPC search strategies failed - gracefully falling back to user-selected data');
      return null;
    }

    // Get the LMK key from the first result
    const firstResult = searchResult.rows[0];
    const lmkKey = firstResult['lmk-key'] || firstResult['lmk_key'];
    
    if (!lmkKey) {
      console.warn('No LMK key found in search result');
      return null;
    }

    console.log(`Found EPC record with LMK key: ${lmkKey}`);

    // Fetch full certificate details
    const certificate = await this.getCertificate(lmkKey);
    if (!certificate?.rows?.length) {
      console.warn('Failed to fetch certificate details');
      return null;
    }

    const propertyData = this.parsePropertyData(certificate);
    console.log('EPC data found:', propertyData);
    
    return propertyData;
  }

  /**
   * Test API connectivity
   */
  async testAPI(postcode: string = 'SE7 7PT'): Promise<any> {
    try {
      console.log(`Testing EPC API with postcode: ${postcode}`);
      const result = await this.searchEPC({ postcode, size: 1 });
      console.log(`EPC API test result: ${result?.rows?.length || 0} records found`);
      return result;
    } catch (error) {
      console.error('EPC API test failed:', error);
      return null;
    }
  }
}

export const epcService = new EPCService();
export type { EPCSearchResult, EPCCertificate };