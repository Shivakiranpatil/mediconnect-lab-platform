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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Package, FlaskConical, Search } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Bundle, Test } from "@shared/schema";

export default function AdminCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [isCreatingBundle, setIsCreatingBundle] = useState(false);
  const [isCreatingTest, setIsCreatingTest] = useState(false);

  const { data: bundles = [] } = useQuery<Bundle[]>({
    queryKey: ['/api/bundles'],
  });

  const { data: tests = [] } = useQuery<Test[]>({
    queryKey: ['/api/admin/tests'],
  });

  const saveBundleMutation = useMutation({
    mutationFn: async (bundle: Partial<Bundle>) => {
      const method = bundle.id ? 'PATCH' : 'POST';
      const url = bundle.id ? `/api/admin/bundles/${bundle.id}` : '/api/admin/bundles';
      return apiRequest(method, url, bundle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bundles'] });
      setEditingBundle(null);
      setIsCreatingBundle(false);
    },
  });

  const saveTestMutation = useMutation({
    mutationFn: async (test: Partial<Test>) => {
      const method = test.id ? 'PATCH' : 'POST';
      const url = test.id ? `/api/admin/tests/${test.id}` : '/api/admin/tests';
      return apiRequest(method, url, test);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/tests'] });
      setEditingTest(null);
      setIsCreatingTest(false);
    },
  });

  const mockTests: Test[] = [
    { id: '1', name: 'Complete Blood Count', description: 'Measures various blood components', category: 'Blood', biomarkers: ['RBC', 'WBC', 'Platelets'], preparation: 'Fasting not required', turnaroundHours: 24, isActive: true, createdAt: new Date() },
    { id: '2', name: 'Lipid Panel', description: 'Checks cholesterol levels', category: 'Heart', biomarkers: ['LDL', 'HDL', 'Triglycerides'], preparation: '12-hour fasting required', turnaroundHours: 24, isActive: true, createdAt: new Date() },
    { id: '3', name: 'Thyroid Function', description: 'Measures thyroid hormones', category: 'Hormone', biomarkers: ['TSH', 'T3', 'T4'], preparation: 'Morning sample preferred', turnaroundHours: 48, isActive: true, createdAt: new Date() },
  ];

  const displayTests = tests.length > 0 ? tests : mockTests;

  const filteredBundles = bundles.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTests = displayTests.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Catalog" subtitle="Manage test bundles and individual tests">
      <Tabs defaultValue="bundles" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="bundles" className="data-[state=active]:bg-blue-600" data-testid="tab-bundles">
              <Package className="w-4 h-4 mr-2" />
              Bundles
            </TabsTrigger>
            <TabsTrigger value="tests" className="data-[state=active]:bg-blue-600" data-testid="tab-tests">
              <FlaskConical className="w-4 h-4 mr-2" />
              Tests
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-slate-800 border-slate-700 text-white"
                data-testid="input-search-catalog"
              />
            </div>
          </div>
        </div>

        <TabsContent value="bundles" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setIsCreatingBundle(true)} className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-bundle">
              <Plus className="w-4 h-4 mr-2" />
              Add Bundle
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
                data-testid={`card-bundle-${bundle.id}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    {bundle.isPopular && (
                      <Badge className="bg-amber-500/20 text-amber-400">Popular</Badge>
                    )}
                    <Badge className={bundle.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}>
                      {bundle.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{bundle.name}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{bundle.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-white">AED {bundle.basePrice}</p>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => setEditingBundle(bundle)} data-testid={`button-edit-bundle-${bundle.id}`}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setIsCreatingTest(true)} className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-test">
              <Plus className="w-4 h-4 mr-2" />
              Add Test
            </Button>
          </div>

          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700/30">
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Test Name</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Category</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Biomarkers</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Turnaround</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredTests.map((test) => (
                  <tr key={test.id} className="hover:bg-slate-700/20" data-testid={`row-test-${test.id}`}>
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{test.name}</p>
                      <p className="text-sm text-slate-400">{test.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="border-slate-600 text-slate-300">{test.category}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {Array.isArray(test.biomarkers) ? test.biomarkers.slice(0, 3).join(', ') : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{test.turnaroundHours}h</td>
                    <td className="px-6 py-4">
                      <Badge className={test.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}>
                        {test.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => setEditingTest(test)} data-testid={`button-edit-test-${test.id}`}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingBundle || isCreatingBundle} onOpenChange={() => { setEditingBundle(null); setIsCreatingBundle(false); }}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>{editingBundle ? 'Edit Bundle' : 'Create Bundle'}</DialogTitle>
          </DialogHeader>
          <BundleForm 
            bundle={editingBundle} 
            onSave={(data) => saveBundleMutation.mutate(data)}
            isPending={saveBundleMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingTest || isCreatingTest} onOpenChange={() => { setEditingTest(null); setIsCreatingTest(false); }}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>{editingTest ? 'Edit Test' : 'Create Test'}</DialogTitle>
          </DialogHeader>
          <TestForm 
            test={editingTest} 
            onSave={(data) => saveTestMutation.mutate(data)}
            isPending={saveTestMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function BundleForm({ bundle, onSave, isPending }: { bundle: Bundle | null; onSave: (data: Partial<Bundle>) => void; isPending: boolean }) {
  const [formData, setFormData] = useState({
    name: bundle?.name || '',
    description: bundle?.description || '',
    basePrice: bundle?.basePrice || '',
    category: bundle?.category || '',
    isActive: bundle?.isActive ?? true,
    isPopular: bundle?.isPopular ?? false,
  });

  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-bundle-name" />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-bundle-description" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Base Price (AED)</Label>
          <Input type="number" value={formData.basePrice} onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-bundle-price" />
        </div>
        <div>
          <Label>Category</Label>
          <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-bundle-category" />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch checked={formData.isActive} onCheckedChange={(c) => setFormData({ ...formData, isActive: c })} data-testid="switch-bundle-active" />
          <Label>Active</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={formData.isPopular} onCheckedChange={(c) => setFormData({ ...formData, isPopular: c })} data-testid="switch-bundle-popular" />
          <Label>Popular</Label>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave({ ...bundle, ...formData })} disabled={isPending} className="bg-blue-600 hover:bg-blue-700" data-testid="button-save-bundle">
          {isPending ? 'Saving...' : 'Save Bundle'}
        </Button>
      </DialogFooter>
    </div>
  );
}

function TestForm({ test, onSave, isPending }: { test: Test | null; onSave: (data: Partial<Test>) => void; isPending: boolean }) {
  const [formData, setFormData] = useState({
    name: test?.name || '',
    description: test?.description || '',
    category: test?.category || '',
    preparation: test?.preparation || '',
    turnaroundHours: test?.turnaroundHours || 24,
    isActive: test?.isActive ?? true,
  });

  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-test-name" />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-test-description" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-test-category" />
        </div>
        <div>
          <Label>Turnaround (hours)</Label>
          <Input type="number" value={formData.turnaroundHours} onChange={(e) => setFormData({ ...formData, turnaroundHours: parseInt(e.target.value) })} className="bg-slate-700 border-slate-600" data-testid="input-test-turnaround" />
        </div>
      </div>
      <div>
        <Label>Preparation Instructions</Label>
        <Textarea value={formData.preparation} onChange={(e) => setFormData({ ...formData, preparation: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-test-preparation" />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={formData.isActive} onCheckedChange={(c) => setFormData({ ...formData, isActive: c })} data-testid="switch-test-active" />
        <Label>Active</Label>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave({ ...test, ...formData })} disabled={isPending} className="bg-blue-600 hover:bg-blue-700" data-testid="button-save-test">
          {isPending ? 'Saving...' : 'Save Test'}
        </Button>
      </DialogFooter>
    </div>
  );
}
