import LabLayout from "@/components/LabLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-auth";
import { 
  Building2, User, Bell, Shield, Save, Upload, 
  Phone, Mail, MapPin, CheckCircle
} from "lucide-react";

export default function LabSettingsPage() {
  const { toast } = useToast();
  const { data: user } = useUser();
  
  const [labInfo, setLabInfo] = useState({
    name: 'Al Noor Diagnostics',
    registrationNo: 'DHA-LAB-2024-1234',
    phone: '+971 4 123 4567',
    email: 'contact@alnoor-lab.ae',
    address: 'Healthcare City, Building 47, Floor 2, Dubai, UAE',
    description: 'Licensed diagnostic laboratory offering comprehensive testing services across the UAE.',
  });

  const [notifications, setNotifications] = useState({
    newBookings: true,
    cancellations: true,
    reminders: true,
    marketing: false,
    smsAlerts: true,
    emailAlerts: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({ title: "Settings Saved", description: "Your settings have been updated successfully." });
  };

  return (
    <LabLayout title="Settings" subtitle="Manage your lab profile and preferences">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="profile" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white" data-testid="tab-profile">
            <Building2 className="w-4 h-4 mr-2" />
            Lab Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white" data-testid="tab-account">
            <User className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white" data-testid="tab-notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-slate-800/40 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Laboratory Information</CardTitle>
              <CardDescription className="text-slate-400">
                This information is displayed to customers on the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-slate-700 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-slate-500" />
                </div>
                <div>
                  <Button variant="outline" className="border-slate-600 text-slate-300 mb-2" data-testid="button-upload-logo">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-sm text-slate-500">PNG or JPG, max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Laboratory Name</Label>
                  <Input 
                    value={labInfo.name}
                    onChange={(e) => setLabInfo(l => ({ ...l, name: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-lab-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Registration Number</Label>
                  <Input 
                    value={labInfo.registrationNo}
                    onChange={(e) => setLabInfo(l => ({ ...l, registrationNo: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-reg-no"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input 
                    value={labInfo.phone}
                    onChange={(e) => setLabInfo(l => ({ ...l, phone: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input 
                    value={labInfo.email}
                    onChange={(e) => setLabInfo(l => ({ ...l, email: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </Label>
                <Input 
                  value={labInfo.address}
                  onChange={(e) => setLabInfo(l => ({ ...l, address: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  data-testid="input-address"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Description</Label>
                <Textarea 
                  value={labInfo.description}
                  onChange={(e) => setLabInfo(l => ({ ...l, description: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white min-h-24"
                  data-testid="input-description"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-emerald-500/10 border-emerald-500/30">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="font-medium text-emerald-400">Verified Laboratory</p>
                <p className="text-sm text-emerald-300/70">Your lab is verified and approved by MediConnect</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card className="bg-slate-800/40 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Account Name</Label>
                  <Input 
                    value={user?.name || 'Lab Manager'}
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-account-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Username</Label>
                  <Input 
                    value={user?.username || 'labadmin'}
                    disabled
                    className="bg-slate-700/50 border-slate-600 text-slate-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-400" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Current Password</Label>
                <Input 
                  type="password"
                  placeholder="Enter current password"
                  className="bg-slate-700 border-slate-600 text-white"
                  data-testid="input-current-password"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">New Password</Label>
                  <Input 
                    type="password"
                    placeholder="Enter new password"
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-new-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Confirm Password</Label>
                  <Input 
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-confirm-password"
                  />
                </div>
              </div>
              <Button variant="outline" className="border-slate-600 text-slate-300" data-testid="button-change-password">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-800/40 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-400 uppercase">Booking Alerts</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">New Booking Notifications</p>
                    <p className="text-sm text-slate-400">Get notified when you receive new bookings</p>
                  </div>
                  <Switch 
                    checked={notifications.newBookings}
                    onCheckedChange={(checked) => setNotifications(n => ({ ...n, newBookings: checked }))}
                    data-testid="switch-new-bookings"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Cancellation Alerts</p>
                    <p className="text-sm text-slate-400">Get notified when bookings are cancelled</p>
                  </div>
                  <Switch 
                    checked={notifications.cancellations}
                    onCheckedChange={(checked) => setNotifications(n => ({ ...n, cancellations: checked }))}
                    data-testid="switch-cancellations"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Reminder Notifications</p>
                    <p className="text-sm text-slate-400">Receive reminders for upcoming appointments</p>
                  </div>
                  <Switch 
                    checked={notifications.reminders}
                    onCheckedChange={(checked) => setNotifications(n => ({ ...n, reminders: checked }))}
                    data-testid="switch-reminders"
                  />
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6 space-y-4">
                <h4 className="text-sm font-medium text-slate-400 uppercase">Channels</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">SMS Alerts</p>
                    <p className="text-sm text-slate-400">Receive alerts via SMS</p>
                  </div>
                  <Switch 
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => setNotifications(n => ({ ...n, smsAlerts: checked }))}
                    data-testid="switch-sms"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Email Alerts</p>
                    <p className="text-sm text-slate-400">Receive alerts via email</p>
                  </div>
                  <Switch 
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => setNotifications(n => ({ ...n, emailAlerts: checked }))}
                    data-testid="switch-email"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-teal-600 hover:bg-teal-700"
          data-testid="button-save-settings"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </LabLayout>
  );
}
