import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Installer } from "@shared/schema";

interface InstallerCardProps {
  installer: Installer;
}

export default function InstallerCard({ installer }: InstallerCardProps) {
  const specialtyIcons: Record<string, string> = {
    solar: "fas fa-solar-panel",
    battery: "fas fa-battery-full",
    heat_pump: "fas fa-thermometer-half",
    ev_charger: "fas fa-charging-station",
  };

  const specialtyColors: Record<string, string> = {
    solar: "text-energy-amber",
    battery: "text-blue-500",
    heat_pump: "text-red-500",
    ev_charger: "text-green-500",
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-energy-green rounded-full flex items-center justify-center">
            <i className="fas fa-tools text-white"></i>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="font-semibold text-lg">{installer.name}</h3>
            <div className="text-yellow-400 flex items-center">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`fas fa-star ${i < Math.floor(parseFloat(installer.rating))} ? 'text-yellow-400' : 'text-gray-300'}`}
                ></i>
              ))}
              <span className="text-gray-600 ml-2 text-sm">
                {installer.rating} ({installer.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">{installer.description}</p>
        
        {/* Specialties */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Specialties</div>
          <div className="flex flex-wrap gap-2">
            {installer.specialties?.map((specialty) => (
              <div key={specialty} className="flex items-center">
                <i className={`${specialtyIcons[specialty]} ${specialtyColors[specialty]} text-sm mr-1`}></i>
                <span className="text-xs capitalize">{specialty.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Certifications */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Certifications</div>
          <div className="flex flex-wrap gap-1">
            {installer.certifications?.map((cert) => (
              <Badge key={cert} variant="secondary" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-500">
            <i className="fas fa-map-marker-alt mr-1"></i>
            {installer.serviceAreas?.slice(0, 3).join(', ')}
          </div>
          <Button 
            size="sm" 
            className="bg-energy-green text-white hover:bg-energy-dark"
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
