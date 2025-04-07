
import { Button } from "@/components/ui/button";
import { Bell, Download, RefreshCw, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleAction = (action: string) => {
    toast({
      title: `Action: ${action}`,
      description: "Navigating to action page...",
    });
    
    switch(action) {
      case "Scan System":
        navigate("/diagnostics");
        break;
      case "Configure Alerts":
        navigate("/alert-configuration");
        break;
      case "Generate Report":
        navigate("/generate-report");
        break;
      case "Quick Fix":
        navigate("/quick-fix");
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button 
        variant="outline" 
        className="flex flex-col h-28 py-4 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors" 
        onClick={() => handleAction("Scan System")}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="p-2 bg-blue-100 rounded-full">
            <RefreshCw className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-center">
            <div className="font-medium">Scan System</div>
            <div className="text-xs text-gray-600">Run diagnostics</div>
          </div>
        </div>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex flex-col h-28 py-4 border-amber-200 hover:bg-amber-50 hover:text-amber-700 transition-colors" 
        onClick={() => handleAction("Configure Alerts")}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="p-2 bg-amber-100 rounded-full">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
          <div className="text-center">
            <div className="font-medium">Configure Alerts</div>
            <div className="text-xs text-gray-600">Notification settings</div>
          </div>
        </div>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex flex-col h-28 py-4 border-green-200 hover:bg-green-50 hover:text-green-700 transition-colors" 
        onClick={() => handleAction("Generate Report")}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="p-2 bg-green-100 rounded-full">
            <Download className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-center">
            <div className="font-medium">Generate Report</div>
            <div className="text-xs text-gray-600">Water quality data</div>
          </div>
        </div>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex flex-col h-28 py-4 border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-colors" 
        onClick={() => handleAction("Quick Fix")}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="p-2 bg-purple-100 rounded-full">
            <Zap className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-center">
            <div className="font-medium">Quick Fix</div>
            <div className="text-xs text-gray-600">Auto-remediation</div>
          </div>
        </div>
      </Button>
    </div>
  );
}
