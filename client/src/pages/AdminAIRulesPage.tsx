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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Edit, Brain, MessageSquare, GitBranch, Sparkles } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { AiRuleSet, AiQuestion, AiMappingRule } from "@shared/schema";

export default function AdminAIRulesPage() {
  const [editingRuleSet, setEditingRuleSet] = useState<AiRuleSet | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<AiQuestion | null>(null);
  const [isCreatingRuleSet, setIsCreatingRuleSet] = useState(false);

  const { data: ruleSets = [] } = useQuery<AiRuleSet[]>({
    queryKey: ['/api/admin/ai-rule-sets'],
  });

  const { data: questions = [] } = useQuery<AiQuestion[]>({
    queryKey: ['/api/ai/questions'],
  });

  const { data: mappingRules = [] } = useQuery<AiMappingRule[]>({
    queryKey: ['/api/admin/ai-mapping-rules'],
  });

  const saveRuleSetMutation = useMutation({
    mutationFn: async (ruleSet: Partial<AiRuleSet>) => {
      const method = ruleSet.id ? 'PATCH' : 'POST';
      const url = ruleSet.id ? `/api/admin/ai-rule-sets/${ruleSet.id}` : '/api/admin/ai-rule-sets';
      return apiRequest(method, url, ruleSet);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ai-rule-sets'] });
      setEditingRuleSet(null);
      setIsCreatingRuleSet(false);
    },
  });

  const mockRuleSets: AiRuleSet[] = [
    { id: '1', name: 'Default Discovery Flow', isActive: true, maxBundles: 3, disclaimerText: 'These recommendations are not medical advice.', createdAt: new Date() },
  ];

  const mockQuestions: AiQuestion[] = [
    { id: '1', ruleSetId: '1', questionKey: 'age', questionText: 'What is your age group?', questionType: 'single', options: ['18-30', '31-45', '46-60', '60+'], helperText: 'Select your age range', icon: 'user', sortOrder: 1 },
    { id: '2', ruleSetId: '1', questionKey: 'gender', questionText: 'What is your gender?', questionType: 'single', options: ['Male', 'Female'], helperText: null, icon: 'users', sortOrder: 2 },
    { id: '3', ruleSetId: '1', questionKey: 'concerns', questionText: 'What are your main health concerns?', questionType: 'multiple', options: ['Heart Health', 'Diabetes', 'Thyroid', 'General Wellness', 'Weight Management'], helperText: 'Select all that apply', icon: 'heart', sortOrder: 3 },
    { id: '4', ruleSetId: '1', questionKey: 'lastCheckup', questionText: 'When was your last health checkup?', questionType: 'single', options: ['Less than 6 months', '6-12 months', 'More than a year', 'Never'], helperText: null, icon: 'calendar', sortOrder: 4 },
  ];

  const mockMappingRules: AiMappingRule[] = [
    { id: '1', ruleSetId: '1', name: 'Heart Concern Mapping', conditions: { concerns: 'Heart Health' }, recommendedBundleIds: ['heart'], reasonTemplate: 'Based on your heart health concerns', priority: 1 },
    { id: '2', ruleSetId: '1', name: 'Diabetes Concern Mapping', conditions: { concerns: 'Diabetes' }, recommendedBundleIds: ['essential'], reasonTemplate: 'Recommended for diabetes screening', priority: 2 },
    { id: '3', ruleSetId: '1', name: 'Senior Full Checkup', conditions: { age: '60+', lastCheckup: 'More than a year' }, recommendedBundleIds: ['full'], reasonTemplate: 'Comprehensive checkup recommended for your age group', priority: 3 },
  ];

  const displayRuleSets = ruleSets.length > 0 ? ruleSets : mockRuleSets;
  const displayQuestions = questions.length > 0 ? questions : mockQuestions;
  const displayMappingRules = mappingRules.length > 0 ? mappingRules : mockMappingRules;

  return (
    <AdminLayout title="AI Discovery Rules" subtitle="Configure AI-powered test recommendations">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => setIsCreatingRuleSet(true)} className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-ruleset">
            <Plus className="w-4 h-4 mr-2" />
            New Rule Set
          </Button>
        </div>

        {displayRuleSets.map((ruleSet) => (
          <div key={ruleSet.id} className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden" data-testid={`card-ruleset-${ruleSet.id}`}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{ruleSet.name}</h3>
                      <Badge className={ruleSet.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}>
                        {ruleSet.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">Max {ruleSet.maxBundles} recommendations per user</p>
                  </div>
                </div>
                <Button variant="outline" className="border-slate-600 text-slate-300" onClick={() => setEditingRuleSet(ruleSet)} data-testid={`button-edit-ruleset-${ruleSet.id}`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            <Accordion type="multiple" className="px-6">
              <AccordionItem value="questions" className="border-slate-700">
                <AccordionTrigger className="text-white hover:text-white py-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                    <span>Discovery Questions ({displayQuestions.filter(q => q.ruleSetId === ruleSet.id).length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-4">
                    {displayQuestions.filter(q => q.ruleSetId === ruleSet.id).map((question, idx) => (
                      <div key={question.id} className="bg-slate-700/30 rounded-xl p-4" data-testid={`question-${question.id}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <span className="text-sm font-bold text-slate-500">{idx + 1}</span>
                            <div>
                              <p className="font-medium text-white">{question.questionText}</p>
                              <p className="text-sm text-slate-400 mt-1">Key: {question.questionKey} | Type: {question.questionType}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {(question.options as string[]).map((opt, i) => (
                                  <Badge key={i} variant="outline" className="border-slate-600 text-slate-300">{opt}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button size="icon" variant="ghost" className="text-slate-400" data-testid={`button-edit-question-${question.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-dashed border-slate-600 text-slate-400" data-testid="button-add-question">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="mappings" className="border-slate-700">
                <AccordionTrigger className="text-white hover:text-white py-4">
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-purple-400" />
                    <span>Mapping Rules ({displayMappingRules.filter(r => r.ruleSetId === ruleSet.id).length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-4">
                    {displayMappingRules.filter(r => r.ruleSetId === ruleSet.id).map((rule) => (
                      <div key={rule.id} className="bg-slate-700/30 rounded-xl p-4" data-testid={`mapping-rule-${rule.id}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="w-4 h-4 text-amber-400" />
                              <p className="font-medium text-white">{rule.name}</p>
                              <Badge className="bg-slate-600 text-slate-300">Priority: {rule.priority}</Badge>
                            </div>
                            <div className="text-sm text-slate-400">
                              <p className="mb-1">Conditions: <code className="bg-slate-800 px-2 py-0.5 rounded">{JSON.stringify(rule.conditions)}</code></p>
                              <p>Recommends: {(rule.recommendedBundleIds as string[]).join(', ')}</p>
                            </div>
                          </div>
                          <Button size="icon" variant="ghost" className="text-slate-400" data-testid={`button-edit-mapping-${rule.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-dashed border-slate-600 text-slate-400" data-testid="button-add-mapping">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Mapping Rule
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>

      <Dialog open={!!editingRuleSet || isCreatingRuleSet} onOpenChange={() => { setEditingRuleSet(null); setIsCreatingRuleSet(false); }}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>{editingRuleSet ? 'Edit Rule Set' : 'Create Rule Set'}</DialogTitle>
          </DialogHeader>
          <RuleSetForm 
            ruleSet={editingRuleSet} 
            onSave={(data) => saveRuleSetMutation.mutate(data)}
            isPending={saveRuleSetMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function RuleSetForm({ ruleSet, onSave, isPending }: { ruleSet: AiRuleSet | null; onSave: (data: Partial<AiRuleSet>) => void; isPending: boolean }) {
  const [formData, setFormData] = useState({
    name: ruleSet?.name || '',
    maxBundles: ruleSet?.maxBundles || 3,
    disclaimerText: ruleSet?.disclaimerText || '',
    isActive: ruleSet?.isActive ?? true,
  });

  return (
    <div className="space-y-4">
      <div>
        <Label>Rule Set Name</Label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-ruleset-name" />
      </div>
      <div>
        <Label>Max Recommendations</Label>
        <Input type="number" value={formData.maxBundles} onChange={(e) => setFormData({ ...formData, maxBundles: parseInt(e.target.value) })} className="bg-slate-700 border-slate-600" data-testid="input-ruleset-max" />
      </div>
      <div>
        <Label>Disclaimer Text</Label>
        <Textarea value={formData.disclaimerText} onChange={(e) => setFormData({ ...formData, disclaimerText: e.target.value })} className="bg-slate-700 border-slate-600" data-testid="input-ruleset-disclaimer" />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={formData.isActive} onCheckedChange={(c) => setFormData({ ...formData, isActive: c })} data-testid="switch-ruleset-active" />
        <Label>Active</Label>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave({ ...ruleSet, ...formData })} disabled={isPending} className="bg-blue-600 hover:bg-blue-700" data-testid="button-save-ruleset">
          {isPending ? 'Saving...' : 'Save Rule Set'}
        </Button>
      </DialogFooter>
    </div>
  );
}
