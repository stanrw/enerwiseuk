import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SystemRecommendation } from "@/lib/types";

interface ResultsDashboardProps {
  assessment: any;
}

export default function ResultsDashboard({ assessment }: ResultsDashboardProps) {
  const solarRec = assessment.solarRecommendation as SystemRecommendation;
  const batteryRec = assessment.batteryRecommendation as SystemRecommendation;
  const heatPumpRec = assessment.heatPumpRecommendation as SystemRecommendation;
  const evChargerRec = assessment.evChargerRecommendation as SystemRecommendation;

  const totalSavings = parseFloat(assessment.totalSavings);
  const totalCost = parseFloat(assessment.totalCost);
  const paybackPeriod = parseFloat(assessment.paybackPeriod);
  const carbonSavings = parseFloat(assessment.carbonSavings);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-energy-green mb-2">
              £{totalSavings.toLocaleString()}
            </div>
            <div className="text-gray-600">Annual Savings</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-energy-amber mb-2">
              {paybackPeriod.toFixed(1)} years
            </div>
            <div className="text-gray-600">Payback Period</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {carbonSavings.toFixed(1)} tonnes
            </div>
            <div className="text-gray-600">CO₂ Saved Annually</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Recommendations */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Your Recommended Systems</h3>
        
        {solarRec.recommended && (
          <SystemCard
            recommendation={solarRec}
            icon="fas fa-solar-panel"
            iconColor="text-energy-amber"
            title="Solar Panel System"
          />
        )}
        
        {batteryRec.recommended && (
          <SystemCard
            recommendation={batteryRec}
            icon="fas fa-battery-full"
            iconColor="text-blue-500"
            title="Battery Storage"
          />
        )}
        
        {heatPumpRec.recommended && (
          <SystemCard
            recommendation={heatPumpRec}
            icon="fas fa-thermometer-half"
            iconColor="text-red-500"
            title="Heat Pump System"
          />
        )}
        
        {evChargerRec.recommended && (
          <SystemCard
            recommendation={evChargerRec}
            icon="fas fa-charging-station"
            iconColor="text-green-500"
            title="EV Charger"
          />
        )}
      </div>
    </div>
  );
}

interface SystemCardProps {
  recommendation: SystemRecommendation;
  icon: string;
  iconColor: string;
  title: string;
}

function SystemCard({ recommendation, icon, iconColor, title }: SystemCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className={`${icon} ${iconColor} text-2xl mr-3`}></i>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <div className="text-2xl font-bold text-energy-green">
            £{recommendation.cost.toLocaleString()}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
          {Object.entries(recommendation.specifications).map(([key, value]) => (
            <div key={key}>
              <div className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              <div className="text-gray-600">{value}</div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-semibold">Annual Savings</div>
            <div className="text-gray-600">£{recommendation.annualSavings.toLocaleString()}</div>
          </div>
          <div>
            <div className="font-semibold">Payback Period</div>
            <div className="text-gray-600">{recommendation.paybackPeriod} years</div>
          </div>
          <div>
            <div className="font-semibold">ROI</div>
            <Badge variant="secondary" className="text-energy-green">
              {recommendation.roi}%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
