import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Edit, Building2, Star, MapPin, Clock, Search } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { PartnerLab } from "@shared/schema";

export default function AdminLabsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingLab, setEditingLab] = useState<PartnerLab | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: labs = [] } = useQuery<PartnerLab[]>({
    queryKey: ['/api/admin/labs'],
  });

  const saveLabMutation = useMutation({
    mutationFn: async (lab: Partial<PartnerLab>) => {
      const method = lab.id ? 'PATCH' : 'POST';
      const url = lab.id ? `/api/admin/labs/${lab.id}` : '/api/admin/labs';
      return apiRequest(method, url, lab);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/labs'] });
      setEditingLab(null);
      setIsCreating(false);
    },
  });

  const mockLabs: PartnerLab[] = [
    { id: '1', name: 'HealthFirst Diagnostics', slug: 'healthfirst', logoUrl: null, description: 'Premier diagnostics center', emirate: 'Dubai', status: 'active', avgConfirmationHours: '1.5', rating: '4.8', totalReviews: 245, createdAt: new Date() },
    { id: '2', name: 'MediCare Labs', slug: 'medicare', logoUrl: null, description: 'Trusted healthcare partner', emirate: 'Abu Dhabi', status: 'active', avgConfirmationHours: '2.0', rating: '4.6', totalReviews: 189, createdAt: new Date() },
    { id: '3', name: 'QuickTest UAE', slug: 'quicktest', logoUrl: null, description: 'Fast and accurate testing', emirate: 'Sharjah', status: 'active', avgConfirmationHours: '1.8', rating: '4.5', totalReviews: 156, createdAt: new Date() },
    { id: '4', name: 'ProHealth Center', slug: 'prohealth', logoUrl: null, description: 'Complete health solutions', emirate: 'Dubai', status: 'inactive', avgConfirmationHours: '2.5', rating: '4.2', totalReviews: 98, createdAt: new Date() },
  ];

  const displayLabs = labs.length > 0 ? labs : mockLabs;
  const filteredLabs = displayLabs.filter(lab => 
    lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.emirate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Partner Labs" subtitle="Manage laboratory partners">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search labs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 bg-slate-800 border-slate-700 text-white"
              data-testid="input-search-labs"
            />
          </div>
          <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-lab">
            <Plus className="w-4 h-4 mr-2" />
            Add Lab Partner
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
              data-testid={`card-lab-${lab.id}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{lab.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="w-3 h-3" />
                      {lab.emirate}
                    </div>
                  </div>
                </div>
                <Badge className={lab.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}>
                  {lab.status}
                </Badge>
              </div>

              <p className="text-sm text-slate-400 mb-4">{lab.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{lab.rating}</span>
                  </div>
                  <p className="text-xs text-slate-400">{lab.totalReviews} reviews</p>
                </div>
                <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-bold">{lab.avgConfirmationHours}h</span>
                  </div>
                  <p className="text-xs text-slate-400">Avg. Response</p>
                </div>
                <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                  <p className="font-bold text-emerald-400 mb-1">15</p>
                  <p className="text-xs text-slate-400">Active Zones</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-slate-300" onClick={() => setEditingLab(lab)} data-testid={`button-edit-lab-${lab.id}`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700" data-testid={`button-manage-zones-${lab.id}`}>
                  Manage Zones
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!editingLab || isCreating} onOpenChange={() => { setEditingLab(null); setIsCreating(false); }}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>{editingLab ? 'Edit Lab Partner' : 'Add Lab Partner'}</DialogTitle>
          </DialogHeader>
          <LabForm 
            lab={editingLab} 
            onSave={(data) => saveLabMutation.mutate(data)}
            isPending={saveLabMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function LabForm({ lab, onSave, isPending }: { lab: PartnerLab | null; onSave: (data: Partial<PartnerLab>) => void; isPending: boolean }) {
  const [formData, setFormData] = useState({
    name: lab?.name || '',
    description: lab?.description || '',
    emirate: lab?.emirate || '',
    status: lab?.status || 'active',
    avgConfirmationHours: lab?.avgConfirmationHours || '2',
  });

  return (
    <div className="space-y-4">
      <div>
        <Label>Lab Name</Label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-lab-name" />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-lab-description" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Emirate</Label>
          <Input value={formData.emirate} onChange={(e) => setFormData({ ...formData, emirate: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-lab-emirate" />
        </div>
        <div>
          <Label>Avg. Confirmation Hours</Label>
          <Input type="number" step="0.5" value={formData.avgConfirmationHours} onChange={(e) => setFormData({ ...formData, avgConfirmationHours: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-lab-hours" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={formData.status === 'active'} onCheckedChange={(c) => setFormData({ ...formData, status: c ? 'active' : 'inactive' })} data-testid="switch-lab-active" />
        <Label>Active</Label>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave({ ...lab, ...formData })} disabled={isPending} className="bg-blue-600 hover:bg-blue-700" data-testid="button-save-lab">
          {isPending ? 'Saving...' : 'Save Lab'}
        </Button>
      </DialogFooter>
    </div>
  );
}
