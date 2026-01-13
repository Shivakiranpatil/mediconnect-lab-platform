import LabLayout from "@/components/LabLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Plus, Edit2, Trash2, DollarSign, Clock, Save } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceZone {
  id: string;
  name: string;
  emirate: string;
  areas: string[];
  isActive: boolean;
  surcharge: number;
  estimatedTime: string;
}

export default function LabZonesPage() {
  const { toast } = useToast();
  const [zones, setZones] = useState<ServiceZone[]>([
    { id: 'z1', name: 'Dubai Marina & JBR', emirate: 'Dubai', areas: ['Marina', 'JBR', 'Palm Jumeirah'], isActive: true, surcharge: 0, estimatedTime: '30-45 min' },
    { id: 'z2', name: 'Downtown & Business Bay', emirate: 'Dubai', areas: ['Downtown', 'Business Bay', 'DIFC'], isActive: true, surcharge: 0, estimatedTime: '20-35 min' },
    { id: 'z3', name: 'Jumeirah Area', emirate: 'Dubai', areas: ['Jumeirah 1', 'Jumeirah 2', 'Jumeirah 3', 'Umm Suqeim'], isActive: true, surcharge: 25, estimatedTime: '35-50 min' },
    { id: 'z4', name: 'Deira & Bur Dubai', emirate: 'Dubai', areas: ['Deira', 'Bur Dubai', 'Al Rigga'], isActive: false, surcharge: 50, estimatedTime: '45-60 min' },
    { id: 'z5', name: 'Sharjah City', emirate: 'Sharjah', areas: ['Al Majaz', 'Al Nahda', 'Al Qasimia'], isActive: false, surcharge: 75, estimatedTime: '60-90 min' },
  ]);

  const [editingZone, setEditingZone] = useState<string | null>(null);

  const toggleZone = (zoneId: string) => {
    setZones(zones.map(z => 
      z.id === zoneId ? { ...z, isActive: !z.isActive } : z
    ));
    toast({ title: "Zone Updated", description: "Service zone status has been updated." });
  };

  const activeZones = zones.filter(z => z.isActive);
  const inactiveZones = zones.filter(z => !z.isActive);

  return (
    <LabLayout title="Service Zones" subtitle="Manage your coverage areas and delivery fees">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30" data-testid="badge-active-zones">
              {activeZones.length} Active Zones
            </Badge>
            <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30" data-testid="badge-inactive-zones">
              {inactiveZones.length} Inactive
            </Badge>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700" data-testid="button-add-zone">
            <Plus className="w-4 h-4 mr-2" />
            Add Zone
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {zones.map((zone, i) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`bg-slate-800/40 border-slate-700 ${!zone.isActive ? 'opacity-60' : ''}`} data-testid={`zone-${zone.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${zone.isActive ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-600/20 text-slate-500'}`}>
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg" data-testid={`zone-name-${zone.id}`}>{zone.name}</CardTitle>
                        <p className="text-sm text-slate-400">{zone.emirate}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={zone.isActive}
                      onCheckedChange={() => toggleZone(zone.id)}
                      data-testid={`switch-zone-${zone.id}`}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {zone.areas.map(area => (
                      <Badge key={area} variant="outline" className="border-slate-600 text-slate-300">
                        {area}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-700">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Surcharge</p>
                        <p className="text-white font-medium" data-testid={`surcharge-${zone.id}`}>
                          {zone.surcharge === 0 ? 'Free' : `+${zone.surcharge} AED`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Est. Time</p>
                        <p className="text-white font-medium">{zone.estimatedTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-700">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-slate-600 text-slate-300"
                      data-testid={`edit-zone-${zone.id}`}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                      data-testid={`delete-zone-${zone.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="bg-slate-800/40 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Zone Coverage Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-slate-700/50 rounded-xl flex items-center justify-center" data-testid="coverage-map">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400">Interactive map coming soon</p>
                <p className="text-sm text-slate-500">Currently serving {activeZones.length} zones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LabLayout>
  );
}
