import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UK_TOP_SOLAR_PANELS, type SolarPanelSpec } from '@shared/uk-solar-panel-database';
import { CheckCircle, Zap, Shield, Ruler, Weight } from 'lucide-react';

interface PanelSelectionProps {
  onPanelSelect: (panel: SolarPanelSpec) => void;
  selectedPanel?: SolarPanelSpec;
  roofArea?: number;
}

export function PanelSelection({ onPanelSelect, selectedPanel, roofArea }: PanelSelectionProps) {
  const [filterBy, setFilterBy] = useState<'popular' | 'efficiency' | 'warranty' | 'budget'>('popular');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const getFilteredPanels = () => {
    let panels = [...UK_TOP_SOLAR_PANELS];

    // Apply brand filter
    if (selectedBrands.length > 0) {
      panels = panels.filter(panel => selectedBrands.includes(panel.brand));
    }

    // Apply sorting based on filter
    switch (filterBy) {
      case 'efficiency':
        return panels.sort((a, b) => b.efficiency - a.efficiency);
      case 'warranty':
        return panels.sort((a, b) => b.warranty.product - a.warranty.product);
      case 'budget':
        return panels.sort((a, b) => a.pricePerWatt - b.pricePerWatt);
      default:
        return panels.sort((a, b) => b.marketShare - a.marketShare);
    }
  };

  const uniqueBrands = [...new Set(UK_TOP_SOLAR_PANELS.map(panel => panel.brand))];
  const filteredPanels = getFilteredPanels();

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const calculatePanelsNeeded = (panel: SolarPanelSpec): number => {
    if (!roofArea) return 0;
    const panelArea = (panel.dimensions.length * panel.dimensions.width) / 10000; // Convert to m²
    return Math.floor((roofArea * 0.6) / panelArea); // 60% roof utilization
  };

  const getFilterDescription = () => {
    switch (filterBy) {
      case 'efficiency':
        return 'Highest energy output per panel';
      case 'warranty':
        return 'Best warranty protection';
      case 'budget':
        return 'Most cost-effective options';
      default:
        return 'Most popular in UK market';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by Priority
          </label>
          <Select value={filterBy} onValueChange={(value: any) => setFilterBy(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Market Popularity</SelectItem>
              <SelectItem value="efficiency">Highest Efficiency</SelectItem>
              <SelectItem value="warranty">Best Warranty</SelectItem>
              <SelectItem value="budget">Best Value</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 mt-1">{getFilterDescription()}</p>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Brand
          </label>
          <div className="flex flex-wrap gap-2">
            {uniqueBrands.map(brand => (
              <Button
                key={brand}
                variant={selectedBrands.includes(brand) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleBrand(brand)}
                className="text-xs"
              >
                {brand}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPanels.map((panel) => {
          const isSelected = selectedPanel?.id === panel.id;
          const panelsNeeded = calculatePanelsNeeded(panel);
          const totalOutput = panelsNeeded * panel.powerOutput / 1000; // kW

          return (
            <Card 
              key={panel.id} 
              className={`cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-energy-green border-energy-green shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onPanelSelect(panel)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{panel.brand}</CardTitle>
                    <p className="text-sm text-gray-600">{panel.model}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle className="h-6 w-6 text-energy-green" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {panel.marketShare}% UK Market Share
                  </Badge>
                  {panel.efficiency > 22 && (
                    <Badge variant="default" className="text-xs bg-energy-green">
                      High Efficiency
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-energy-green" />
                    <div>
                      <div className="font-medium">{panel.powerOutput}W</div>
                      <div className="text-gray-500">Power Output</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-energy-green rounded" />
                    <div>
                      <div className="font-medium">{panel.efficiency}%</div>
                      <div className="text-gray-500">Efficiency</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="font-medium">{panel.warranty.product} years</div>
                      <div className="text-gray-500">Warranty</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-400 rounded" />
                    <div>
                      <div className="font-medium">£{panel.pricePerWatt}</div>
                      <div className="text-gray-500">per Watt</div>
                    </div>
                  </div>
                </div>

                {/* Physical Specs */}
                <div className="border-t pt-3">
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Ruler className="h-3 w-3" />
                      <span>{panel.dimensions.length}×{panel.dimensions.width}cm</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Weight className="h-3 w-3" />
                      <span>{panel.weight}kg</span>
                    </div>
                    <div className="text-center">
                      <span>{panel.dimensions.thickness}cm thick</span>
                    </div>
                  </div>
                </div>

                {/* System Preview */}
                {roofArea && panelsNeeded > 0 && (
                  <div className="border-t pt-3 bg-gray-50 -mx-6 px-6 -mb-6 pb-6 rounded-b-lg">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 mb-1">For Your Roof:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Panels: </span>
                          <span className="font-medium">{panelsNeeded}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">System: </span>
                          <span className="font-medium">{totalOutput.toFixed(1)}kW</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPanels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No panels found with the selected filters. Try adjusting your criteria.
        </div>
      )}
    </div>
  );
}