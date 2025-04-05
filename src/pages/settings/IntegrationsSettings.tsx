
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Home, Settings as SettingsIcon, Link2, FileCheck, PlugZap, Database, Cloud, Share2, Server, FileJson, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IntegrationsSettings = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Integration status state
  const [integrations, setIntegrations] = useState({
    laboratorySystems: {
      enabled: true,
      connected: true,
      lastSync: "2023-03-10T14:30:00Z"
    },
    regulatoryPlatforms: {
      enabled: true,
      connected: true,
      lastSync: "2023-03-12T09:15:00Z"
    },
    erpSystems: {
      enabled: false,
      connected: false,
      lastSync: null
    },
    scadaSystems: {
      enabled: true,
      connected: true,
      lastSync: "2023-03-11T16:45:00Z"
    },
    weatherServices: {
      enabled: true,
      connected: true,
      lastSync: "2023-03-15T08:00:00Z"
    },
    gisData: {
      enabled: false,
      connected: false,
      lastSync: null
    }
  });
  
  // API settings state
  const [apiSettings, setApiSettings] = useState({
    enabled: true,
    throttling: "standard", // standard, enhanced, unlimited
    key: "api_12345abcde67890fghij",
    allowedOrigins: ["https://example.com", "https://client-portal.example.org"],
    webhookUrl: "https://webhook.example.com/aquapure-events"
  });
  
  const toggleIntegration = (key) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled
      }
    }));
    
    toast({
      title: `Integration ${integrations[key].enabled ? "disabled" : "enabled"}`,
      description: `The ${formatIntegrationName(key)} integration has been ${integrations[key].enabled ? "disabled" : "enabled"}.`,
    });
  };
  
  const toggleApiEnabled = () => {
    setApiSettings(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
    
    toast({
      title: `API access ${apiSettings.enabled ? "disabled" : "enabled"}`,
      description: `External API access has been ${apiSettings.enabled ? "disabled" : "enabled"}.`,
    });
  };
  
  const updateApiThrottling = (value) => {
    setApiSettings(prev => ({
      ...prev,
      throttling: value
    }));
    
    toast({
      title: "API throttling updated",
      description: `API rate limits have been set to ${value} level.`,
    });
  };
  
  const regenerateApiKey = () => {
    // In a real app, this would call an API endpoint to generate a new key
    const newKey = "api_" + Math.random().toString(36).substring(2, 15);
    
    setApiSettings(prev => ({
      ...prev,
      key: newKey
    }));
    
    toast({
      title: "API key regenerated",
      description: "A new API key has been generated. Update your applications.",
    });
  };
  
  const addAllowedOrigin = (e) => {
    e.preventDefault();
    const originInput = document.getElementById("new-origin") as HTMLInputElement;
    const newOrigin = originInput.value.trim();
    
    if (!newOrigin) return;
    
    if (!/^https?:\/\//.test(newOrigin)) {
      toast({
        title: "Invalid origin format",
        description: "Origins must start with http:// or https://",
        variant: "destructive"
      });
      return;
    }
    
    if (apiSettings.allowedOrigins.includes(newOrigin)) {
      toast({
        title: "Origin already exists",
        description: "This origin is already in the allowed list",
        variant: "destructive"
      });
      return;
    }
    
    setApiSettings(prev => ({
      ...prev,
      allowedOrigins: [...prev.allowedOrigins, newOrigin]
    }));
    
    originInput.value = "";
    
    toast({
      title: "Origin added",
      description: `${newOrigin} has been added to allowed origins.`,
    });
  };
  
  const removeAllowedOrigin = (origin) => {
    setApiSettings(prev => ({
      ...prev,
      allowedOrigins: prev.allowedOrigins.filter(o => o !== origin)
    }));
    
    toast({
      title: "Origin removed",
      description: `${origin} has been removed from allowed origins.`,
    });
  };
  
  const updateWebhookUrl = (e) => {
    e.preventDefault();
    const urlInput = document.getElementById("webhook-url") as HTMLInputElement;
    const newUrl = urlInput.value.trim();
    
    if (!newUrl) return;
    
    if (!/^https?:\/\//.test(newUrl)) {
      toast({
        title: "Invalid URL format",
        description: "Webhook URL must start with http:// or https://",
        variant: "destructive"
      });
      return;
    }
    
    setApiSettings(prev => ({
      ...prev,
      webhookUrl: newUrl
    }));
    
    toast({
      title: "Webhook URL updated",
      description: "Event notifications will be sent to the new webhook URL.",
    });
  };
  
  const formatIntegrationName = (key) => {
    switch (key) {
      case "laboratorySystems": return "Laboratory Systems";
      case "regulatoryPlatforms": return "Regulatory Platforms";
      case "erpSystems": return "ERP Systems";
      case "scadaSystems": return "SCADA Systems";
      case "weatherServices": return "Weather Services";
      case "gisData": return "GIS Data";
      default: return key;
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getIntegrationIcon = (key) => {
    switch (key) {
      case "laboratorySystems": return FileCheck;
      case "regulatoryPlatforms": return FileJson;
      case "erpSystems": return Database;
      case "scadaSystems": return Server;
      case "weatherServices": return Cloud;
      case "gisData": return Share2;
      default: return PlugZap;
    }
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
                <BreadcrumbLink asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/settings">
                    <SettingsIcon className="h-4 w-4 mr-1" />
                    Settings
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center" href="/settings/integrations">
                  <Link2 className="h-4 w-4 mr-1" />
                  Integrations
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-water-dark">
              Integrations & API
            </h1>
            <p className="text-lg text-gray-600">
              Connect AquaPure AI with other systems and configure API access
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>External System Integrations</CardTitle>
                <CardDescription>
                  Connect AquaPure AI with laboratory, regulatory, and enterprise systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.keys(integrations).map((key) => {
                  const IntegrationIcon = getIntegrationIcon(key);
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <IntegrationIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{formatIntegrationName(key)}</h3>
                            <p className="text-sm text-gray-600">
                              {integrations[key].connected 
                                ? `Last synchronized: ${formatDate(integrations[key].lastSync)}` 
                                : "Not connected"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {integrations[key].connected ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Connected
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-600">
                              Not Connected
                            </Badge>
                          )}
                          <Switch 
                            checked={integrations[key].enabled} 
                            onCheckedChange={() => toggleIntegration(key)}
                          />
                        </div>
                      </div>
                      {key !== Object.keys(integrations).slice(-1)[0] && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  );
                })}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Configure Integration Details
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Manage external API access to your AquaPure AI data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable External API Access</h3>
                    <p className="text-sm text-gray-600">
                      Allow external applications to access your data via the AquaPure API
                    </p>
                  </div>
                  <Switch 
                    checked={apiSettings.enabled} 
                    onCheckedChange={toggleApiEnabled}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">API Throttling Level</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Control the rate at which API requests can be made
                  </p>
                  <Select 
                    value={apiSettings.throttling} 
                    onValueChange={updateApiThrottling}
                    disabled={!apiSettings.enabled}
                  >
                    <SelectTrigger className="w-full md:w-1/3">
                      <SelectValue placeholder="Select throttling level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (100 requests/minute)</SelectItem>
                      <SelectItem value="enhanced">Enhanced (500 requests/minute)</SelectItem>
                      <SelectItem value="unlimited">Unlimited (no rate limiting)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">API Key</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Use this key to authenticate API requests
                  </p>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={apiSettings.key} 
                      readOnly 
                      disabled={!apiSettings.enabled}
                      className="font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      onClick={regenerateApiKey}
                      disabled={!apiSettings.enabled}
                    >
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Warning: Regenerating will invalidate the current key and require updates to all connected applications.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Allowed Origins (CORS)</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Domains that are allowed to make API requests
                  </p>
                  <div className="space-y-2 mb-4">
                    {apiSettings.allowedOrigins.map((origin, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm font-mono">{origin}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          disabled={!apiSettings.enabled}
                          onClick={() => removeAllowedOrigin(origin)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={addAllowedOrigin} className="flex items-center gap-2">
                    <Input 
                      id="new-origin" 
                      placeholder="https://example.com" 
                      disabled={!apiSettings.enabled}
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      variant="outline"
                      disabled={!apiSettings.enabled}
                    >
                      Add Origin
                    </Button>
                  </form>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Webhook URL</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Receive event notifications at this URL
                  </p>
                  <form onSubmit={updateWebhookUrl} className="flex items-center gap-2">
                    <Input 
                      id="webhook-url" 
                      defaultValue={apiSettings.webhookUrl}
                      placeholder="https://webhook.example.com" 
                      disabled={!apiSettings.enabled}
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      variant="outline"
                      disabled={!apiSettings.enabled}
                    >
                      Update
                    </Button>
                  </form>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  disabled={!apiSettings.enabled}
                >
                  Test API Connection
                </Button>
                <Button className="flex items-center">
                  <span>View API Documentation</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
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

export default IntegrationsSettings;
