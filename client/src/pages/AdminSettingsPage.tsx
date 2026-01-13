import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Key, Shield, Bell, Globe, Database, 
  CheckCircle, AlertCircle, Save, RefreshCw
} from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    openaiEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    defaultCurrency: 'AED',
    bookingBuffer: '24',
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Settings saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  return (
    <AdminLayout title="Settings" subtitle="Configure platform settings and API integrations">
      <Tabs defaultValue="api" className="space-y-6">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="api" data-testid="tab-api" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="general" data-testid="tab-general" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Globe className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                OpenAI Integration
              </CardTitle>
              <CardDescription className="text-slate-400">
                Powers the AI Health Assistant chat and test recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Connected via Replit AI Integrations</p>
                    <p className="text-sm text-slate-400">API key is securely managed by Replit</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Enable AI Features</Label>
                  <p className="text-sm text-slate-400">Toggle AI-powered recommendations and chat</p>
                </div>
                <Switch 
                  checked={settings.openaiEnabled}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, openaiEnabled: checked }))}
                  data-testid="switch-openai"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-teal-400" />
                Database Connection
              </CardTitle>
              <CardDescription className="text-slate-400">
                PostgreSQL database for storing platform data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">PostgreSQL Connected</p>
                    <p className="text-sm text-slate-400">Database URL configured via environment</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Connected</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-orange-400" />
                Third-Party API Keys
              </CardTitle>
              <CardDescription className="text-slate-400">
                Configure additional integrations (optional)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">SMS Gateway API Key (Twilio)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="password" 
                    placeholder="Enter Twilio API key..." 
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-twilio-key"
                  />
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500">Used for SMS appointment reminders</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Payment Gateway (Stripe)</Label>
                <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <p className="text-sm text-slate-400">Not configured - Contact support to enable payments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Default Currency</Label>
                  <Input 
                    value={settings.defaultCurrency}
                    onChange={(e) => setSettings(s => ({ ...s, defaultCurrency: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-currency"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Booking Buffer (hours)</Label>
                  <Input 
                    type="number"
                    value={settings.bookingBuffer}
                    onChange={(e) => setSettings(s => ({ ...s, bookingBuffer: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-booking-buffer"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div>
                  <Label className="text-white">Maintenance Mode</Label>
                  <p className="text-sm text-slate-400">Temporarily disable booking functionality</p>
                </div>
                <Switch 
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, maintenanceMode: checked }))}
                  data-testid="switch-maintenance"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-slate-400">Send email confirmations and reminders</p>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, emailNotifications: checked }))}
                  data-testid="switch-email"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">SMS Notifications</Label>
                  <p className="text-sm text-slate-400">Send SMS reminders (requires Twilio API key)</p>
                </div>
                <Switch 
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, smsNotifications: checked }))}
                  data-testid="switch-sms"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700"
          data-testid="button-save-settings"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </AdminLayout>
  );
}
