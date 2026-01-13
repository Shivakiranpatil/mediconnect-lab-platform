import LabLayout from "@/components/LabLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Package, TrendingUp, TrendingDown, Save, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Bundle } from "@shared/schema";

interface LabPricing {
  bundleId: string;
  bundleName: string;
  basePrice: number;
  labPrice: number;
  homeCollectionFee: number;
  isOffered: boolean;
}

export default function LabPricingPage() {
  const { toast } = useToast();
  
  const { data: bundles = [] } = useQuery<Bundle[]>({
    queryKey: ['/api/bundles'],
  });

  const [pricings, setPricings] = useState<LabPricing[]>([
    { bundleId: '1', bundleName: 'Essential Health Check', basePrice: 199, labPrice: 185, homeCollectionFee: 50, isOffered: true },
    { bundleId: '2', bundleName: 'Heart Health Panel', basePrice: 349, labPrice: 320, homeCollectionFee: 50, isOffered: true },
    { bundleId: '3', bundleName: 'Full Body Checkup', basePrice: 699, labPrice: 650, homeCollectionFee: 75, isOffered: true },
    { bundleId: '4', bundleName: "Women's Wellness Package", basePrice: 549, labPrice: 500, homeCollectionFee: 50, isOffered: false },
    { bundleId: '5', bundleName: 'Diabetes Screening', basePrice: 249, labPrice: 220, homeCollectionFee: 50, isOffered: true },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = () => {
    setEditingId(null);
    toast({ title: "Pricing Updated", description: "Your pricing has been saved successfully." });
  };

  const stats = [
    { label: 'Active Bundles', value: pricings.filter(p => p.isOffered).length, icon: Package, color: 'text-teal-400' },
    { label: 'Avg. Margin', value: '8.5%', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Home Collection Fee', value: '50-75 AED', icon: DollarSign, color: 'text-blue-400' },
  ];

  return (
    <LabLayout title="Pricing" subtitle="Manage your test bundle pricing and fees">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-slate-800/40 border-slate-700">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-800/40 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Bundle Pricing</CardTitle>
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={handleSave} data-testid="button-save-all">
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-700">
              <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-slate-700/30 text-sm font-medium text-slate-400">
                <div className="col-span-2">Bundle</div>
                <div>Base Price</div>
                <div>Your Price</div>
                <div>Home Fee</div>
                <div>Status</div>
              </div>
              
              {pricings.map((pricing, i) => (
                <motion.div
                  key={pricing.bundleId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-6 gap-4 px-6 py-4 items-center hover:bg-slate-700/20"
                  data-testid={`pricing-row-${pricing.bundleId}`}
                >
                  <div className="col-span-2">
                    <p className="font-medium text-white">{pricing.bundleName}</p>
                    <p className="text-sm text-slate-400">
                      Margin: {((pricing.basePrice - pricing.labPrice) / pricing.basePrice * 100).toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="text-slate-300">{pricing.basePrice} AED</div>
                  
                  <div>
                    {editingId === pricing.bundleId ? (
                      <Input 
                        type="number"
                        value={pricing.labPrice}
                        onChange={(e) => setPricings(p => p.map(pr => 
                          pr.bundleId === pricing.bundleId ? { ...pr, labPrice: Number(e.target.value) } : pr
                        ))}
                        className="w-24 bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <span className="text-teal-400 font-medium">{pricing.labPrice} AED</span>
                    )}
                  </div>
                  
                  <div>
                    {editingId === pricing.bundleId ? (
                      <Input 
                        type="number"
                        value={pricing.homeCollectionFee}
                        onChange={(e) => setPricings(p => p.map(pr => 
                          pr.bundleId === pricing.bundleId ? { ...pr, homeCollectionFee: Number(e.target.value) } : pr
                        ))}
                        className="w-20 bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <span className="text-slate-300">{pricing.homeCollectionFee} AED</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={pricing.isOffered}
                      onCheckedChange={(checked) => setPricings(p => p.map(pr => 
                        pr.bundleId === pricing.bundleId ? { ...pr, isOffered: checked } : pr
                      ))}
                      data-testid={`switch-offered-${pricing.bundleId}`}
                    />
                    {editingId === pricing.bundleId ? (
                      <Button size="sm" onClick={handleSave} className="bg-teal-600 hover:bg-teal-700" data-testid={`save-${pricing.bundleId}`}>
                        <Save className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setEditingId(pricing.bundleId)}
                        className="text-slate-400 hover:text-white"
                        data-testid={`edit-${pricing.bundleId}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/40 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Pricing Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-400 space-y-2 text-sm">
            <p>- Your price should be competitive with the base platform price</p>
            <p>- Home collection fees are added on top of the bundle price</p>
            <p>- Prices are automatically synced with the platform catalog</p>
            <p>- Contact support if you need to add custom bundles</p>
          </CardContent>
        </Card>
      </div>
    </LabLayout>
  );
}
