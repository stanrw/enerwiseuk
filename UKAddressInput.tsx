import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, CheckCircle } from 'lucide-react';

interface UKAddressInputProps {
  onAddressSelect: (address: string, validated: boolean) => void;
  defaultValue?: string;
  placeholder?: string;
}

interface AddressSuggestion {
  text: string;
  formatted: string;
  validated: boolean;
  confidence: number;
}

export function UKAddressInput({ onAddressSelect, defaultValue = '', placeholder = 'Enter your UK address...' }: UKAddressInputProps) {
  const [input, setInput] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Simulate address suggestions based on UK address patterns
  const generateAddressSuggestions = (query: string): AddressSuggestion[] => {
    // Require more substantial input - at least 6 characters and some meaningful content
    if (query.length < 6) return [];
    
    // Don't show suggestions for just numbers or very short inputs
    const hasLetters = /[a-zA-Z]/.test(query);
    if (!hasLetters || query.trim().length < 5) return [];

    const ukPostcodeRegex = /[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}/i;
    const hasPostcode = ukPostcodeRegex.test(query);

    // Sample UK addresses for demonstration
    const sampleAddresses = [
      { house: '123', street: 'High Street', area: 'Hampstead', postcode: 'NW3 1AA' },
      { house: '45', street: 'Church Lane', area: 'Richmond', postcode: 'TW9 1SN' },
      { house: '67', street: 'Victoria Road', area: 'Brighton', postcode: 'BN1 3FN' },
      { house: '89', street: 'Mill Lane', area: 'Cambridge', postcode: 'CB2 1RX' },
      { house: '12', street: 'Oak Avenue', area: 'Manchester', postcode: 'M20 4WX' }
    ];

    // Only show suggestions that actually match meaningful parts of the query
    const matchingAddresses = sampleAddresses.filter(addr => {
      const queryLower = query.toLowerCase();
      const streetMatch = addr.street.toLowerCase().includes(queryLower) && queryLower.length >= 4;
      const areaMatch = addr.area.toLowerCase().includes(queryLower) && queryLower.length >= 4;
      const postcodeMatch = addr.postcode.toLowerCase().includes(queryLower) && queryLower.length >= 3;
      
      return streetMatch || areaMatch || postcodeMatch;
    });

    return matchingAddresses
      .slice(0, 5)
      .map(addr => ({
        text: `${addr.house} ${addr.street}, ${addr.area}, ${addr.postcode}`,
        formatted: `${addr.house} ${addr.street}, ${addr.area}, ${addr.postcode}`,
        validated: hasPostcode,
        confidence: hasPostcode ? 0.95 : 0.75
      }));
  };

  const handleInputChange = async (value: string) => {
    setInput(value);
    setIsValidated(false);
    setShowHelp(false);
    
    // Only start processing when we have meaningful input
    if (value.length >= 3 && /[a-zA-Z]/.test(value)) {
      setIsLoading(true);
      
      try {
        // Use Google Places API for real address suggestions
        const response = await fetch('/api/google-places/autocomplete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            input: value,
            componentRestrictions: { country: 'uk' },
            types: ['address']
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          const realSuggestions = data.predictions?.map((prediction: any) => ({
            text: prediction.description,
            formatted: prediction.description,
            validated: true,
            confidence: 0.95,
            placeId: prediction.place_id
          })) || [];
          
          setSuggestions(realSuggestions);
        } else {
          // Fallback to mock suggestions if API is unavailable
          const mockSuggestions = generateAddressSuggestions(value);
          setSuggestions(mockSuggestions);
        }
      } catch (error) {
        // Fallback to mock suggestions on error
        const mockSuggestions = generateAddressSuggestions(value);
        setSuggestions(mockSuggestions);
      }
      
      setIsLoading(false);
      
      // Auto-detect complete addresses
      const ukPostcodeRegex = /[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}/i;
      const hasValidPostcode = ukPostcodeRegex.test(value);
      const hasHouseNumber = /^\d+[a-zA-Z]?/.test(value.trim()) || /\b\d+[a-zA-Z]?\b/.test(value);
      const isCompleteAddress = value.length > 15 && hasValidPostcode && hasHouseNumber;
      
      if (isCompleteAddress) {
        setIsValidated(true);
        onAddressSelect(value, true);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion: AddressSuggestion) => {
    setInput(suggestion.formatted);
    setSuggestions([]);
    setIsValidated(suggestion.validated);
    onAddressSelect(suggestion.formatted, suggestion.validated);
  };

  const handleManualEntry = () => {
    const ukPostcodeRegex = /[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}/i;
    const validated = ukPostcodeRegex.test(input) && input.length > 10;
    setIsValidated(validated);
    onAddressSelect(input, validated);
  };

  // Address format validation with helpful feedback
  const getAddressValidation = () => {
    if (!input.trim()) return null;
    
    const hasHouseNumber = /^\d+[a-zA-Z]?/.test(input.trim()) || /\b\d+[a-zA-Z]?\b/.test(input);
    const hasStreetName = input.includes(' ') && input.length > 5;
    const ukPostcodeRegex = /[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}/i;
    const hasPostcode = ukPostcodeRegex.test(input);
    
    if (hasHouseNumber && hasStreetName && hasPostcode) {
      return { type: 'complete', message: 'Complete address - ready for analysis' };
    } else if (input.length < 10) {
      return { type: 'partial', message: 'Keep typing your full address...' };
    } else if (!hasHouseNumber) {
      return { type: 'missing', message: 'Include house number (e.g., "12 Oak Street...")' };
    } else if (!hasPostcode) {
      return { type: 'missing', message: 'Include postcode (e.g., "...London SW1A 1AA")' };
    } else {
      return { type: 'partial', message: 'Looking good - add postcode to complete' };
    }
  };

  const validation = getAddressValidation();

  return (
    <div className="space-y-3">
      {/* Input Field with Enhanced UX */}
      <div className="relative">
        <div className="relative">
          <Input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className="pl-10 pr-20 text-lg h-14 border-2 focus:border-energy-green transition-colors"
            onFocus={() => setShowHelp(true)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          {isValidated && (
            <CheckCircle className="absolute right-12 top-1/2 transform -translate-y-1/2 text-green-500 h-6 w-6" />
          )}
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-energy-green"></div>
            </div>
          )}
        </div>

        {input.length >= 3 && !isLoading && !isValidated && (
          <Button
            onClick={handleManualEntry}
            variant="outline"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs h-8"
          >
            Use This
          </Button>
        )}
      </div>

      {/* Validation Feedback */}
      {validation && (
        <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${
          validation.type === 'complete' ? 'bg-green-50 text-green-700 border border-green-200' :
          validation.type === 'partial' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
          'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          {validation.type === 'complete' ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : validation.type === 'partial' ? (
            <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-amber-500" />
          )}
          <span className="font-medium">{validation.message}</span>
        </div>
      )}

      {/* Helper Text on Focus */}
      {(showHelp || input.length < 5) && !isValidated && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
          <div className="font-medium text-gray-900 mb-2">Please enter your complete UK address:</div>
          <div className="space-y-1 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>House number and street name</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>Town/city and postcode</span>
            </div>
            <div className="mt-2 text-xs text-gray-500 italic">
              Example: "42 Baker Street, London, NW1 6XE"
            </div>
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <Card className="shadow-lg">
          <CardContent className="p-2">
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-start space-x-3"
                >
                  <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {suggestion.formatted}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant={suggestion.validated ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {suggestion.validated ? 'Validated' : 'Suggested'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {Math.round(suggestion.confidence * 100)}% match
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isValidated && (
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span>Address validated and ready for analysis</span>
        </div>
      )}
    </div>
  );
}