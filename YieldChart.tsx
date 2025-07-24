import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface YieldChartProps {
  monthlyData: Array<{
    month: string;
    yield: number;
    irradiance: number;
  }>;
  annualYield: number;
  systemSize: number;
}

export function YieldChart({ monthlyData, annualYield, systemSize }: YieldChartProps) {
  const formatTooltip = (value: number, name: string) => {
    if (name === 'yield') {
      return [`${value.toFixed(0)} kWh`, 'Solar Yield'];
    }
    if (name === 'irradiance') {
      return [`${value.toFixed(1)} kWh/m²`, 'Solar Irradiance'];
    }
    return [value, name];
  };

  const maxYield = Math.max(...monthlyData.map(d => d.yield));
  const maxIrradiance = Math.max(...monthlyData.map(d => d.irradiance));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-energy-green">
              {annualYield.toLocaleString()} kWh
            </div>
            <p className="text-sm text-gray-600">Annual Yield</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-energy-green">
              {(annualYield / systemSize).toFixed(0)} kWh/kW
            </div>
            <p className="text-sm text-gray-600">Specific Yield</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-energy-green">
              {((annualYield / systemSize / 8760) * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">Performance Ratio</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Yield Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Solar Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={formatTooltip}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar 
                  dataKey="yield" 
                  fill="#22c55e" 
                  radius={[4, 4, 0, 0]}
                  name="yield"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Solar Irradiance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Solar Irradiance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'kWh/m²', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={formatTooltip}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="irradiance" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  name="irradiance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}