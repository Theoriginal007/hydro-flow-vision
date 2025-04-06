
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Bell, Phone, Mail, Smartphone, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AlertConfiguration = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [toxicityThreshold, setToxicityThreshold] = useState([65]);
  const [phThreshold, setPhThreshold] = useState([6.8, 7.8]);
  const [alertFrequency, setAlertFrequency] = useState("hourly");
  const [emailRecipients, setEmailRecipients] = useState("admin@example.com");
  const [phoneNumbers, setPhoneNumbers] = useState("+1234567890");
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleSaveConfig = () => {
    toast({
      title: "Alert Configuration Saved",
      description: "Your alert preferences have been updated successfully."
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        {!isMobile && <Sidebar />}
        <main className="flex-1 p-4 md:p-6">
          <Breadcrumb className="mb-4 md:mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/alert-configuration">Alert Configuration</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-water-dark">
              Alert Configuration
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Customize your notification preferences for water quality alerts
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-amber-600" />
                  Notification Channels
                </CardTitle>
                <CardDescription>
                  Select how you'd like to receive water quality alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div>
                      <Label htmlFor="email-alerts" className="font-medium">Email Alerts</Label>
                      <p className="text-sm text-gray-500">Receive detailed water quality reports</p>
                    </div>
                  </div>
                  <Switch 
                    id="email-alerts" 
                    checked={emailAlerts}
                    onCheckedChange={setEmailAlerts}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <div>
                      <Label htmlFor="sms-alerts" className="font-medium">SMS Alerts</Label>
                      <p className="text-sm text-gray-500">Get text messages for urgent issues</p>
                    </div>
                  </div>
                  <Switch 
                    id="sms-alerts" 
                    checked={smsAlerts}
                    onCheckedChange={setSmsAlerts}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Smartphone className="h-5 w-5 text-gray-600" />
                    <div>
                      <Label htmlFor="push-alerts" className="font-medium">Push Notifications</Label>
                      <p className="text-sm text-gray-500">App notifications on your devices</p>
                    </div>
                  </div>
                  <Switch 
                    id="push-alerts" 
                    checked={pushAlerts}
                    onCheckedChange={setPushAlerts}
                  />
                </div>

                <div className="pt-4 border-t">
                  <Label htmlFor="email-recipients" className="font-medium mb-2 block">Email Recipients</Label>
                  <Input
                    id="email-recipients"
                    placeholder="Enter email addresses (comma separated)"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                    disabled={!emailAlerts}
                  />
                </div>

                <div>
                  <Label htmlFor="phone-numbers" className="font-medium mb-2 block">Phone Numbers for SMS</Label>
                  <Input
                    id="phone-numbers"
                    placeholder="Enter phone numbers (comma separated)"
                    value={phoneNumbers}
                    onChange={(e) => setPhoneNumbers(e.target.value)}
                    disabled={!smsAlerts}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Thresholds & Frequency</CardTitle>
                <CardDescription>
                  Configure when alerts should be triggered
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="toxicity-threshold" className="font-medium">Toxicity Threshold</Label>
                    <span className="text-sm text-gray-600">{toxicityThreshold[0]}%</span>
                  </div>
                  <Slider
                    id="toxicity-threshold"
                    defaultValue={toxicityThreshold}
                    max={100}
                    step={1}
                    onValueChange={setToxicityThreshold}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Alerts will trigger when toxicity exceeds this threshold
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="ph-threshold" className="font-medium">pH Range</Label>
                    <span className="text-sm text-gray-600">{phThreshold[0]} - {phThreshold[1]}</span>
                  </div>
                  <Slider
                    id="ph-threshold"
                    defaultValue={phThreshold}
                    min={0}
                    max={14}
                    step={0.1}
                    onValueChange={setPhThreshold}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Alerts will trigger when pH is outside this range
                  </p>
                </div>

                <div>
                  <Label htmlFor="alert-frequency" className="font-medium mb-2 block">Alert Frequency</Label>
                  <Select 
                    value={alertFrequency} 
                    onValueChange={setAlertFrequency}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    How often you want to receive non-critical alerts
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <Label className="font-medium mb-2 block">Alert Testing</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "Test Alert Sent",
                        description: "A test email alert has been sent to the configured recipients."
                      });
                    }}>
                      Test Email Alert
                    </Button>
                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "Test Alert Sent",
                        description: "A test SMS alert has been sent to the configured phone numbers."
                      });
                    }}>
                      Test SMS Alert
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSaveConfig}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Alert Configuration
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default AlertConfiguration;
